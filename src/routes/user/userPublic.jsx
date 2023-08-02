import React from 'react'
import { Navigate } from 'react-router-dom';

function UserPublic(props) {
  if (localStorage.getItem('userToken')) {
    console.log("the public route console");
    return <Navigate to="/user/home" state='user' />;
  }
  <Navigate to='/' />
  console.log("return case ");
  return props.children;
}

export default UserPublic