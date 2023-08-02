import React, { useState, useEffect } from 'react';
import success from "../../assets/images/verify/success.png";
import style from "../../components/EmailVerify/styles.module.css";
import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { userBaseUrl } from '../../constants/constants';
import toast from 'react-hot-toast'

import { clubApi } from '../../utils/api';


export default function EmailForgotVerify() {
  console.log("hoihoi")
  const [validUrl, setValidUrl] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const params = useParams();
  const Navigate = useNavigate();

  let clubId = params.id
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
        const { data } = await clubApi.patch('/forgotpassword', { ...value, clubId: clubId, token: token }, { withCredentials: true })

        console.log(data, "loytrr");
        toast.success(data.message);
        setTimeout(() => {
          Navigate('/club/login', { state: 'club' });
        }, 2000)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }

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



