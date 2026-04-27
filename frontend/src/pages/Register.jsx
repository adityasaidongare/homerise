import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { showToast } from '../utils/toast';
import { getFormErrors, isErrorObjectEmpty, validateRegisterField } from '../utils/validators';

const initialForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  role: 'USER',
};

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const isFormValid = useMemo(() => {
    const nextErrors = getFormErrors(form, validateRegisterField);
    return isErrorObjectEmpty(nextErrors);
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const nextErrors = { ...current };
      const error = validateRegisterField(name, value);
      if (error) {
        nextErrors[name] = error;
      } else {
        delete nextErrors[name];
      }
      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = getFormErrors(form, validateRegisterField);
    setErrors(nextErrors);

    if (!isErrorObjectEmpty(nextErrors)) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await register(form);
      showToast(response.message || 'Registration successful');
      setForm(initialForm);
      navigate('/login');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="form-container">
        <h2>Create your HomeRise account</h2>
        <p className="page-note">Register as a homeowner or admin to manage recommendations and property upgrades.</p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" placeholder="Aditya Sharma" value={form.name} onChange={handleChange} />
          {errors.name && <div className="error">{errors.name}</div>}

          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
          {errors.email && <div className="error">{errors.email}</div>}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="8+ chars with upper, lower, and number" value={form.password} onChange={handleChange} />
          {errors.password && <div className="error">{errors.password}</div>}

          <label htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} />
          {errors.phone && <div className="error">{errors.phone}</div>}

          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={form.role} onChange={handleChange}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {errors.role && <div className="error">{errors.role}</div>}

          <button className="primary-btn" type="submit" disabled={!isFormValid || submitting}>
            {submitting ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
