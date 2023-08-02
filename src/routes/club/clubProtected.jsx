// import React from 'react'
// import { Navigate } from 'react-router-dom';
// import toast from 'react-hot-toast'


function ClubProtect(props) {

  if (localStorage.getItem('clubToken')) {
    return props.children;
  }
  toast.error('You have no account, Please Login');
  return <Navigate to="/" />;
}

export default ClubProtect


// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import 'buffer/'
// import 'util/'
// import jwtDecode from 'jsonwebtoken';
// import toast from 'react-hot-toast';
// import { useDispatch } from 'react-redux';
// import { setClubDetails } from '../../redux/clubDataSlice';

// function ClubProtect(props) {
//   const dispatch = useDispatch();
//   const clubToken = localStorage.getItem('clubToken');
// console.log(clubToken,"tttk")
//   if (clubToken) {
//     try {
//       // Decode the token to get its payload
//       const tokenPayload = jwtDecode(clubToken);

//       // Get the expiration date from the token payload
//       const expirationDate = new Date(tokenPayload.exp * 1000);

//       // Check if the token is expired (expiration date is in the past)
//       if (expirationDate < new Date()) {
//         toast.error('Your session has expired. Please login again.');
//         // If the token is expired, remove it from localStorage and reset club details in Redux
//         dispatch(
//           setClubDetails({
//             id: '',
//             email: '',
//             isUser: '',
//             name: '',
//             location: '',
//             clubRegisterNo: '',
//           })
//         );
//         localStorage.removeItem('clubToken');
//         return <Navigate to="/" />;
//       }

//       // If the token is still valid, render the protected content
//       return props.children;
//     } catch (error) {
//       // If there is an error decoding the token, handle it here (e.g., invalid token format)
//       toast.error('Error decoding token. Please login again.');
//       localStorage.removeItem('clubToken');
//       return <Navigate to="/" />;
//     }
//   }

//   toast.error('You have no account. Please login.');
//   // If there is no clubToken, reset club details in Redux and redirect to the login page
//   dispatch(
//     setClubDetails({
//       id: '',
//       email: '',
//       isUser: '',
//       name: '',
//       location: '',
//       clubRegisterNo: '',
//     })
//   );
//   return <Navigate to="/" />;
// }

// export default ClubProtect;
