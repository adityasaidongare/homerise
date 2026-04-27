import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Admin = () => (
  <div className="admin-layout">
    <Sidebar />
    <div className="admin-content">
      <Outlet />
    </div>
  </div>
);

export default Admin;
