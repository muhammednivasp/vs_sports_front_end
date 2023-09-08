import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Navbar from '../components/navbar/navbar';
import yellowimg from '../assets/images/player/yellowplayer.png'
import { clubApi, userApi } from '../utils/api';
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'


function MatchesView() {
  const location = useLocation()
  const Navigate = useNavigate()
  const { data, isUser } = location.state

  const clubdatas = useSelector((state) => state[isUser === 'user' ? 'user' : 'club']);
  const [tournament, setTournament] = useState(data)
  const [details, setDetails] = useState([])
  const id = tournament._id

  useEffect(() => {
    const find = async () => {
      try {
        const requestData = { id: tournament._id };
        const { data } = await (isUser === 'club' ? clubApi : userApi).post(
          '/tournamentmatches',
          requestData,
          { withCredentials: true }
        );
        setDetails(data.details)
      } catch (error) {
        console.error("Error occurred while fetching tournament matches:", error);
      }
    };

    find();
  }, [tournament._id, isUser]);

  const [modal, setModal] = useState(false)
  const [datas, setDatas] = useState('')
  const [item, setItem] = useState('')

  const matchsetup = (item) => {
    const dateString = '2023-07-25T06:15:25.900Z';
    const dateObj = new Date(dateString);

    const datePart = dateObj.toISOString().slice(0, 10); // Get the date part (YYYY-MM-DD)
    const timePart = dateObj.toISOString().slice(11, 19); // Get the time part (HH:mm:ss)
    setItem(item)
    setDatas({ ...item, date: datePart, time: timePart })

    console.log('Date Part:', datePart);
    console.log('Time Part:', timePart);

    setModal(true)
  }

  const [ticketModal, setTicketModal] = useState(false)
  const [match, setMatch] = useState('')

  const tickets = (item) => {
    setMatch(item)
    setTicketModal(true)
  }

  const [values, setValues] = useState(1)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(value)
  };
  // const handlePayment = async () => {
  //   try {
  //     const response = await (isUser === 'user' ? userApi : clubApi).post('/ticketpayment', { count: values, isUser: isUser, clubdatas: clubdatas, match: match })
  //     if (response.status === 202) {
  //       const datas = response?.data?.order;
  //     }
  //     if (response.data.url) {
  //       window.location.href = response.data.url;
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // }

  const handlePayment = async () => {
    // const { clubname, location, phonenumber, registration, isUser } = values
    // if (clubname.trim() === '' || location.trim() === '' || registration.trim() === '') {
    //   return toast.error('All fields are required');
    // }
    // if (phonenumber.trim().length !== 10) {
    //   return toast.error('Phone number should be need ten digits');
    // }
    // try {
    //   if (data.fee === 0) {
        try {
    //  const response = await (isUser === 'user' ? userApi : clubApi).post('/ticketpayment', { count: values, isUser: isUser, clubdatas: clubdatas, match: match })

          // const response = await (isUser === 'user' ? userApi : clubApi).post('/paymentsuccess', { ...datas });
          // console.log(response,"llooo");
          // console.log(datas.isUser, "lkl");
          // datas.isUser === 'user'
            // ? Navigate(`/user/successpage`, { state: response.data.datas })
            // : Navigate(`/club/successpage`, { state: response.data.datas });
      //   } catch (apiError) {
      //     setMessage("An error occurred while processing your payment.");
      //   }
      // } else {
        isUser === 'user'
          ? Navigate(`/user/ticketpayment`, { state: { count: values, isUser: isUser, clubdatas: clubdatas, match: match } })
          : Navigate(`/club/ticketpayment`, { state: { count: values, isUser: isUser, clubdatas: clubdatas, match: match } });
      // }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})`, filter: modal || ticketModal ? "blur(30px)" : "none" }}>
        <div className="flex flex-col items-center justify-center h-full w-screen">
          <Navbar data={isUser} />

          {details.length === 0 ? (

            <div className=' flex justify-center items-center'>
              <h1 className='text-red-600 text-2xl'>No Matches Found</h1>
            </div>

          )
            :
            (
              <>
                <div className="md:w-[40rem] w-[25rem] lg:w-[80rem] h-[40rem]  bg-white shadow-md rounded p-2 md:mt-12 overflow-y-auto mt-16">
                  <div class="bg-white ">
                    <div className=' flex justify-center '>

                      <div className='h-12 bg-white  text-center  md:fixed z-10 '>
                        <span className='text-black text-xl font-medium fixed'>Matches</span>
                      </div>
                    </div>
                    <div class="container mx-auto justify-center ">
                      <div class="mx-auto ">
                        <div class="bg-white ">
                          <div class="container mx-auto py-6">
                            <div class="mx-auto sm:w-6/12 lg:w-8/12 xl:w-[100%] ">
                              {details.map((item) => (
                                <div class="mt-2 " key={item._id} >
                                  <div class="relative flex flex-col justify-end overflow-hidden rounded-b-xl pt-6 ">
                                    <div class="group relative flex cursor-pointer justify-between rounded-xl bg-amber-200 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-amber-600 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100">
                                      <div class="relative  space-y-1 p-6">
                                        <h4 class="text-lg text-amber-900">Match No :- {item.matchnumber}</h4>
                                        <div class="relative h-20 text-amber-800 text-sm">
                                          <div className='flex'>
                                            <span class="transition duration-300 group-hover:invisible group-hover:opacity-0">{item.firstteam.teamname}</span>
                                            <span className='mx-2'>Vs</span>
                                            <span class="transition duration-300 group-hover:invisible group-hover:opacity-0">{item.secondteam.teamname}</span>
                                          </div>
                                          <button href="" class="mt-10 mx-2 flex items-center gap-3 invisible absolute left-0 top-0 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0" onClick={() => { matchsetup(item) }}>
                                            <span>View now </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -translate-x-4 transition duration-300 group-hover:translate-x-0" viewBox="0 0 20 20" fill="currentColor">
                                              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                      <img class="absolute bottom-2 right-6 w-[6rem] transition duration-300 group-hover:scale-[1.4]" src={yellowimg} alt="" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50" style={{ filter: ticketModal ? "blur(30px)" : "none" }}>
          <div className="bg-white p-6 rounded-lg z-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Match No :- {datas.matchnumber}</h2>
            <div class="group relative flex cursor-pointer justify-center rounded-xl bg-amber-200 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-amber-600 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 w-[40rem] h-[40rem]">
              <div class="relative  space-y-1 p-4">
                <div className='flex justify-center m-2'>
                  <span class="transition duration-300 text-center text-4xl font-semibold">{datas.firstteam.teamname}</span>
                  <span className='mx-6 text-2xl'>Vs</span>
                  <span class="transition duration-300 text-center text-4xl font-semibold">{datas.secondteam.teamname}</span>
                </div>
                <div className='flex justify-center m-2'>
                  <span class="transition duration-300 text-center text-xl font-semibold">(first team)</span>
                  <span className='mx-6 text-xl'></span>
                  <span class="transition duration-300 text-center text-xl font-semibold">(second team)</span>
                </div>
                <div className='pt-6'>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Date :- <span className='text-black text-xl'> {datas.date}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Time :- <span className='text-black text-xl'> {datas.time}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Tickets :- <span className='text-black text-xl'> {datas.tickets}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Tickets Fee :- <span className='text-black text-xl'> {datas.ticketsfee}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">status :- <span className='text-black text-xl'> {(datas.matchstatus === true ? 'On Going' : 'Over')}</span></h4>


                  <div className='flex justify-center m-2'>
                    <span class="transition duration-300 text-center text-xl font-semibold">contact:{datas.firstteam.phonenumber}</span>
                    <span className='mx-6 text-xl'></span>
                    <span class="transition duration-300 text-center text-xl font-semibold">contact:{datas.secondteam.phonenumber}</span>
                  </div>
                  <div className='flex justify-center m-2'>
                    <span class="transition duration-300 text-center text-xl font-semibold">Score: {datas.results.firstteamscore}</span>
                    <span className='mx-6 text-xl'></span>
                    <span class="transition duration-300 text-center text-xl font-semibold">Score: {datas.results.secondteamscore}</span>
                  </div>

                  <div className='flex justify-center m-2'>
                    <span class="transition duration-300 text-center text-xl font-semibold">Scorers:[<span className='text-gray-400'> {(datas.results?.firstteamscorers).map((item, index) => (<div key={index}> {item}</div>))}  </span>]</span>
                    <span className='mx-6 text-xl'></span>
                    <span class="transition duration-300 text-center text-xl font-semibold">Scorers:[<span className='text-gray-400'> {(datas.results?.secondteamscorers).map((item, index) => (<div key={index}> {item}</div>))}  </span>]</span>
                  </div>

                </div>


              </div>
              <img class="absolute bottom-2 right-6 w-[6rem] transition duration-300 group-hover:scale-[1.4]" src={yellowimg} alt="" />
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setModal(false)}
            >
              Close
            </button>
            {((datas.matchstatus === true )&& (datas.tickets !== 0) )?(
              <button
                className="mt-4 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => tickets(item)}
              >
                Tickets
              </button>
             ) : ''
            }
          </div>
        </div>
      )}
      {ticketModal && (
        <div className="inset-0 fixed flex justify-center items-center z-40">
          <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
            <div className="mb-2">
              <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                <button
                  className="text-red-500 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider"
                  onClick={() => setTicketModal(false)}
                >
                  Close
                </button>
                <h1 className="text-center font-bold text-2xl text-yellow-300">
                  Book Tickets
                </h1>

                <h1 className="text-lg font-semibold text-center m-2 mt-4">Match Number: {match.matchnumber}</h1>

                <div className='flex justify-center m-2'>
                  <span class="transition duration-300 text-center text-3xl font-semibold">{match.firstteam.teamname}</span>
                  <span className='mx-6 text-2xl'>Vs</span>
                  <span class="transition duration-300 text-center text-3xl font-semibold">{match.secondteam.teamname}</span>
                </div>


                <h1 className="text-lg font-semibold text-center m-3 text-yellow-200">Count</h1>

                <input
                  className="bg-white h-12 mb-4 rounded-lg items-center flex text-xl justify-center w-full px-2 text-center text-black"
                  type='number' min={1} name='count' placeholder={values}
                  onChange={handleChange} />

                <h1 className="text-lg font-semibold text-center text-blue-400 m-2"><span className='text-white'>Tickets Available : </span>{match.tickets}</h1>
                <h1 className="text-lg font-semibold text-center text-blue-400 m-2"><span className='text-white'>Tickets Fee : </span>{match.ticketsfee}</h1>


                <div className="flex justify-center">
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-40 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => handlePayment()}>
                    Pay Fee Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MatchesView