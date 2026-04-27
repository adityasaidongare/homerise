import axios from 'axios';
import { showToast } from '../utils/toast';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      showToast(message || 'Your session has expired. Please log in again.', 'error');
      window.location.href = '/login';
    }

    if (status === 500) {
      showToast(message || 'Server error. Please try again later.', 'error');
    }

    return Promise.reject(error);
  }
);

export default api;
