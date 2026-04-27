import React, { useEffect, useState } from 'react';
import { getRecommendations, createRecommendation, updateRecommendation, deleteRecommendation } from '../services/recommendationService';
import { showToast } from '../utils/toast';

const initialForm = {
  title: '', category: '', description: '', estimatedCost: '', roiPercentage: '', difficulty: '', imageUrl: '', isActive: true
};

const AdminRecommendations = () => {
  const [recs, setRecs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchRecs = async () => {
    try {
      const res = await getRecommendations();
      setRecs(res.data);
    } catch (err) {
      showToast('Failed to fetch recommendations', 'error');
    }
  };

  useEffect(() => { fetchRecs(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRecommendation(editingId, form);
        showToast('Recommendation updated!');
      } else {
        await createRecommendation(form);
        showToast('Recommendation created!');
      }
      setForm(initialForm);
      setEditingId(null);
      fetchRecs();
    } catch (err) {
      showToast('Error saving recommendation', 'error');
    }
  };

  const handleEdit = (r) => {
    setForm(r);
    setEditingId(r.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this recommendation?')) {
      await deleteRecommendation(id);
      showToast('Recommendation deleted!');
      fetchRecs();
    }
  };

  return (
    <div className="admin-recommendations-page">
      <h2>All Recommendations</h2>
      <form onSubmit={handleSubmit} className="recommendation-form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="estimatedCost" placeholder="Estimated Cost" value={form.estimatedCost} onChange={handleChange} />
        <input name="roiPercentage" placeholder="ROI %" value={form.roiPercentage} onChange={handleChange} />
        <input name="difficulty" placeholder="Difficulty" value={form.difficulty} onChange={handleChange} />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
        <label>
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Active
        </label>
        <button type="submit">{editingId ? 'Update' : 'Add'} Recommendation</button>
      </form>
      <ul className="recommendation-list">
        {recs.map((r) => (
          <li key={r.id}>
            <b>{r.title}</b> ({r.category})<br />
            {r.description}<br />
            <span>Cost: ₹{r.estimatedCost} | ROI: {r.roiPercentage}% | Difficulty: {r.difficulty}</span>
            <button onClick={() => handleEdit(r)}>Edit</button>
            <button onClick={() => handleDelete(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminRecommendations;
