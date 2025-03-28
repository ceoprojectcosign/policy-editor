import React, { useState } from 'react';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const res = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setMessages(prev => [...prev, { sender: 'bot', text: data.response || data.message }]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            <span className="inline-block px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="px-4 bg-indigo-600 text-white rounded">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;