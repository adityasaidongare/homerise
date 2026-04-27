import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const parseTokenPayload = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};

const isTokenExpired = (token) => {
  const payload = parseTokenPayload(token);
  if (!payload?.exp) {
    return true;
  }
  return payload.exp * 1000 <= Date.now();
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const logout = (redirectToLogin = true) => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    if (redirectToLogin && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  };

  const login = (userData, jwtToken) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    if (isTokenExpired(token)) {
      logout(false);
      return;
    }

    const payload = parseTokenPayload(token);
    const timeout = window.setTimeout(() => logout(), Math.max(payload.exp * 1000 - Date.now(), 0));
    return () => window.clearTimeout(timeout);
  }, [token]);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout(false);
    }
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user && !isTokenExpired(token)),
      login,
      logout,
      isTokenExpired: () => (token ? isTokenExpired(token) : true),
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
