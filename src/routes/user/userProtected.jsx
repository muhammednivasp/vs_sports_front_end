
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { userApi } from '../../utils/api';
import { setUserDetails } from '../../redux/userDataSlice'
import { useDispatch } from 'react-redux';

function UserProtect(props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  userApi.post('/auth').then((res) => {
  }).catch((err) => {
  toast.error('Your account is blocked');
    dispatch(setUserDetails({
      id: '',
      email: '',
      isUser: '',
      name: '',
      phoneNumber: '',
      isGoogle: ''
    }))
    localStorage.removeItem('userToken')
    navigate('/')
})

  if (localStorage.getItem('userToken')) {
    return props.children;
  }
  toast.error('You have no account, Please Login');
  return <Navigate to="/" />;
}

export default UserProtect