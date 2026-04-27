import React, { useState } from 'react';
import { register } from '../services/authService';
import { validateEmail, validatePassword, validatePhone } from '../utils/validators';
import { showToast } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', role: 'USER',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = (field, value) => {
    let err = '';
    if (!value) err = 'Required';
    else if (field === 'email' && !validateEmail(value)) err = 'Invalid email';
    else if (field === 'password' && !validatePassword(value)) err = 'Min 8 chars, 1 upper, 1 lower, 1 number';
    else if (field === 'phone' && !validatePhone(value)) err = '10 digits required';
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const isFormValid = () => {
    return (
      form.name && form.email && form.password && form.phone &&
      !validate('email', form.email) &&
      !validate('password', form.password) &&
      !validate('phone', form.phone)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(form);
      showToast('Registration successful!');
      navigate('/login');
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        {errors.name && <div className="error">{errors.name}</div>}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <div className="error">{errors.password}</div>}
        <input name="phone" placeholder="Phone (10 digits)" value={form.phone} onChange={handleChange} />
        {errors.phone && <div className="error">{errors.phone}</div>}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" disabled={!isFormValid() || submitting}>Register</button>
      </form>
    </div>
  );
};

export default Register;
