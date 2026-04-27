import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="dashboard-page">
      <h2>Welcome, {user?.name}!</h2>
      <p>Your role: {user?.role}</p>
      <p>Use the navigation to manage your properties and view recommendations.</p>
    </div>
  );
};

export default Dashboard;
