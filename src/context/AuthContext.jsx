import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (token && storedUserRole) {
      setIsAuthenticated(true);
      setUserRole(storedUserRole);
      setUserData(storedUserData);
    }
  }, []);

  const login = (token, role, data) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userData', JSON.stringify(data));
    setIsAuthenticated(true);
    setUserRole(role);
    setUserData(data);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole('guest');
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      userData,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 