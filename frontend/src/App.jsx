import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './pages/PageStyles.css';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './context/AuthContext';
import Admin from './pages/Admin';
import AdminListings from './pages/AdminListings';
import AdminRecommendations from './pages/AdminRecommendations';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Properties from './pages/Properties';
import Recommendations from './pages/Recommendations';
import Register from './pages/Register';

const App = () => (
  <AuthProvider>
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/properties" element={<PrivateRoute><Properties /></PrivateRoute>} />
        <Route path="/recommendations" element={<PrivateRoute><Recommendations /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute adminOnly={true}><Admin /></PrivateRoute>}>
          <Route index element={<Navigate to="listings" replace />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="recommendations" element={<AdminRecommendations />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
