import React, { useState, useEffect } from 'react';
import success from "../../assets/images/verify/success.png";
import style from "../../components/EmailVerify/styles.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

import { clubApi } from '../../utils/api';
import { setTempDetails } from '../../redux/updateDataSlice';
import { setClubDetails } from '../../redux/clubDataSlice';





export default function ClubEmailVerifyToEdit() {

  let updatedatas = useSelector((state) => state.temp);
  console.log(updatedatas.data.name, "ioioi")

  const dispatch = useDispatch()

  console.log("upmail kittiyo")
  console.log(updatedatas)

  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  const Navigate = useNavigate()

  const token = params.token
  console.log(token)
  const clubid = params.id
  console.log(clubid)


  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {

        const { data } = await clubApi.patch('/verifyeditclubprofile', { ...updatedatas, token: token, clubid: clubid }, { withCredentials: true });

        console.log(data, "loytrr");
        setValidUrl(true);
        toast.success(data.message);
        dispatch(setClubDetails({
          id: data.clubExist._id,
          email: data.clubExist.email,
          isUser: data.clubExist.isUser,
          name: data.clubExist.clubname,
          clubRegisterNo: data.clubExist.registration,
          location: data.clubExist.location,

        }))
        dispatch(setTempDetails({
          data: ''
        }))
      } catch (error) {
        console.log(error);
        // setValidUrl(false);
        toast.error(error.message);

      }
    };
    verifyEmailUrl();
  }, [params]);

  const Goback = () => {
    Navigate("/club/clubprofile", { state: 'club' })
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
