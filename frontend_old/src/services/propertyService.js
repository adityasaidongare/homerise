import api from './api';

export const getProperties = async () => {
  const res = await api.get('/properties');
  return res.data;
};

export const createProperty = async (data) => {
  const res = await api.post('/properties', data);
  return res.data;
};

export const updateProperty = async (id, data) => {
  const res = await api.put(`/properties/${id}`, data);
  return res.data;
};

export const deleteProperty = async (id) => {
  const res = await api.delete(`/properties/${id}`);
  return res.data;
};
