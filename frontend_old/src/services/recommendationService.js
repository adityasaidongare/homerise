import api from './api';

export const getRecommendations = async () => {
  const res = await api.get('/recommendations');
  return res.data;
};

export const createRecommendation = async (data) => {
  const res = await api.post('/recommendations', data);
  return res.data;
};

export const updateRecommendation = async (id, data) => {
  const res = await api.put(`/recommendations/${id}`, data);
  return res.data;
};

export const deleteRecommendation = async (id) => {
  const res = await api.delete(`/recommendations/${id}`);
  return res.data;
};
