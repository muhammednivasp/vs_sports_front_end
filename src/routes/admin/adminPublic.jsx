import React from 'react'
import { Navigate } from 'react-router-dom';

function AdminPublic(props) {
  if (localStorage.getItem('adminToken')) {
    return <Navigate to="/admin/home" state='club'/>;
  }
  <Navigate to='/admin' />
  return props.children;
}

export default AdminPublic