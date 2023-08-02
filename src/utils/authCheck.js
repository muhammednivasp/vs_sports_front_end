// Import the necessary hooks and actions
// import { useDispatch } from 'react-redux';
// import { setUserDetails, setClubDetails } from '../redux/userDataSlice'; // Replace 'userDataSlice' with your user data slice name
// import { useNavigate } from 'react-router-dom';

// export const AuthCheck = (isUser) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const removeAuthToken = () => {
//     isUser === 'user'
//       ? dispatch(
//           setUserDetails({
//             id: '',
//             email: '',
//             isUser: '',
//             name: '',
//             phoneNumber: '',
//             isGoogle: '',
//           })
//         )
//       : dispatch(
//           setClubDetails({
//             id: '',
//             email: '',
//             isUser: '',
//             name: '',
//             location: '',
//             clubRegisterNo: '',
//           })
//         );

//     isUser === 'user'
//       ? localStorage.removeItem('userToken')
//       : localStorage.removeItem('clubToken');

//     navigate('/');
//   };

//   return removeAuthToken;
// };
