import React, { useEffect, useState } from 'react';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../services/propertyService';
import { showToast } from '../utils/toast';

const AdminListings = () => {
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ address: '', city: '', pincode: '', propertyType: '', builtArea: '', budget: '', currentCondition: '', goals: '' });

  const fetchProperties = async () => {
    try {
      const res = await getProperties();
      setProperties(res.data);
    } catch (err) {
      showToast('Failed to fetch properties', 'error');
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this property?')) {
      await deleteProperty(id);
      showToast('Property deleted!');
      fetchProperties();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
      setForm({ address: '', city: '', pincode: '', propertyType: '', builtArea: '', budget: '', currentCondition: '', goals: '' });
      setEditingId(null);
      fetchProperties();
    } catch (err) {
      showToast('Error saving property', 'error');
    }
  };

  return (
    <div className="admin-listings-page">
      <h2>All Property Listings</h2>
      <form onSubmit={handleSubmit} className="property-form">
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
        <input name="propertyType" placeholder="Property Type" value={form.propertyType} onChange={handleChange} />
        <input name="builtArea" placeholder="Built Area (sqft)" value={form.builtArea} onChange={handleChange} />
        <input name="budget" placeholder="Budget" value={form.budget} onChange={handleChange} />
        <input name="currentCondition" placeholder="Current Condition" value={form.currentCondition} onChange={handleChange} />
        <input name="goals" placeholder="Goals" value={form.goals} onChange={handleChange} />
        <button type="submit">{editingId ? 'Update' : 'Add'} Property</button>
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

export default AdminListings;
