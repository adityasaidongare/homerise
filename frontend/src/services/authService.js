import api from './api';

const normalizeError = (error, fallback) => {
  throw new Error(error.response?.data?.message || fallback);
};

export const register = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    normalizeError(error, 'Registration failed');
  }
};

export const login = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    normalizeError(error, 'Login failed');
  }
};
