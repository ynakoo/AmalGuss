import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

export const productAPI = {
  getAll: (filters = {}) => api.get('/products', { params: filters }),
  getById: (id) => api.get(`/products/${id}`),
};

export const aiAPI = {
  match: (query, role) => api.post('/ai/match', { query, role }),
};

export const estimateAPI = {
  calculate: (data) => api.post('/estimates/calculate', data),
};

export const rateAPI = {
  getToday: () => api.get('/rates/today'),
  getHistory: (type, days = 7) => api.get('/rates/history', { params: { type, days } }),
};

export const vendorAPI = {
  getAll: () => api.get('/vendors'),
  compare: (productId) => api.get('/vendors/compare', { params: { productId } }),
};

export default api;
