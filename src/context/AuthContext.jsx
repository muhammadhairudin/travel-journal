import React, { createContext, useState, useEffect } from 'react';
import { validateToken, getUserRole } from '../services/authService';
import axiosInstance from '../services/axiosInstance';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const isValid = await validateToken();
      if (isValid) {
        setIsAuthenticated(true);
        setUserRole(getUserRole());
      } else {
        // Clear everything if token invalid
        localStorage.clear();
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.clear();
      setIsAuthenticated(false);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint sebelum clear data
      await axiosInstance.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Tetap clear data meskipun ada error
      localStorage.clear();
      setIsAuthenticated(false);
      setUserRole(null);
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole,
      logout,
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 