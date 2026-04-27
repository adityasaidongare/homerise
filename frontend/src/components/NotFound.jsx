import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="dashboard-page">
    <h2>404 - Page Not Found</h2>
    <p>The route you tried does not exist in HomeRise.</p>
    <Link to="/" className="inline-link">Return to home</Link>
  </div>
);

export default NotFound;
