import React, { useEffect, useState } from 'react';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../services/propertyService';
import { validatePincode, validateBudget } from '../utils/validators';
import { showToast } from '../utils/toast';

const initialForm = {
  address: '', city: '', pincode: '', propertyType: '', builtArea: '', budget: '', currentCondition: '', goals: ''
};

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await getProperties();
      setProperties(res.data);
    } catch (err) {
      showToast('Failed to fetch properties', 'error');
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  const validate = (field, value) => {
    let err = '';
    if (!value) err = 'Required';
    else if (field === 'pincode' && !validatePincode(value)) err = '6 digits required';
    else if (field === 'budget' && !validateBudget(value)) err = 'Min 10000';
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const isFormValid = () => {
    return (
      form.address && form.city && form.pincode && form.propertyType && form.builtArea && form.budget &&
      !validate('pincode', form.pincode) && !validate('budget', form.budget)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProperty(editingId, form);
        showToast('Property updated!');
      } else {
        await createProperty(form);
        showToast('Property created!');
      }
      setForm(initialForm);
      setEditingId(null);
      fetchProperties();
    } catch (err) {
      showToast('Error saving property', 'error');
    }
  };

  const handleEdit = (property) => {
    setForm(property);
    setEditingId(property.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this property?')) {
      await deleteProperty(id);
      showToast('Property deleted!');
      fetchProperties();
    }
  };

  return (
    <div className="properties-page">
      <h2>Your Properties</h2>
      <form onSubmit={handleSubmit} className="property-form">
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
        {errors.pincode && <div className="error">{errors.pincode}</div>}
        <input name="propertyType" placeholder="Property Type" value={form.propertyType} onChange={handleChange} />
        <input name="builtArea" placeholder="Built Area (sqft)" value={form.builtArea} onChange={handleChange} />
        <input name="budget" placeholder="Budget" value={form.budget} onChange={handleChange} />
        {errors.budget && <div className="error">{errors.budget}</div>}
        <input name="currentCondition" placeholder="Current Condition" value={form.currentCondition} onChange={handleChange} />
        <input name="goals" placeholder="Goals" value={form.goals} onChange={handleChange} />
        <button type="submit" disabled={!isFormValid()}>{editingId ? 'Update' : 'Add'} Property</button>
      </form>
      <ul className="property-list">
        {properties.map((p) => (
          <li key={p.id}>
            <b>{p.address}</b> ({p.city}) - ₹{p.budget}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Properties;
