import axios from 'axios';

// Base API URL falls back to relative /api or VITE_API_URL
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 45000 // 45s for generative AI responses
});

export const api = {
  checkHealth: async () => {
    const res = await client.get('/health');
    return res.data;
  },

  createCase: async ({ premise, difficulty }) => {
    const res = await client.post('/cases', { premise, difficulty });
    return res.data;
  },

  getRecentCases: async () => {
    const res = await client.get('/cases');
    return res.data;
  },

  getCase: async (id) => {
    const res = await client.get(`/cases/${id}`);
    return res.data;
  },

  discoverClue: async (caseId, clueId) => {
    const res = await client.post(`/cases/${caseId}/clues/${clueId}/discover`);
    return res.data;
  },

  requestHint: async (caseId) => {
    const res = await client.post(`/cases/${caseId}/hints`);
    return res.data;
  },

  submitAccusation: async (caseId, suspectId) => {
    const res = await client.post(`/cases/${caseId}/accuse`, { suspectId });
    return res.data;
  },

  getCaseResult: async (caseId) => {
    const res = await client.get(`/cases/${caseId}/result`);
    return res.data;
  }
};

export default api;
