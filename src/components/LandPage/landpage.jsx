
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import image from "../../assets/images/logo/logo.png";
import bgimage from "../../assets/images/bg/backgroundvssports.jpg";
import Footer from '../footer/footer';

function Landpage() {
  const [userData, setUserData] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === "user") {
      navigate("/user/login", { state: userData });
    } else if (userData === "club") {
      navigate("/club/login", { state: userData });
    }

  }, [userData, navigate]);

  const handleButtonClick = (value) => {
    setUserData(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})` }}>
      <div className="flex flex-col items-center justify-center h-full">
        <img src={image} alt="Logo" className="h-20 w-20 md:h-40 md:w-40" />
        <h1 style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-white text-3xl md:text-5xl text-center font-weight:200 pb-2">Welcome to <span style={{ color: "black" }}>V</span><span style={{ color: "red" }}>s</span> <span style={{ color: "white" }}>S</span><span style={{ color: "green" }}>p</span><span style={{ color: "yellow" }}>o</span><span style={{ color: "teal" }}>r</span><span style={{ color: "gold" }}>t</span><span style={{ color: "purple" }}>s</span></h1>
        <h2 className="text-black text-xl md:text-2xl text-center mb-8 p-4">Verify that you are a <span style={{ color: "green" }}>CLUB</span> or <span style={{ color: "green" }}>NOT</span> ?</h2>

        <div className="flex flex-col md:flex-row justify-center">
          <button className="bg-white hover:bg-gray-50 text-black text-lg md:text-xl hover:text-2xl font-semibold py-2 px-4 rounded-full mb-4 md:mr-4 md:mb-0 w-40 md:w-60 bg-opacity-70" type='submit' onClick={() => handleButtonClick("user")}>
            I am a Person
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center p-2 ">
          <button className="bg-white hover:bg-gray-50 text-black text-lg md:text-xl hover:text-2xl font-semibold py-2 px-4 rounded-full mb-4 md:mr-4 md:mb-0 w-40 md:w-60 bg-opacity-70" type='submit' onClick={() => handleButtonClick("club")}>
            We are a CLUB
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landpage;
