import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginRequest } from '../services/authService';
import { showToast } from '../utils/toast';
import { getFormErrors, isErrorObjectEmpty, validateLoginField } from '../utils/validators';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isFormValid = useMemo(() => {
    const nextErrors = getFormErrors(form, validateLoginField);
    return isErrorObjectEmpty(nextErrors);
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);
    setErrors((current) => {
      const nextErrors = { ...current };
      const error = validateLoginField(name, value);
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
    const nextErrors = getFormErrors(form, validateLoginField);
    setErrors(nextErrors);

    if (!isErrorObjectEmpty(nextErrors)) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await loginRequest(form);
      login(response.user, response.token);
      showToast(response.message || 'Login successful');
      navigate('/dashboard');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="form-container">
        <h2>Sign in to HomeRise</h2>
        <p className="page-note">Continue to your dashboard, saved properties, and recommendations.</p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
          {errors.email && <div className="error">{errors.email}</div>}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />
          {errors.password && <div className="error">{errors.password}</div>}

          <button className="primary-btn" type="submit" disabled={!isFormValid || submitting}>
            {submitting ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
