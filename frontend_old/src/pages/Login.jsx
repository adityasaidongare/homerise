import React, { useState } from 'react';
import { login } from '../services/authService';
import { validateEmail, validatePassword } from '../utils/validators';
import { showToast } from '../utils/toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();

  const validate = (field, value) => {
    let err = '';
    if (!value) err = 'Required';
    else if (field === 'email' && !validateEmail(value)) err = 'Invalid email';
    else if (field === 'password' && !validatePassword(value)) err = 'Min 8 chars, 1 upper, 1 lower, 1 number';
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const isFormValid = () => {
    return (
      form.email && form.password &&
      !validate('email', form.email) &&
      !validate('password', form.password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await login(form);
      doLogin(res.user, res.token);
      showToast('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <div className="error">{errors.password}</div>}
        <button type="submit" disabled={!isFormValid() || submitting}>Login</button>
      </form>
    </div>
  );
};

export default Login;
