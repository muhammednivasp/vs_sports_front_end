import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { clubApi } from '../../utils/api';
import { setClubDetails } from '../../redux/clubDataSlice'
import { useDispatch } from 'react-redux';

function ClubProtect(props) {
  const navigate = useNavigate()
const dispatch = useDispatch()
 clubApi.post('/auth').then((res)=>{
 }).catch((err)=>{
  toast.error('Your account is blocked');
  dispatch(setClubDetails({
    id: '',
    email: '',
    isUser:'',
    name:'',
    clubRegisterNo: '',
    location: '',
  }))
  localStorage.removeItem('clubToken')
  navigate('/')
})

  if (localStorage.getItem('clubToken')) {
    return props.children;
  }
  toast.error('You have no account, Please Login');
  return <Navigate to="/" />;
}

export default ClubProtect
