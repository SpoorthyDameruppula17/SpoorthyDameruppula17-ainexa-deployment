import os
import json
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import chromadb
from sentence_transformers import SentenceTransformer
import google.generativeai as genai

from chat_utils import get_contact_response, handle_conversation_flow

# ───────────────────────────────
# App Initialization
# ───────────────────────────────

app = Flask(__name__)
CORS(app)

load_dotenv()

# ───────────────────────────────
# Environment Variables & Constants
# ───────────────────────────────

DB_FOLDER = "company_data"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("GEMINI_MODEL_NAME")

# ───────────────────────────────
# Gemini Configuration
# ───────────────────────────────

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(model_name=MODEL_NAME)

# ───────────────────────────────
# ChromaDB Initialization
# ───────────────────────────────

try:
    chroma_client = chromadb.PersistentClient(path=DB_FOLDER)
    collection = chroma_client.get_or_create_collection(name="company_knowledge")
    embedder = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
except Exception as e:
    print(f"Error initializing ChromaDB: {e}")
    raise

# ───────────────────────────────
# MySQL Connection Helper
# ───────────────────────────────

def get_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='ainexa'
    )

# ───────────────────────────────
# Knowledge Base Search
# ───────────────────────────────

def search_knowledge_base(query: str) -> str:
    try:
        query_embedding = embedder.encode([query]).tolist()
        results = collection.query(
            query_embeddings=query_embedding,
            n_results=5,
            include=["documents"]
        )
        return "\n".join(results["documents"][0])
    except Exception as e:
        print(f"Search error: {e}")
        return ""

# ───────────────────────────────
# Prompt Builder
# ───────────────────────────────

def build_prompt(context, query, chat_history):
    flow_response = handle_conversation_flow(query)
    if flow_response:
        return flow_response

    contact_info = get_contact_response(query)

    history_text = "\n".join(
        f"User: {h['user']}\nAssistant: {h['assistant']}"
        for h in chat_history[-2:]
    ) if chat_history else "No previous conversation"

    query_lower = query.lower().strip()
    is_greeting = any(g in query_lower for g in ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'])

    response_guidelines = "- Be welcoming and brief" if is_greeting else (
        "- [Direct answer from context]\n"
        "- [Optional: One additional relevant fact]\n"
        "- For services: List max 3-4 key offerings\n"
        "- For comparisons: Use factual differentiators\n"
        "- For policies: Cite specific principles"
    )

    return f"""
        ROLE:
        You are Ainexa's official AI assistant. Respond as a knowledgeable but concise professional.

        RULES:
        1. STRICTLY use only the Company Knowledge below
        2. {f"Contacts: {contact_info}" if contact_info else "[Only provide contacts if explicitly asked]"}
        3. Unknown queries: "That information isn't in my knowledge base. Please visit www.ainexa.in for more."
        4. Never invent information
        5. {"Keep response to 1-2 sentences maximum" if is_greeting else "Keep responses to 2-3 sentences for simple answers, 4-5 for complex ones"}
        6. For acknowledgements: Use natural variations
        7. NEVER end responses with questions
        8. {"For greetings: Be warm and professional" if is_greeting else ""}

        CONVERSATION HISTORY:
        {history_text}

        COMPANY KNOWLEDGE:
        {context}

        CURRENT QUESTION:
        {query}

        RESPONSE GUIDELINES:
        {response_guidelines}
        """

# ───────────────────────────────
# ROUTES
# ───────────────────────────────

@app.route('/blogs', methods=['GET'])
def get_blogs():
    """Returns paginated list of blog entries"""
    page = request.args.get('page', default=1, type=int)
    limit = 10
    offset = (page - 1) * limit

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM blogs LIMIT %s OFFSET %s", (limit, offset))
    rows = cur.fetchall()
    cur.close()
    conn.close()

    blogs = [
        {
            "id": row[0],
            "title": row[1],
            "url": row[2],
            "file_id": row[3],
            "author": row[4],
            "created_at": row[5].strftime('%Y-%m-%d %H:%M:%S') if row[5] else None
        } for row in rows
    ]
    return jsonify(blogs), 200


@app.route('/blogsData', methods=['GET'])
def get_blog_content():
    """Returns JSON content from a blog file"""
    param = request.args.get('fileId', default='', type=str)
    if not param:
        return jsonify({'error': 'Missing fileId parameter'}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM blogs WHERE blog_name = %s', (param,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    if not rows:
        return jsonify({'key': 'no data'}), 404

    file_path = os.path.join('C:\\ainexa\\backend\\dataFolder', rows[0][3] + '.json')
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            json_content = json.load(f)
        return jsonify(json_content), 200
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON format'}), 500


@app.route('/chat', methods=['GET'])
def get_chat_response():
    """Returns Gemini-powered chat response"""
    user_input = request.args.get('userInput')
    history_raw = request.args.get('history', '[]')

    try:
        history = json.loads(history_raw)
    except Exception:
        history = []

    context = search_knowledge_base(user_input)
    prompt = build_prompt(context, user_input, history)
    response = model.generate_content(prompt, generation_config={"temperature": 0.1})
    assistant_reply = response.text.strip()

    print(f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} — User: {user_input}\nAinexa: {assistant_reply}")
    return jsonify({"reply": assistant_reply})

# ───────────────────────────────
# Run Server
# ───────────────────────────────

if __name__ == '__main__':
    app.run(debug=True)
