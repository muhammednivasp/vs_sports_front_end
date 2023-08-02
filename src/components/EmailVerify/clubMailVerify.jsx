import React, { useState, useEffect } from 'react';
import success from "../../assets/images/verify/success.png";
import style from "../../components/EmailVerify/styles.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { clubBaseUrl } from '../../constants/constants';

export default function ClubEmailVerify() {
  console.log("mail kittiyo")
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  const Navigate = useNavigate()

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${clubBaseUrl}/club/${params.id}/verify/${params.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        // setValidUrl(false);
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
