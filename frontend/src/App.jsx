import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
 
function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
 
  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8081/ws');
 
    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { sender: 'bot', text: event.data }]);
    };
  socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };
    return () => socketRef.current.close();
  }, []);
 
  const handleSend = async () => {
    if (!text.trim()) return;
 
    // REST
    // axios.post('http://localhost:8080/api/chat/send', { message: text });
    axios.post("http://localhost:8081/send", { message: text });
 
 
 
    // WebSocket
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(text);
    }
 
    setMessages((prev) => [...prev, { sender: 'me', text }]);
    setText('');
  };
 
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Chatbot (Spring Boot + WebSocket)</h1>
      <div className="border p-4 h-80 overflow-y-auto bg-gray-100">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded-r">Send</button>
      </div>
    </div>
  );
}
 
export default App;