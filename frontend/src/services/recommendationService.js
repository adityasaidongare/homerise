import api from './api';

const mapError = (error, fallback) => {
  throw new Error(error.response?.data?.message || fallback);
};

export const getRecommendations = async () => {
  try {
    const response = await api.get('/recommendations');
    return response.data;
  } catch (error) {
    mapError(error, 'Unable to fetch recommendations');
  }
};

export const createRecommendation = async (data) => {
  try {
    const response = await api.post('/recommendations', data);
    return response.data;
  } catch (error) {
    mapError(error, 'Unable to create recommendation');
  }
};

export const updateRecommendation = async (id, data) => {
  try {
    const response = await api.put(`/recommendations/${id}`, data);
    return response.data;
  } catch (error) {
    mapError(error, 'Unable to update recommendation');
  }
};

export const deleteRecommendation = async (id) => {
  try {
    const response = await api.delete(`/recommendations/${id}`);
    return response.data;
  } catch (error) {
    mapError(error, 'Unable to delete recommendation');
  }
};
