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

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isFormValid = useMemo(() => isErrorObjectEmpty(getFormErrors(form, validatePropertyField)), [form]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await getProperties();
      setProperties(response.data || []);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
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

      const response = editingId
        ? await updateProperty(editingId, payload)
        : await createProperty(payload);

      showToast(response.message || `Property ${editingId ? 'updated' : 'created'} successfully`);
      resetForm();
      fetchProperties();
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
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return;

    try {
      const response = await deleteProperty(id);
      showToast(response.message || 'Property deleted');
      if (editingId === id) resetForm();
      fetchProperties();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="properties-page">
      <div className="section-card">
        <div className="section-head">
          <div>
            <h2>Your Properties</h2>
            <p>Add, edit, and track the home details that shape your recommendations.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label htmlFor="address">Address</label>
              <input id="address" name="address" value={form.address} onChange={handleChange} />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input id="city" name="city" value={form.city} onChange={handleChange} />
              {errors.city && <div className="error">{errors.city}</div>}
            </div>
            <div>
              <label htmlFor="pincode">Pincode</label>
              <input id="pincode" name="pincode" value={form.pincode} onChange={handleChange} />
              {errors.pincode && <div className="error">{errors.pincode}</div>}
            </div>
            <div>
              <label htmlFor="propertyType">Property type</label>
              <input id="propertyType" name="propertyType" value={form.propertyType} onChange={handleChange} />
              {errors.propertyType && <div className="error">{errors.propertyType}</div>}
            </div>
            <div>
              <label htmlFor="builtArea">Built area (sq ft)</label>
              <input id="builtArea" name="builtArea" value={form.builtArea} onChange={handleChange} />
              {errors.builtArea && <div className="error">{errors.builtArea}</div>}
            </div>
            <div>
              <label htmlFor="budget">Budget</label>
              <input id="budget" name="budget" value={form.budget} onChange={handleChange} />
              {errors.budget && <div className="error">{errors.budget}</div>}
            </div>
            <div>
              <label htmlFor="currentCondition">Current condition</label>
              <input id="currentCondition" name="currentCondition" value={form.currentCondition} onChange={handleChange} />
              {errors.currentCondition && <div className="error">{errors.currentCondition}</div>}
            </div>
            <div>
              <label htmlFor="goals">Goals</label>
              <input id="goals" name="goals" value={form.goals} onChange={handleChange} />
              {errors.goals && <div className="error">{errors.goals}</div>}
            </div>
          </div>

          <div className="form-actions">
            <button className="primary-btn" type="submit" disabled={!isFormValid || saving}>
              {saving ? 'Saving...' : editingId ? 'Update Property' : 'Add Property'}
            </button>
            {editingId && (
              <button type="button" className="secondary-btn" onClick={resetForm}>
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="section-card" style={{ marginTop: '1rem' }}>
        <div className="section-head">
          <div>
            <h3>Saved property records</h3>
            <p>{loading ? 'Loading your entries...' : `${properties.length} property records available.`}</p>
          </div>
        </div>
        <ul className="property-list">
          {properties.map((property) => (
            <li key={property.id}>
              <strong>{property.address}</strong>
              <div className="item-meta">
                {property.city}, {property.pincode} | {property.propertyType} | Built Area: {property.builtArea} sq ft | Budget: Rs. {property.budget}
              </div>
              <div className="item-meta">Condition: {property.currentCondition}</div>
              <div className="item-meta">Goals: {property.goals}</div>
              <div className="item-actions">
                <button className="secondary-btn" onClick={() => handleEdit(property)}>Edit</button>
                <button className="danger-btn" onClick={() => handleDelete(property.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Properties;
