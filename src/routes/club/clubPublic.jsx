import React from 'react'
import { Navigate } from 'react-router-dom';

function ClubPublic(props) {
  if (localStorage.getItem('clubToken')) {
    console.log("the public route console");
    return <Navigate to="/club/home" state='club'/>;
  }
  <Navigate to='/' />
  console.log("return case ");
  return props.children;
}

export default ClubPublic