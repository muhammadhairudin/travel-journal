import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import { getUserRole } from './services/authService';

function App() {
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  return (
    <BrowserRouter>
      <AppRouter userRole={userRole} />
    </BrowserRouter>
  );
}

export default App;