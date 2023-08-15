import React, { useState, useEffect } from 'react';
import success from "../../assets/images/verify/success.png";
import style from "../../components/EmailVerify/styles.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'

import { userApi } from '../../utils/api';

export default function EmailForgotVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const params = useParams();
  const Navigate = useNavigate();

  let userId = params.id
  let token = params.token
  let value = { newpassword: inputValue }

  useEffect(() => {
    setValidUrl(true);
  })

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const Login = async () => {
    if (value.newpassword.trim().length < 6) {
      toast.error("Password should be minimum six letters");

    } else {
      try {
        const { data } = await userApi.patch('forgotpassword', { ...value, userId: userId, token: token }, { withCredentials: true })

        toast.success(data.message);
        setTimeout(() => {
          Navigate('/user/login', { state: 'user' });
        }, 2000)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {validUrl ? (
        <div className={style.container}>
          <img src={success} alt="success_img" className={style.success_img} />
          <h1 style={{ padding: '20px', color: 'green' }}>Email verified successfully</h1>
          <input
            type="text"
            placeholder="Enter new password"
            value={inputValue}
            onChange={handleInputChange}
            className="p-2 w-40px m-2 text-center bg-gray-200"
          />
          <button className={style.green_btn} onClick={Login}>
            Submit
          </button>
        </div>
      ) : (
        <h1>404 not found</h1>
      )}
    </>
  );
}



