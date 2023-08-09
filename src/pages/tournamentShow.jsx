import React, { useEffect, useState } from 'react'
import playerimg from '../assets/images/player/portrait.jpg'
import child from '../assets/images/player/child.jpg'
import bgimage from '../assets/images/bg/backgroundvssports.jpg'
import toast from 'react-hot-toast'
import { clubApi } from '../utils/api';

import Navbar from '../components/navbar/navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';


function TournamentShow() {

  const clubdatas = useSelector((state) => state.club);
  console.log(clubdatas, "ioioi")

  let mailId = clubdatas.email

  const Navigate = useNavigate()
  const location = useLocation()

  const [count,setCount] = useState(0)

  const data = location.state
  console.log(data, "iudev")
  let id 
  let announce = data?.announced
  announce ===false?
   id = data._id
   :
   id = data?.announcedid
  console.log(id, "klmnbviudev")

  useEffect(()=>{
    const clubadd = async()=>{
      const { data } = await clubApi.post('/count',{id:id,announce:announce}, { withCredentials: true });
      console.log(data,"klklklopopop");
      setCount(data.teams)
    }
    clubadd()
  },[])


  const [details, setDetails] = useState({
    tournamentname: data?.tournamentname,
    location: data.location,
    status: data.status,
    tournamenttype: data.tournamenttype,
  })

  const [modal, setModal] = useState(false)
  const [addmodal, setAddModal] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const savechanges = async () => {
    // e.preventDefault();
    const { tournamentname, location, status, tournamenttype } = details;
    console.log(details,"deta")

    if (tournamentname.trim() === '' || location.trim() === '' || tournamenttype.trim() === '') {
      return toast.error('All fields are required');
    }

    try {
      const { data } = await clubApi.patch('/addtournament', { ...details, EmailId: mailId, id: id }, { withCredentials: true });
      // toast.success(data.message);
      console.log(data, "hiiiiiiii")
      toast.success(data.message);
      setTimeout(() => {
        Navigate('/club/manage');
      }, 1000);
    } catch (error) {
      console.log(error, "hiiiiiiii")
      toast.error(error.message);
    }
  }

  const [team, setTeam] = useState({
    clubname: '',
    location: '',
    phonenumber: '',
    registration: '',
    isUser: 'club',
    userId: clubdatas.id,
    tournament:id,
    manualAdd:true,
    amount: 0,

  })

  const Changes = (e) => {
    const { name, value } = e.target;
    setTeam((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  console.log(team, "jyjyj");


  const handleAdd = async () => {
    const { clubname, location, phonenumber, registration } = team
    console.log(clubname, "ytythtt");
    if (clubname.trim() === '' || location.trim() === '' ||  registration.trim() === '') {
      return toast.error('All fields are required');
    }
    if(phonenumber.trim().length !== 10 ){
      return toast.error('Phone number should be need ten digits');
    }
    try {
      console.log("log");
      const response = await clubApi.post('/addteammanual', { ...team })
      console.log(response, "llllll");
     setTimeout(()=>{
      setAddModal(false)
     },2000)
      return toast.success('Team Addd Successfullyy');


      // if (response.status === 202) {
        // console.log(response);
        // const datas = response?.data?.order;
      //   return isUser === 'user'
      //     ? Navigate(`/user/successpage`, { state: datas })
      //     : Navigate(`/club/successpage`, { state: datas });
      // }

      // if (response.data.url) {
      //   window.location.href = response.data.url;
      // }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  

  //   const [selectedDate, setSelectedDate] = useState(null);

  //   const handleDateChange = (date) => {
  //     setDetails((prevValue) => ({
  //       ...prevValue,
  //       lastdate: date,
  //     }));
  //     setSelectedDate(date);
  //   };


  //   const today = new Date();
  //   const tomorrow = new Date(today);
  //   tomorrow.setDate(tomorrow.getDate() + 1);

  return (

    <div className="min-h-screen relative">
      <div
        className=" inset-0 bg-cover bg-center min-h-screen py-24"
        style={{ backgroundImage: `url(${bgimage})`, filter: modal || addmodal ? "blur(30px)" : "none" }}
      >
        <Navbar data={clubdatas.isUser} />
        <h1 className="text-center font-bold text-blue-600 text-2xl md:text-4xl m-2 md:m-8">Details</h1>

        <div className="flex justify-center items-center h-full">
          <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
            <div className="mb-2">
              <div
                className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg "
                style={{ backgroundImage: `url(${child})` }}
              >
                <h1 className='text-lg font-semibold'>Tournament</h1>
                <span className="bg-green-600  h-12 mb-4  bg-opacity-60 flex items-center text-xl justify-center">{details.tournamentname}</span>
                <h1 className='text-lg font-semibold'>Location</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center"> {details.location}</span>
                <h1 className='text-lg font-semibold'>Category</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{details.tournamenttype}</span>
                <h1 className='text-lg font-semibold'>Status</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{details.status == true ? "Ongoing" : "Over"}</span>
                <h1 className='text-lg font-semibold'>Teams Registered</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{count}</span>
                <div className="flex lg:flex-row flex-col justify-center"> 
                
                
                  <button className="bg-white mx-auto text-gray-800 px-4 py-2  rounded-lg m-2 w-64 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => setModal(true)}>Edit </button>
                  {!data.announced?
                  <button className="bg-white mx-auto text-gray-800 px-4 py-2  items-center m-2 w-64 rounded-lg  font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => setAddModal(true)}>Add Teams </button>
                  :''}
                  {/* <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg">Button 2</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {modal && (
        <div className="inset-0 fixed flex justify-center items-center">
          <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
            <div className="mb-2">
              <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                <button
                  className="text-red-300 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:tracking-wider"
                  onClick={() => setModal(false)}
                >
                  Close
                </button>
                <h1 className="text-center font-bold text-xl text-yellow-300">
                  Edit
                </h1>

                <h1 className="text-lg font-semibold">Tournament</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 flex items-center text-xl justify-center w-full px-2"
                  type='text' name='tournamentname' placeholder={details.tournamentname} onChange={handleChange}
                />
                <h1 className="text-lg font-semibold">Location</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='text' name='location' placeholder={details.location} onChange={handleChange}
                />

                <select className="bg-green-600 h-12 mb-4 mt-8 bg-opacity-60 items-center flex text-xl justify-center w-full px-2" id="category" name="tournamenttype" onChange={handleChange}>
                  <option value={details.tournamenttype}  >{details.tournamenttype}</option>
                  <option className='text-black font-medium' value="League">League</option>
                  <option className='text-black font-medium' value="Nockout">Nockout</option>
                  <option className='text-black font-medium' value="Combo">Combo</option>
                  {/* Add more options for different categories */}
                </select>
                {/* {details.status === true ? */}
                  <>
                    <h1 className="text-lg font-semibold mt-6 ml-8 mb-2 ">Change Status</h1>
                    <select className="border-2 bg-transparent h-10 mb-8 text-yellow-300 bg-opacity-60 items-center flex text-xl justify-center w-44 text-center px-2 rounded-xl" id="category" name="status" onChange={handleChange}>
                      <option className='text-yellow-300 font-medium' value={true} >Ongoing</option>
                      <option className='text-red-600 font-medium' value={false}>Over</option>
                    </select>

                    {/* <button
                  className="border-2 h-10 mt-8 mb-4 bg-opacity-60 items-center flex text-xl text-center justify-center text-red-300 w-44 rounded-xl px-2 hover:tracking-wider"
                  type='text' name='location' placeholder={details.status==true?'over':''} onChange = {handleChange}
                >match over</button> */}
                  </>
                {details.status === true ?  <h1 className="text-lg font-semibold mb-2 text-center text-blue-500">Now Ongoing</h1>
                :
                  <h1 className="text-lg font-semibold mb-2 text-center text-red-400">Tournament over</h1>
                }
                <div className="flex justify-center">
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-32 font-semibold text-lg hover:text-green-400 hover:tracking-wider" onClick={() => savechanges()}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

{addmodal && (
        <div className="inset-0 fixed flex justify-center items-center">
          <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
            <div className="mb-2">
              <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                <button
                  className="text-red-500 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider"
                  onClick={() => setAddModal(false)}
                >
                  Close
                </button>
                <h1 className="text-center font-bold text-xl text-yellow-300">
                  Add Team
                </h1>
  
                <h1 className="text-lg font-semibold">Club Name</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 flex items-center text-xl justify-center w-full px-2"
                  type='text' name='clubname' placeholder="Club Name"
                  onChange={Changes} />
                <h1 className="text-lg font-semibold">Location</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='text' name='location' placeholder='Location'
                  onChange={Changes} />
  
                <h1 className="text-lg font-semibold">Phone Number</h1>
  
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='number' name='phonenumber' placeholder='phonenumber' min={0} 
                  onChange={Changes} />
  
                <h1 className="text-lg font-semibold">Registration Number</h1>
  
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='number' name='registration' placeholder='registration'
                  onChange={Changes} />
  
                {/* <h1 className="text-lg font-semibold text-center text-blue-400 m-2"><span className='text-white'>Fee : </span>{data.fee}</h1> */}
  
                <div className="flex justify-center">
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-40 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => handleAdd()}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default TournamentShow