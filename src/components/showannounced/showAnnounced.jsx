import React, { useEffect, useState } from 'react'
import child from '../../assets/images/player/child.jpg'
import bgimage from '../../assets/images/bg/backgroundvssports.jpg'
import Navbar from '../../components/navbar/navbar'

import { useLocation, useNavigate } from 'react-router-dom'
import { clubApi, userApi } from '../../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

function ShowAnnounced() {

  const Navigate = useNavigate()
  const location = useLocation()

  const data = location.state
  const Id = data?._id 
  const isUser = data.isUser

  const clubdatas = useSelector((state) => state[isUser === 'user' ? 'user' : 'club']);

  const [id, setId] = useState(Id)

  const [modal, setModal] = useState(false)
  const [limit, setLimit] = useState(data.teamsrequired)

  useEffect(() => {
    const limitcheck = async () => {
      try {
        const { data } = await clubApi.post('/limit', { id })
        setLimit(data.details.teamsrequired)
      } catch (error) {
        console.log(error);
      }
    }
    limitcheck()

  },[limit])



  const AddTeams = () => {
    setModal(true)
  }

  const [values, setValues] = useState({
    clubname: '',
    location: '',
    phonenumber: '',
    registration: '',
    announcementid: Id,
    isUser: isUser,
    userId: clubdatas.id,
    amount: data.fee,

  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    const { clubname, location, phonenumber, registration } = values
    if (clubname.trim() === '' || location.trim() === '' ||  registration.trim() === '') {
      return toast.error('All fields are required');
    }
    if(phonenumber.trim().length !== 10 ){
      return toast.error('Phone number should be need ten digits');
    }
    try {
      const response = await (data.isUser === 'user' ? userApi : clubApi).post('/payment', { ...values })
      if (response.status === 202) {
        console.log(response);
        const datas = response?.data?.order;
        return isUser === 'user'
          ? Navigate(`/user/successpage`, { state: datas })
          : Navigate(`/club/successpage`, { state: datas });
      }

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
 

  return (
    <div className="min-h-screen relative">
      <div
        className="inset-0 bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url(${bgimage})`, filter: modal ? "blur(30px)" : "none" }}
      >
        <Navbar data={isUser} />
        <h1 className="text-center font-bold text-blue-600 text-4xl pt-24 pb-8">Details</h1>
  
        <div className="flex justify-center items-center h-full">
          <div className="w-full sm:w-2/3 md:w-2/5 lg:w-2/5 px-4">
            <div className="mb-2">
              <div
                className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg  w-full h-full"
                style={{ backgroundImage: `url(${child})` }}
              >
  
                <h1 className='text-lg font-semibold'>Tournament</h1>
                <span className="bg-green-600 h-12 mb-4 bg-opacity-60 flex items-center text-xl justify-center">{data.tournamentname}</span>
                <h1 className='text-lg font-semibold'>Location</h1>
                <span className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center"> {data.location}</span>
                <h1 className='text-lg font-semibold'>Required Teams</h1>
                <span className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{limit}</span>
                <h1 className='text-lg font-semibold'>Tournament Fee</h1>
                <span className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{data.fee}</span>
                <h1 className='text-lg font-semibold'>Tournament Type</h1>
                <span className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{data.category}</span>
                <h1 className='text-lg font-semibold'>Last Date</h1>
                <span className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{new Date(data.lastdate).toLocaleString()}</span>
                <div className="flex justify-center">
                  {limit > 0 ? (
                    <>
                      <button className='text-white hover:tracking-wider hover:text-green-400 font-semibold text-xl border-amber-400 border-2 rounded-xl text-center p-2 w-40 mt-4' onClick={() => AddTeams()}>Add Team</button>
                    </>
                  ) : (
                    <h1 className='text-xl text-yellow-400 font-medium text-center m-2'>Teams are filled !</h1>
                  )}
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
                  className="text-red-500 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider"
                  onClick={() => setModal(false)}
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
                  onChange={handleChange} />
                <h1 className="text-lg font-semibold">Location</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='text' name='location' placeholder='Location'
                  onChange={handleChange} />
  
                <h1 className="text-lg font-semibold">Phone Number</h1>
  
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='number' name='phonenumber' placeholder='phonenumber' min={0} 
                  onChange={handleChange} />
  
                <h1 className="text-lg font-semibold">Registration Number</h1>
  
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='number' name='registration' placeholder='registration'
                  onChange={handleChange} />
  
                <h1 className="text-lg font-semibold text-center text-blue-400 m-2"><span className='text-white'>Fee : </span>{data.fee}</h1>
  
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
    </div>
  );
}

export default ShowAnnounced