import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import image from "../assets/images/logo/logo.png";
import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Footer from '../components/footer/footer';
import tickimg from '../assets/images/tick/tick.webp'
import Navbar from '../components/navbar/navbar';
import { useParams, useLocation } from 'react-router-dom';

function Failure() {
  const Navigate = useNavigate()

  const [user, setUser] = useState('')
  const [data, setData] = useState('')
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const data = queryParams.get('data');

    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        setData(parsedData._doc)
        setUser(parsedData.isUser)
  console.log(parsedData,"parsed");


      } catch (error) {
        console.error(error);
      }
    }
  }, [location.search]);

  const Goback = () => {
    return user === 'user'
      ? Navigate(`/user/show`, { state: { ...data, isUser: user } })
      : Navigate(`/club/show`, { state: { ...data, isUser: user } });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})` }}>
      <div className="flex flex-col items-center justify-center h-full">
        <Navbar data={user} />
        <h1 style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-red-500 text-3xl md:text-5xl text-center font-weight:200 pb-2 mt-4">Team Added Failure </h1>
        <>
          <h1 style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-red-500 text-3xl md:text-5xl text-center font-weight:200 pb-2 mt-4">Payment error !</h1>
        </>
        <div className="flex flex-col md:flex-row justify-center m-4">
          <button className="bg-white hover:bg-gray-50 text-black hover:text-yellow-400 text-lg md:text-xl hover:text-2xl font-semibold py-2 px-4 rounded-full mb-4 md:mr-4 md:mb-0 w-40 md:w-60 bg-opacity-70" type='submit' onClick={() => Goback()}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Failure