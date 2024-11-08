import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import NotFound from './pages/NotFound';
import AdminPage from './pages/AdminPage';
import GuestLayout from './layouts/GuestLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import Explore from './pages/Travel/Explore';
import Detail from './pages/Travel/Detail';
import Dashboard from './pages/Admin/Dashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageCategories from './pages/Admin/ManageCategories';
import ManagePromos from './pages/Admin/ManagePromos';
import ManageBanners from './pages/Admin/ManageBanners';
import Transactions from './pages/Admin/Transactions';
import Profile from './pages/User/Profile';

const PrivateRoute = ({ children, role, allowedRoles }) => {
  return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

const AppRouter = ({ userRole }) => {
  return (
    <Routes>
      <Route path="/" element={
        <GuestLayout>
          <Home />
        </GuestLayout>
      } />
      <Route path="/login" element={<GuestLayout><Login /></GuestLayout>} />
      <Route path="/register" element={<GuestLayout><Register /></GuestLayout>} />
      <Route
        path="/profile"
        element={
          <PrivateRoute role={userRole} allowedRoles={['user', 'admin']}>
            <UserLayout>
              <Profile />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute role={userRole} allowedRoles={['admin']}>
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="manage-categories" element={<ManageCategories />} />
                <Route path="manage-promos" element={<ManagePromos />} />
                <Route path="manage-banners" element={<ManageBanners />} />
                <Route path="transactions" element={<Transactions />} />
              </Routes>
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route path="/explore" element={<GuestLayout><Explore /></GuestLayout>} />
      <Route path="/detail/:id" element={<GuestLayout><Detail /></GuestLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;