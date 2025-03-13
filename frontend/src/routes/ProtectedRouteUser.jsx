import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteUser = () => {
  const token = localStorage.getItem('token');

  return token ? <Outlet /> : <Navigate to="/user-login" />;
};

export default ProtectedRouteUser;
