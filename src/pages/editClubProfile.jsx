import React, { useEffect, useState } from 'react'
import background from '../assets/images/bg/backgroundvssports.jpg'
import Navbar from '../components/navbar/navbar'
import { useSelector, useDispatch } from 'react-redux'
import { clubApi } from '../utils/api';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { setTempDetails } from '../redux/updateDataSlice';

function EditClubProfile() {

  const isClub = 'club'

  const clubdatas = useSelector((state) => state.club);

  let mailId = clubdatas.email

  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const [value, setValue] = useState({
    isUser: clubdatas.isUser,
    email: clubdatas.email,
    name: clubdatas.name,
    clubRegisterNo: clubdatas.clubRegisterNo.toString(),
    location: clubdatas.location
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const savechanges = async () => {
    const { email, clubRegisterNo, location, name, isUser } = value;

    if (email.trim() === '' || name.trim() === '' || location.trim() === '' || clubRegisterNo.trim() === '') {
      return toast.error('All fields are required');
    }

    try {
      dispatch(setTempDetails({
        data: value
      }))

      const { data } = await clubApi.patch('/editclubprofile', { ...value, EmailId: mailId }, { withCredentials: true });

      if (data) {
        if (data.errors) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (

    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${background})` }}>
      <Navbar data={clubdatas.isUser} />
      <div className="container mx-auto ">
        <div className=" flex flex-col items-center justify-center pt-32">
          <h2 className="text-2xl text-blue-700 font-bold ">Edit Profile</h2>

          <div className="w-full md:w-9/12 lg:w-9/12 xl:w-9/12 xm:w-9/12 xs:w-9/12 bg-white bg-opacity-50 rounded-lg flex flex-col justify-between items-center m-10">

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-50" type="text" id="name" name="name" placeholder={clubdatas.name} onChange={handleChange}></input>

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-50" type="mail" id="mail" name="email" placeholder={clubdatas.email} onChange={handleChange}></input>

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-50" type="text" id="location" name="location" placeholder={clubdatas.location} onChange={handleChange}></input>

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-50" type="number" id="clubRegisterNo" name="clubRegisterNo" placeholder={clubdatas.clubRegisterNo} onChange={handleChange}></input>


            <div className="flex justify-end mt-4">
              <button className="w-32 h-8 md:w-48 md:h-10 bg-white text-black font-semibold rounded-md m-2 md:m-4" onClick={() => savechanges()} >
                Save Changes
              </button>

            </div>
            <div className='m-4 '>
              <h3 className='text-green-700'>Club signed in with club email Id</h3>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}



export default EditClubProfile