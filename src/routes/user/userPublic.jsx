import React from 'react'
import { Navigate } from 'react-router-dom';

function UserPublic(props) {
  if (localStorage.getItem('userToken')) {
    return <Navigate to="/user/home" state='user' />;
  }
  <Navigate to='/' />
  return props.children;
}

export default UserPublic