import React, { useEffect, useState } from 'react';
import { showToast } from '../utils/toast';
import './ToastContainer.css';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      setToasts((current) => [...current, event.detail]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== event.detail.id));
      }, 2800);
    };

    window.addEventListener('app-toast', handleToast);
    return () => window.removeEventListener('app-toast', handleToast);
  }, []);

  useEffect(() => {
    const offlineNotice = () => showToast('You are offline. Changes will sync once connectivity returns.', 'error');
    window.addEventListener('offline', offlineNotice);
    return () => window.removeEventListener('offline', offlineNotice);
  }, []);

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
