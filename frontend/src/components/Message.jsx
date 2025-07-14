import React from 'react';
 
const Message = ({ text, sender }) => {
  const isUser = sender === 'me';
  return (
    <div className={`message ${isUser ? 'from-me' : 'from-them'}`}>
      {text}
    </div>
  );
};
 
export default Message;
 