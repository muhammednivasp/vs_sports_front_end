import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import tickimg from '../assets/images/tick/tick.webp'
import Navbar from '../components/navbar/navbar';
import { useParams, useLocation } from 'react-router-dom';

function TicketSuccessPage() {

  const Navigate = useNavigate()
  const [user, setUser] = useState('')
  const [fees, setFees] = useState('')
  const [data, setData] = useState('')

  const location = useLocation();
  const state = location.state
  useEffect(() => {
    const data = state
    if (data) {
      try {

        setData(data._doc)
        setUser(data.isUser)
        setFees(data._doc.fee)

      } catch (error) {
        console.error(error);
      }
    }
  }, [location.search]);

  const GetTickets = () => {
    return user === 'user'
      ? Navigate(`/user/ticketshow`, { state: { isUser: user } })
      : Navigate(`/club/ticketshow`, { state: { isUser: user } });
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})` }}>
      <div className="flex flex-col items-center justify-center h-full">
        <Navbar data={user} />
        <img src={tickimg} alt="Logo" className="h-20 w-20 md:h-32 md:w-32" />
        {fees <= 0 ?
          <h1 style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-blue-500 text-3xl md:text-4xl text-center font-weight:200 pb-2 mt-4"> Successsfull </h1>
          :
          <>
            <h1 style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-blue-500 text-3xl md:text-5xl text-center font-weight:200 pb-2 mt-4">Payment  Successsfull </h1>
            <h1 style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-yellow-600 text-xl md:text-3xl text-center font-weight:200 pb-2 ">(<span className='text-gray-900'>Tickets get Successsfully</span>) </h1>
          </>
        }
        <div className="flex flex-col md:flex-row justify-center m-4">
          <button className="bg-white hover:bg-gray-50 text-black hover:text-yellow-400 text-lg md:text-xl hover:text-2xl font-semibold py-2 px-4 rounded-full mb-4 md:mr-4 md:mb-0 w-40 md:w-60 bg-opacity-70" type='submit' onClick={() => GetTickets()}>
            Get Tickets
          </button>
        </div>

      </div>
    </div>
  )
};

export default TicketSuccessPage;
