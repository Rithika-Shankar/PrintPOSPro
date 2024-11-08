import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const transcribeSpeech = async () => api.get('/api/transcribe');
export const confirmPrescription = async (prescription) => api.post('/api/confirm', { prescription });
export const printPrescription = async (data) => api.post('/api/print', data);
