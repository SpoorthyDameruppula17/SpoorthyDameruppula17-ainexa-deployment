# chat_utils.py
import random

# Contact handling configuration
CONTACT_TRIGGERS = {
    "general": ["contact", "email", "mail", "reach", "connect", "get in touch", 
               "write to", "send message", "where to email", "how to contact"],
    "hr": ["hr", "human resources", "recruiting", "careers", "jobs", "talent",
           "hiring", "employment", "recruitment"],
    "phone": ["phone", "number", "call", "telephone", "mobile", "whatsapp", 
              "dial", "contact number", "phone number"],
    "website": ["website", "site", "web page", "online", "portal"]
}

CONVERSATION_CUES = {
    "acknowledgement": ["ok", "okay", "got it", "thanks", "thank you", "cool", 
                       "great", "awesome", "perfect", "fine"],
    "continuation": ["more", "continue", "go on", "what else", "and", 
                    "anything else", "next"]
}

def get_contact_response(query):
    """Dynamically generates contact information based on query"""
    query = query.lower()
    responses = []
    
    if any(trigger in query for trigger in CONTACT_TRIGGERS["general"]):
        responses.append("General inquiries: contact@ainexa.in")
    if any(trigger in query for trigger in CONTACT_TRIGGERS["hr"]):
        responses.append("HR inquiries: hr@ainexa.in")
    if any(trigger in query for trigger in CONTACT_TRIGGERS["phone"]):
        responses.append("Phone: [Not provided - please email for fastest response]")
    if any(trigger in query for trigger in CONTACT_TRIGGERS["website"]):
        responses.append("Website: www.ainexa.in")
    
    return " | ".join(responses) if responses else ""

def handle_conversation_flow(query):
    """Handles conversational cues like thanks/more"""
    query = query.lower().strip()
    
    if query in CONVERSATION_CUES["acknowledgement"]:
        return random.choice([
            "Understood!",
            "Got it!",
            "Happy to help!",
            "Let me know if you need anything else!"
        ])
        
    if query in CONVERSATION_CUES["continuation"]:
        return "Would you like me to elaborate on any specific aspect?"
        
    return None