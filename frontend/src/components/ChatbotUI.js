import React from 'react';
import Chatbot from 'laravel-chatbot-ui';

const ChatbotUI = () => {
  return (
    <div className="chatbot">
      <Chatbot url="/chatbot/conversations" />
    </div>
  );
};

export default ChatbotUI;
