import React, { useState, useEffect } from 'react';
import success from "../../assets/images/verify/success.png";
import style from "../../components/EmailVerify/styles.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { clubBaseUrl } from '../../constants/constants';
import toast from 'react-hot-toast'

export default function ClubEmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  const Navigate = useNavigate()

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${clubBaseUrl}/club/${params.id}/verify/${params.token}`;
        const { data } = await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        toast.error(error);

      }
    };
    verifyEmailUrl();
  }, [params]);

  const Login = () => {
    Navigate('/club/login', { state: 'club' })
  }

  return (
    <>
      {validUrl ? (
        <div className={style.container}>
          <img src={success} alt="success_img" className={style.success_img} />
          <h1 style={{ padding: '20px' }}>Email verified successfully</h1>
          <button className={style.green_btn} onClick={() => Login()}>Login</button>
        </div>
      ) : (
        <h1>404 not found</h1>
      )}
    </>
  );
}
