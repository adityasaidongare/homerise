import api from './api';

const mapError = (error, fallback) => {
  throw new Error(error.response?.data?.message || fallback);
};

export const getProperties = async () => {
  try {
    const response = await api.get('/properties');
    return response.data;
  } catch (error) {
    mapError(error, 'Unable to fetch properties');
  }
};

export const createProperty = async (data) => {
  try {
    const response = await api.post('/properties', data);
    return response.data;
  } catch (error) {
    mapError(error, 'Unable to create property');
  }
};

export const updateProperty = async (id, data) => {
  try {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  } catch (error) {
    mapError(error, 'Unable to update property');
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  } catch (error) {
    mapError(error, 'Unable to delete property');
  }
};
