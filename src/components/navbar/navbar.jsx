import React, { useState } from 'react';
import image from "../../assets/images/logo/logo.png";
import profilelogo from "../../assets/images/profilelogo/pngegg.png"

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../redux/userDataSlice'
import { setClubDetails } from '../../redux/clubDataSlice'

import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ data }) {

  const userdatas = useSelector((state) => (data === 'club' ? state.club : state.user));
  console.log(userdatas, "koi")
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const logout = (user) => {
    console.log(user, "koiiu")
    user === 'user' ?
      dispatch(
        setUserDetails({
          id: '',
          email: '',
          isUser: '',
          name: '',
          phoneNumber: '',
          isGoogle: ''
        })
      ) : dispatch(
        setClubDetails({
          id: '',
          email: '',
          isUser: '',
          name: '',
          location: '',
          clubRegisterNo: '',
        })
      )
    user === 'user' ? localStorage.removeItem('userToken') : localStorage.removeItem('clubToken')
    navigate('/');
  };

  const home = (user) => {
    console.log(user, "hihohiohihoih")
    if (user === 'club') {
      navigate("/club/home", { state: userdatas.isUser })
    } else {
      navigate("/user/home", { state: userdatas.isUser })
    }
  }

  const profile = (user) => {
    if (user === 'club') {
      navigate("/club/clubprofile", { state: userdatas.isUser })
    } else {
      navigate("/user/profile", { state: userdatas.isUser })
    }
  }

  return (


    <nav className="bg-green-900 bg-opacity-100 p-4 flex flex-wrap items-center justify-between fixed w-full top-0 z-30">

      <div className="flex items-center">
        <button onClick={() => home(userdatas.isUser)}>
          <img src={image} alt="Logo" className="h-10 " />
        </button>
      </div>
      <span className="text-white text-center font-bold text:xl md:text-2xl flex-grow">
        <span style={{ color: "blue" }}>V</span>
        <span style={{ color: "red" }}>s</span>{" "}
        <span style={{ color: "white" }}>S</span>
        <span style={{ color: "white" }}>p</span>
        <span style={{ color: "white" }}>o</span>
        <span style={{ color: "white" }}>r</span>
        <span style={{ color: "white" }}>t</span>
        <span style={{ color: "white" }}>s</span>
      </span>


      <div className="flex items-center mt-0 md:mt-0">
        <button onClick={() => profile(userdatas.isUser)}>
          <img src={profilelogo} alt="Profile Icon" className="h-6 mr-5 bg-white" />
        </button>
        <button className="text-white font-medium hover:text-gray-300 mr-5" onClick={() => logout(userdatas.isUser)}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
