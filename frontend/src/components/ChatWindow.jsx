import React from 'react';
import Message from './Message';
 
const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <Message key={idx} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};
 
export default ChatWindow;