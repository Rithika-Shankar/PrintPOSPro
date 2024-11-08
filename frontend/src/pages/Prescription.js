import React, { useState } from 'react';
import { transcribeSpeech, confirmPrescription, printPrescription } from '../api';

const Prescription = () => {
  const [text, setText] = useState('');
  const [billing, setBilling] = useState(null);

  const handleTranscription = async () => {
    const response = await transcribeSpeech();
    setText(response.data.transcription);
  };

  const handleConfirm = async () => {
    const response = await confirmPrescription(text);
    setBilling(response.data.billing);
  };

  const handlePrint = async () => {
    await printPrescription({ text, billing });
    alert('Prescription printed successfully!');
  };

  return (
    <div>
      <button onClick={handleTranscription}>Start Transcription</button>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleConfirm}>Confirm</button>
      {billing && <button onClick={handlePrint}>Print</button>}
    </div>
  );
};

export default Prescription;
