import React, { useEffect, useMemo, useState } from 'react';
import { createProperty, deleteProperty, getProperties, updateProperty } from '../services/propertyService';
import { showToast } from '../utils/toast';
import { getFormErrors, isErrorObjectEmpty, validatePropertyField } from '../utils/validators';

const initialForm = {
  address: '',
  city: '',
  pincode: '',
  propertyType: '',
  builtArea: '',
  budget: '',
  currentCondition: '',
  goals: '',
};

const AdminListings = () => {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const isFormValid = useMemo(() => isErrorObjectEmpty(getFormErrors(form, validatePropertyField)), [form]);

  const loadProperties = async () => {
    try {
      const response = await getProperties();
      setProperties(response.data || []);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      const error = validatePropertyField(name, value);
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
    const nextErrors = getFormErrors(form, validatePropertyField);
    setErrors(nextErrors);
    if (!isErrorObjectEmpty(nextErrors)) return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        builtArea: Number(form.builtArea),
        budget: Number(form.budget),
      };
      const response = editingId ? await updateProperty(editingId, payload) : await createProperty(payload);
      showToast(response.message || 'Property saved');
      resetForm();
      loadProperties();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (property) => {
    setForm({
      address: property.address || '',
      city: property.city || '',
      pincode: property.pincode || '',
      propertyType: property.propertyType || '',
      builtArea: property.builtArea || '',
      budget: property.budget || '',
      currentCondition: property.currentCondition || '',
      goals: property.goals || '',
    });
    setEditingId(property.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      const response = await deleteProperty(id);
      showToast(response.message || 'Property deleted');
      loadProperties();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="admin-listings-page">
      <div className="section-head">
        <div>
          <h2>Property Listings</h2>
          <p>Admin can manage every property record stored in the platform.</p>
        </div>
      </div>

      <form className="section-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          {Object.keys(initialForm).map((field) => (
            <div key={field}>
              <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())}</label>
              <input id={field} name={field} value={form[field]} onChange={handleChange} />
              {errors[field] && <div className="error">{errors[field]}</div>}
            </div>
          ))}
        </div>
        <div className="form-actions">
          <button className="primary-btn" type="submit" disabled={!isFormValid || saving}>
            {saving ? 'Saving...' : editingId ? 'Update Listing' : 'Create Listing'}
          </button>
          {editingId && <button type="button" className="secondary-btn" onClick={resetForm}>Cancel edit</button>}
        </div>
      </form>

      <ul className="property-list">
        {properties.map((property) => (
          <li key={property.id}>
            <strong>{property.address}</strong>
            <div className="item-meta">{property.city}, {property.pincode}</div>
            <div className="item-meta">Type: {property.propertyType} | Budget: Rs. {property.budget}</div>
            <div className="item-actions">
              <button className="secondary-btn" onClick={() => handleEdit(property)}>Edit</button>
              <button className="danger-btn" onClick={() => handleDelete(property.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminListings;
