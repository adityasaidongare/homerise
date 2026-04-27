import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="section-card">
        <div className="section-head">
          <div>
            <h2>Welcome, {user?.name || 'Homeowner'}</h2>
            <p>Use HomeRise to manage your property details and compare practical improvement ideas.</p>
          </div>
        </div>
        <div className="card-grid">
          <div className="data-card">
            <h3>Account overview</h3>
            <p className="item-meta">Email: {user?.email}</p>
            <p className="item-meta">Role: {user?.role}</p>
          </div>
          <div className="data-card">
            <h3>What to do next</h3>
            <p className="item-meta">1. Add your property details.</p>
            <p className="item-meta">2. Review recommendations with cost and ROI.</p>
            <p className="item-meta">3. Update entries as your renovation plan evolves.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
