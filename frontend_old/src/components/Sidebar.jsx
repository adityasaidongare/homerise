import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="sidebar">
    <ul>
      <li><Link to="/admin/listings">Property Listings</Link></li>
      <li><Link to="/admin/recommendations">Recommendations</Link></li>
    </ul>
  </aside>
);

export default Sidebar;
