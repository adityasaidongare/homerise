import React, { useEffect, useMemo, useState } from 'react';
import { createRecommendation, deleteRecommendation, getRecommendations, updateRecommendation } from '../services/recommendationService';
import { showToast } from '../utils/toast';
import { getFormErrors, isErrorObjectEmpty, validateRecommendationField } from '../utils/validators';

const initialForm = {
  title: '',
  category: 'Painting',
  description: '',
  estimatedCost: '',
  roiPercentage: '',
  difficulty: 'Easy',
  imageUrl: '',
  isActive: true,
};

const categories = ['Painting', 'Flooring', 'Kitchen', 'Bathroom', 'Lighting', 'Garden', 'Security', 'Smart Home', 'Vastu'];
const difficulties = ['Easy', 'Medium', 'Hard'];

const AdminRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const isFormValid = useMemo(() => isErrorObjectEmpty(getFormErrors(form, validateRecommendationField)), [form]);

  const loadRecommendations = async () => {
    try {
      const response = await getRecommendations();
      setRecommendations(response.data || []);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;
    setForm((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => {
      const next = { ...current };
      const error = validateRecommendationField(name, nextValue);
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = getFormErrors(form, validateRecommendationField);
    setErrors(nextErrors);
    if (!isErrorObjectEmpty(nextErrors)) return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        estimatedCost: Number(form.estimatedCost),
        roiPercentage: Number(form.roiPercentage),
      };
      const response = editingId ? await updateRecommendation(editingId, payload) : await createRecommendation(payload);
      showToast(response.message || 'Recommendation saved');
      resetForm();
      loadRecommendations();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (recommendation) => {
    setForm({
      title: recommendation.title || '',
      category: String(recommendation.category || 'Painting').replace('_', ' '),
      description: recommendation.description || '',
      estimatedCost: recommendation.estimatedCost || '',
      roiPercentage: recommendation.roiPercentage || '',
      difficulty: recommendation.difficulty || 'Easy',
      imageUrl: recommendation.imageUrl || '',
      isActive: recommendation.isActive ?? true,
    });
    setEditingId(recommendation.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recommendation?')) return;
    try {
      const response = await deleteRecommendation(id);
      showToast(response.message || 'Recommendation deleted');
      loadRecommendations();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="admin-recommendations-page">
      <div className="section-head">
        <div>
          <h2>Recommendation Catalog</h2>
          <p>Admin can create, update, and remove property enhancement ideas.</p>
        </div>
      </div>

      <form className="section-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            {errors.category && <div className="error">{errors.category}</div>}
          </div>
          <div>
            <label htmlFor="estimatedCost">Estimated cost</label>
            <input id="estimatedCost" name="estimatedCost" value={form.estimatedCost} onChange={handleChange} />
            {errors.estimatedCost && <div className="error">{errors.estimatedCost}</div>}
          </div>
          <div>
            <label htmlFor="roiPercentage">ROI percentage</label>
            <input id="roiPercentage" name="roiPercentage" value={form.roiPercentage} onChange={handleChange} />
            {errors.roiPercentage && <div className="error">{errors.roiPercentage}</div>}
          </div>
          <div>
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange}>
              {difficulties.map((difficulty) => <option key={difficulty} value={difficulty}>{difficulty}</option>)}
            </select>
            {errors.difficulty && <div className="error">{errors.difficulty}</div>}
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL</label>
            <input id="imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="4" value={form.description} onChange={handleChange} />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>

        <label style={{ marginTop: '1rem' }}>
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} style={{ width: 'auto', marginRight: '0.5rem' }} />
          Active recommendation
        </label>

        <div className="form-actions">
          <button className="primary-btn" type="submit" disabled={!isFormValid || saving}>
            {saving ? 'Saving...' : editingId ? 'Update Recommendation' : 'Create Recommendation'}
          </button>
          {editingId && <button type="button" className="secondary-btn" onClick={resetForm}>Cancel edit</button>}
        </div>
      </form>

      <ul className="recommendation-list">
        {recommendations.map((recommendation) => (
          <li key={recommendation.id}>
            <strong>{recommendation.title}</strong>
            <div className="item-meta">{String(recommendation.category).replace('_', ' ')} | Difficulty: {recommendation.difficulty}</div>
            <div className="item-meta">Cost: Rs. {recommendation.estimatedCost} | ROI: {recommendation.roiPercentage}%</div>
            <div className="item-meta">{recommendation.description}</div>
            <div className="item-actions">
              <button className="secondary-btn" onClick={() => handleEdit(recommendation)}>Edit</button>
              <button className="danger-btn" onClick={() => handleDelete(recommendation.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminRecommendations;
