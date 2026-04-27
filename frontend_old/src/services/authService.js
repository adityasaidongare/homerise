import api from './api';

export const register = async (data) => {
  try {
    const res = await api.post('/auth/register', data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const login = async (data) => {
  try {
    const res = await api.post('/auth/login', data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
