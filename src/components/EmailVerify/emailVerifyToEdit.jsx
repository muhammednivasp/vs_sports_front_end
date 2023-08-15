import React, { useState, useEffect } from 'react';
import success from "../../assets/images/verify/success.png";
import style from "../../components/EmailVerify/styles.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

import { userApi } from '../../utils/api';
import { setUserDetails } from '../../redux/userDataSlice'
import { setTempDetails } from '../../redux/updateDataSlice';

export default function EmailVerifyToEdit() {

  let updatedatas = useSelector((state) => state.temp);

  const dispatch = useDispatch()

  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  const Navigate = useNavigate()

  const token = params.token
  const userid = params.id

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const { data } = await userApi.patch('/edituserprofile', { ...updatedatas, token: token, userid: userid }, { withCredentials: true });
        setValidUrl(true);
        toast.success(data.message);
        dispatch(setUserDetails({
          id: data.userExist._id,
          email: data.userExist.email,
          isUser: data.userExist.isUser,
          name: data.userExist.name,
          phoneNumber: data.userExist?.phonenumber,
          isGoogle: data.userExist.isGoogle
        }))
        dispatch(setTempDetails({
          data: ''
        }))
      } catch (error) {
        toast.error(error.message);
      }
    };
    verifyEmailUrl();
  }, [params]);

  const Goback = () => {
    Navigate("/user/profile", { state: 'user' })
  }

  return (
    <>
      {validUrl ? (
        <div className={style.container}>
          <img src={success} alt="success_img" className={style.success_img} />
          <h1 style={{ padding: '20px' }}>Email verified successfully</h1>
          <button className={style.green_btn} onClick={() => Goback()}>Go back</button>
        </div>
      ) : (
        <h1>404 not found</h1>
      )}
    </>
  );
}
