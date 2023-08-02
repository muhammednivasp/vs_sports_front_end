import React from 'react'
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast'


function UserProtect(props) {

  if (localStorage.getItem('userToken')) {
    return props.children;
  }
  toast.error('You have no account, Please Login');
  return <Navigate to="/" />;
}

export default UserProtect