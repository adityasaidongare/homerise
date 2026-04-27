import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        HomeRise
      </NavLink>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/properties">Properties</NavLink>
            <NavLink to="/recommendations">Recommendations</NavLink>
            {user?.role === 'ADMIN' && <NavLink to="/admin/listings">Admin</NavLink>}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
