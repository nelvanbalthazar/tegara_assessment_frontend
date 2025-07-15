import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach bearer token from localStorage if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers = {
     Authorization: token ? `Bearer ${token}` : '',
  };

  return config;
});

export default api;
