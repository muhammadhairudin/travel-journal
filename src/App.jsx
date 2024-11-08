import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getUserRole } from './services/authService';
import GuestLayout from './layouts/GuestLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Dashboard from './pages/Admin/Dashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManagePromos from './pages/Admin/ManagePromos';
import ManageCategories from './pages/Admin/ManageCategories';
import ManageBanners from './pages/Admin/ManageBanners';
import Transactions from './pages/Admin/Transactions';
import Profile from './pages/User/Profile';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Travel/Explore';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Guest Routes */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* User Routes */}
        <Route element={
          <PrivateRoute allowedRoles={['user', 'admin']}>
            <UserLayout />
          </PrivateRoute>
        }>
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/homepage" element={<Homepage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/promos" element={<ManagePromos />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
          <Route path="/admin/banners" element={<ManageBanners />} />
          <Route path="/admin/transactions" element={<Transactions />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;