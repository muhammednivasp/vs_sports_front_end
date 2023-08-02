import React, { useState } from 'react'
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import AnnouncedTournaments from '../components/announcedtournament/announcedTournaments';
import playerimg from '../assets/images/player/portrait.jpg'
import groupimg from '../assets/images/player/groupplayer.png'
import modalimg from '../assets/images/player/modalimg.jpg'
import mdplayer from '../assets/images/player/mdplayer.jpg'
import child from '../assets/images/player/child.jpg'
import left from '../assets/images/player/left.webp'
import center from '../assets/images/player/centerplayer.jpg'


import pngwing from '../assets/images/player/pngwing.com.png'
import toast from 'react-hot-toast'





// import { setclubDetails } from '../redux/clubDataSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { clubApi } from '../utils/api';

function ManageTournaments() {

  const clubdatas = useSelector((state) => state.club);
  console.log(clubdatas, "ioioi")

  const clubId = clubdatas.id

  const Navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datas, setDatas] = useState([]);
  const [addModal, setaddModal] = useState(false);
  const [matchModal, setMatchModal] = useState(false);
  const [tournamentModal, setTournamentModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);






  const AnnounceTournament = () => {
    Navigate("/club/announce")
  }

  const AddTournament = () => {
    Navigate("/club/addtournament")
  }

  const ManageTickets = () => {
    Navigate("/club/managetickets")
  }

  const ManageMatches = async() => {
    const { data } = await clubApi.post('/tournament', { clubId }, { withCredentials: true })
    console.log(data.details, "loytrr");
    setDatas(data.details)
    setMatchModal(true)

  }

  const Announced = async (clubId) => {
    console.log("jijij", clubId)
    try {
      const { data } = await clubApi.post('/announce', { clubId }, { withCredentials: true })
      console.log(data.details, "loytrr");
      let final = data.details.filter((item) => new Date(item.lastdate) > Date.now())
      console.log(final, "filter")
      setDatas(data.details)
      setIsModalOpen(true)
      // toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }

  const Tournament = async (clubId) => {
    console.log("jijij", clubId)
    try {
      const { data } = await clubApi.post('/tournament', { clubId }, { withCredentials: true })
      console.log(data.details, "loytrr");
      // let final = data.details.filter((item) => new Date(item.lastdate) > Date.now())
      // console.log(final, "filter")
      setDatas(data.details)
      setTournamentModal(true)
      // toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const Show = (value) => {
    console.log(value, "iddddddddddddddddddddddddddd")
    Navigate(`/club/showannounced`, { state: value })
  }

  const ShowTournament = (value) => {
    console.log(value, "iddddddddddddddddddddddddddd")
    Navigate(`/club/showtournament`, { state: value })
  }

  const [value, setValue] = useState({
    tournamentname: '',
    location: '',
    tournamenttype: ''

  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  console.log(value, "goal");


  const saveChanges = async (clubId) => {
    // e.preventDefault();
    const { tournamentname, location, tournamenttype } = value;
    console.log(value, "valuessss")


    if (tournamentname.trim() === '' || location.trim() === '' || tournamenttype.trim() === '') {
      return toast.error('All fields are required');
    }

    try {
      const { data } = await clubApi.post('/addtournament', { ...value, club: clubId }, { withCredentials: true });

      if (data) {
        console.log(data, "hiiihiihiihiihiihaaaa")
        if (data.errors) {
          console.log(data.errors)
          toast.error(data.message);
        } else {
          toast.success(data.message);

          console.log(data, "hiiiiiiii")
          setaddModal(false)
          setTimeout(() => {
            Navigate("/club/manage");
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error, "hiiiiiiii")
      toast.error(error.response.data.message);
    }

    // const currentDate = new Date().toISOString().split('T')[0];
  };

  const selectTournament = (item)=>{
    Navigate("/club/matchmanage",{state:item})
 }

 const Matches = (clubid)=>{
  setStatusModal(true)
  // Navigate("/club/matches",{state:clubid})
 }

 const statussubmit = (status,clubid)=>{
  Navigate("/club/matches",{state:{clubid:clubid,status:status}})

 }

  return (

    <div className="min-h-screen relative">
      <div className=" inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})`, filter: isModalOpen || addModal || tournamentModal ? "blur(30px)" : "none" }}>
        <Navbar data={'club'} />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <h2 className="text-2xl font-extrabold text-black text-center my-7 ">MANAGE TOURNAMENTS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <article className="relative h-80 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out" style={{ backgroundImage: `url(${playerimg})` }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold text-center">
                  <button className="absolute inset-0 text-center hover:text-yellow-300" onClick={() => Announced(clubId)}>
                    Announced Tournaments
                  </button>
                </h3>
              </div>
            </article>
            <article className="relative h-80 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out" style={{ backgroundImage: `url(${center})` }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center ">
                <h3 className="text-white text-2xl font-bold text-center ">
                  <button className="absolute inset-0 text-center  hover:text-yellow-300" onClick={() => Tournament(clubId)}>
                    Tournaments
                  </button>
                </h3>
              </div>
            </article>
            <article className="relative h-80 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out " style={{ backgroundImage: `url(${left})` }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold text-center">
                  <button className="absolute inset-0 text-center  hover:text-yellow-300"  onClick={() => Matches(clubId)}>
                    Matches
                  </button>
                </h3>
              </div>
            </article>
          </div>
        </section>

        <div className="flex justify-center items-center mt-10">
          <div className="w-full md:w-8/12 bg-gray-200 p-2 rounded-lg  text-center ">
            <button className="text-2xl text-blue-700 font-bold p-2  hover:text-green-600" onClick={() => { AnnounceTournament() }}>Announce a Tournament</button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-6">
          <div className="w-full md:w-8/12 bg-gray-200 p-2 rounded-lg  text-center ">
            <button className="text-2xl text-blue-700 font-bold p-2  hover:text-green-600 " onClick={() => setaddModal(true)}>Add New Tournament</button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-6">
          <div className="w-full md:w-8/12 bg-gray-200 p-2 rounded-lg  text-center ">
            <button className="text-2xl text-blue-700 font-bold p-2  hover:text-green-600 " onClick={() => { ManageMatches() }}>Add Matches</button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-6 pb-16">
          <div className="w-full md:w-8/12 bg-gray-200 p-2 rounded-lg  text-center ">
            <button className="text-2xl text-blue-700 font-bold p-2  hover:text-green-600 " onClick={() => { ManageTickets() }}>Manage Tickets</button>
          </div>
        </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" >
          <div className="max-w-xl mx-auto bg-black rounded-lg px-20 py-12 bg-center  bg-no-repeat relative bg-cover" style={{ backgroundImage: `url(${mdplayer})` }}>
            {/* <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button> */}

            {datas.length > 0 ? (
              <>

                {datas.map((item) => (
                  <div className="flex flex-col p-6 w-96 bg-white shadow-md hover:shadow-lg rounded-2xl mb-4 bg-opacity-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {new Date(item.lastdate) > Date.now() ? (
                          <svg className="w-14 h-11 rounded-full p-2 border border-green-200 text-blue-400 bg-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> */}
                          </svg>
                        ) : (
                          <svg className="w-14 h-11 rounded-full p-2 border border-red-200 text-blue-400 bg-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> */}
                          </svg>
                        )}
                        <div className="flex flex-col ml-3 w-full">
                          <div className="font-medium leading-none text-xl text-white overflow-hidden" style={{ maxWidth: '9rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.tournamentname}</div>
                          <p className="text-sm text-white leading-none mt-1">Category: {item.category}</p>
                        </div>
                      </div>
                      <button className="flex-no-shrink bg-blue-700 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-x-yellow-600 text-white rounded-full hover:bg-yellow-600" onClick={() => { Show(item) }}>Show</button>
                    </div>
                  </div>
                ))}
                <button className="w-full bg-white text-black rounded-lg py-2 mt-4 hover:bg-yellow-500 border-2 border-x-yellow-600 font-medium" onClick={() => setIsModalOpen(false)}>Close</button>

              </>
            ) : (
              <alert>
                <p className=" w-96 h-96 text-orange-500 text-4xl text-center ">No announced tournaments</p>
                <button className="w-full bg-white text-black rounded-lg py-2 mt-4 hover:bg-yellow-500 border-2 border-x-yellow-600 font-medium" onClick={() => setIsModalOpen(false)}>Close</button>
              </alert>
            )}
          </div>
        </div>
      )}



      {addModal && (
        <div className="inset-0 fixed flex justify-center items-center">
          <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
            <div className="mb-2">
              <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                <button
                  className="text-red-500 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider"
                  onClick={() => setaddModal(false)}
                >
                  Close
                </button>
                <h1 className="text-center font-bold text-xl text-yellow-300">
                  Add Tournament
                </h1>

                <h1 className="text-lg font-semibold">Tournament</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 flex items-center text-xl justify-center w-full px-2"
                  type='text' name='tournamentname' placeholder="Tournament Name" onChange={handleChange}
                />
                <h1 className="text-lg font-semibold">Location</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='text' name='location' placeholder='Location' onChange={handleChange}
                />

                <h1 className="text-lg font-semibold">Tournament Type</h1>

                <select className="bg-green-600 h-12 mb-4  bg-opacity-60 items-center flex text-xl justify-center w-full px-2" id="tournamenttype" name="tournamenttype" onChange={handleChange}>

                  <option value=''  >Category</option>
                  <option className='text-black font-medium' value="League">League</option>
                  <option className='text-black font-medium' value="Nockout">Nockout</option>
                  <option className='text-black font-medium' value="Combo">Combo</option>
                  {/* Add more options for different categories */}
                </select>

                <div className="flex justify-center">
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => saveChanges(clubId)}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}




      {tournamentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" >
          <div className="max-w-xl mx-auto bg-black rounded-lg px-20 py-12 bg-center  bg-no-repeat relative bg-cover" style={{ backgroundImage: `url(${mdplayer})` }}>

            {datas.length > 0 ? (
              <>

                {datas.map((item) => (
                  <div className="flex flex-col p-6 w-96 bg-white shadow-md hover:shadow-lg rounded-2xl mb-4 bg-opacity-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {item.status === true ? (
                          <svg className="w-14 h-11 rounded-full p-2 border border-green-200 text-blue-400 bg-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> */}
                          </svg>
                        ) : (
                          <svg className="w-14 h-11 rounded-full p-2 border border-red-200 text-blue-400 bg-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> */}
                          </svg>
                        )}
                        <div className="flex flex-col ml-3 w-full">
                          <div className="font-medium leading-none text-xl text-white overflow-hidden" style={{ maxWidth: '9rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.tournamentname}</div>
                          <p className="text-sm text-white leading-none mt-1">Category: {item.tournamenttype}</p>
                        </div>
                      </div>
                      <button className="flex-no-shrink bg-blue-700 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-x-yellow-600 text-white rounded-full hover:bg-yellow-600" onClick={() => { ShowTournament(item) }}>Show</button>
                    </div>
                  </div>
                ))}
                <button className="w-full bg-white text-black rounded-lg py-2 mt-4 hover:bg-yellow-500 border-2 border-x-yellow-600 font-medium" onClick={() => setTournamentModal(false)}>Close</button>

              </>
            ) : (
              <alert>
                <p className=" w-96 h-96 text-orange-500 text-4xl text-center ">No tournaments</p>
                <button className="w-full bg-white text-black rounded-lg py-2 mt-4 hover:bg-yellow-500 border-2 border-x-yellow-600 font-medium" onClick={() => setTournamentModal(false)}>Close</button>
              </alert>
            )}
          </div>
        </div>
      )}

      {matchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" >
          <div className="max-w-xl mx-auto bg-black rounded-lg px-20 py-12 bg-center  bg-no-repeat relative bg-cover" style={{ backgroundImage: `url(${mdplayer})` }}>

            {datas.length > 0 ? (
              <>

                {datas.map((item) => (
                  <div className="flex flex-col p-6 w-96 bg-white shadow-md hover:shadow-lg rounded-2xl mb-4 bg-opacity-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {item.status === true ? (
                          <svg className="w-14 h-11 rounded-full p-2 border border-green-200 text-blue-400 bg-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> */}
                          </svg>
                        ) : (
                          <svg className="w-14 h-11 rounded-full p-2 border border-red-200 text-blue-400 bg-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> */}
                          </svg>
                        )}
                        <div className="flex flex-col ml-3 w-full">
                          <div className="font-medium leading-none text-xl text-white overflow-hidden" style={{ maxWidth: '9rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.tournamentname}</div>
                          <p className="text-sm text-white leading-none mt-1">Category: {item.tournamenttype}</p>
                        </div>
                      </div>
                      <button className="flex-no-shrink bg-blue-700 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-x-yellow-600 text-white rounded-full hover:bg-yellow-600" onClick={() => { selectTournament(item) }}>Choose</button>
                    </div>
                  </div>
                ))}
                <button className="w-full bg-white text-black rounded-lg py-2 mt-4 hover:bg-yellow-500 border-2 border-x-yellow-600 font-medium" onClick={() => setMatchModal(false)}>Close</button>

              </>
            ) : (
              <alert>
                <p className=" w-96 h-96 text-orange-500 text-4xl text-center ">No tournaments</p>
                <button className="w-full bg-white text-black rounded-lg py-2 mt-4 hover:bg-yellow-500 border-2 border-x-yellow-600 font-medium" onClick={() => setMatchModal(false)}>Close</button>
              </alert>
            )}
          </div>
        </div>
      )}

{statusModal &&
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-50">
          {/* <div className="bg-white rounded-lg z-10 flex flex-col p-2"> */}
            
            <div className="bg-red-200 p-12 rounded-lg justify-center">
              <h3 className='text-center text-green-700'>Select</h3>
        
              <div className='mt-2'>
                <button
                  className="px-4 py-2 bg-none border-2 hover:bg-blue-300 text-black font-semibold rounded-lg w-full md:w-80 lg:w-96 xl:w-112"
                onClick={()=>statussubmit(false,clubId)}>
                  History
                </button>
              </div>
              <div className='mt-2'>
                <button
                  className="px-4 py-2 bg-none border-2 hover:bg-blue-300 text-black font-semibold rounded-lg w-full md:w-80 lg:w-96 xl:w-112"
                onClick={()=>statussubmit(true,clubId)}>
                  On Going
                </button>
              </div>

            </div>
           
            <div className='mt-2'>
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg w-full md:w-80 lg:w-96 xl:w-112"
              onClick={()=>setStatusModal(false)}>
                Close
              </button>
              
            </div>
          {/* </div> */}
        </div>}


    </div>

  )
}

export default ManageTournaments