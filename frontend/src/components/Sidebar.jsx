import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <h3>Admin Panel</h3>
    <nav>
      <NavLink to="/admin/listings">Property Listings</NavLink>
      <NavLink to="/admin/recommendations">Recommendations</NavLink>
    </nav>
  </aside>
);

export default Sidebar;
