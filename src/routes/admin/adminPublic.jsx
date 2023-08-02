import React from 'react'
import { Navigate } from 'react-router-dom';

function AdminPublic(props) {
  if (localStorage.getItem('adminToken')) {
    console.log("the public route console");
    return <Navigate to="/admin/home" state='club'/>;
  }
  <Navigate to='/admin' />
  console.log("return case ");
  return props.children;
}

export default AdminPublic