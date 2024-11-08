import React from 'react';
import Prescription from './pages/Prescription';
import ChatbotUI from './components/ChatbotUI';
import './styles.css';

function App() {
  return (
    <div className="App">
      <h1>PrintPOS Pro</h1>
      <Prescription />
      <ChatbotUI />
    </div>
  );
}

export default App;
