'use client';

import React, { useState } from 'react';
import './css/ChatBot.css';

interface Message {
  type: 'user' | 'agent';
  text: string;
}


const ChatBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const toggleChat = () => setIsVisible(!isVisible);

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages(prev => [...prev, { type: 'user', text: input }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'agent', text: "Hi, I'm Ainexa. How can I help?" }]);
      }, 500);
    }
  };

  return (
    <>
      <div id="chat-toggle" onClick={toggleChat}>💬</div>

      <div id="chat-container" className={isVisible ? 'visible' : 'hidden'}>
        <h3 className="chat-title">AskAinexa</h3>
        <div id="chat-history">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type === 'user' ? 'user-message' : 'agent-message'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div id="input-container">
          <input
            type="text"
            id="user-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Ainexa..."
          />
          <button id="mic-button" title="Speak" className="voice-icon-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#4f46e5" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="10" width="2" height="4" rx="1"/>
              <rect x="6" y="8" width="2" height="8" rx="1"/>
              <rect x="10" y="5" width="2" height="14" rx="1"/>
              <rect x="14" y="8" width="2" height="8" rx="1"/>
              <rect x="18" y="10" width="2" height="4" rx="1"/>
            </svg>
          </button>
          <button id="send-button" onClick={sendMessage}>
            <span className="send-icon">&#10148;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
