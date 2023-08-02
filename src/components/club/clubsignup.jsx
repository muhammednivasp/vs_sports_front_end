import React, { useState } from 'react'
// import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'

import loginbg from '../../assets/images/loginbg/login.jpg'
import image from '../../assets/images/logo/logo.png'
// import googlelogo from '../../assets/images/googlelogo/google.png'
import { clubApi } from '../../utils/api'

function Clubsignup() {

  const navigate = useNavigate()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const isclubor = queryParams.get('isClub');
  let isClub = location.state ?? isclubor
  if (!isClub) {
    isClub = 'club'
  }

  console.log(isClub, "loiuyt")

  const [value, setValue] = useState({
    isUser: isClub,
    email: "",
    registration: "",
    clubname: "",
    location: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  function already() {
    navigate('/club/login', { state: "club" })
  }

  // console.log("clubsignup")

  const addClubUser = async (e) => {
    // console.log("kityytyyt")
    const { email, clubname, password, registration, location } = value
    if (email.trim() === '' || password.trim() === '' || clubname.trim() === '' || registration.trim() === '' || location.trim() === '') {
      return toast.error("All fields are required")
    } if (password.trim().length < 6) {
      return toast.error("Password should be include minimum six digits")
    }
    try {
      console.log(value)
      // const {data} = await axios.post("http://localhost:4000/clubsignup",value,{withcredentials:true})
      const { data } = await clubApi.post("/clubsignup", value, { withcredentials: true })


      console.log("fffffff", data)
      if (data) {
        if (data.errors) {
          // console.log(data.errors.email,"lop")
          // const {email,password,phonenumber,name} = data.errors
          toast.error(data.message)
        } else {
          // console.log("dkdkkdkkdkkdkyyyy")
          // toast.success(data.message)
          // setTimeout(()=>{
          //   navigate('/club/login',{state:isClub})
          // },1000)

          toast.success(data.message);

        }
      }
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${loginbg})` }}>
      <div className="flex flex-col items-center justify-center h-full">
        <img src={image} alt="Logo" className="h-20 w-20 md:h-28 md:w-28 mt-3" />
        <h1 className="text-white text-3xl md:text-4xl font-semibold pb-6">CLUB Signup</h1>

        <div className="flex flex-col items-center m-4">
          {/* <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="email">E-mail:</label> */}
          <input className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100" type="text" id="name" name="clubname" placeholder="Enter Club Name" value={value.clubname} onChange={handleChange} />

          {/* <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="email">E-mail:</label> */}
          <input className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100" type="number" id="registration" name="registration" placeholder="Enter Club Registration No" value={value.registration} onChange={handleChange} />

          {/* <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="email">E-mail:</label> */}
          <input className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100" type="email" id="email" name="email" placeholder="Enter the Official Club mail Id" value={value.email} onChange={handleChange} />

          {/* <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="email">E-mail:</label> */}
          <input className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100" type="string" id="location" name="location" placeholder="Enter Club Location" value={value.location} onChange={handleChange} />

          {/* <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="password">Password:</label> */}
          <input className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100 " type="password" id="password" name="password" placeholder="Enter Password" value={value.password} onChange={handleChange} />

        </div>

        <button className="bg-gray-400 hover:bg-white text-lg text-black hover:text-green-500 font-bold py-2 px-6 rounded-full mb-6" type='submit' onClick={() => addClubUser()}>SUBMIT</button>


        <button onClick={() => already()} className="text-white font-bold mx-2 text-lg hover:text-yellow-400 hover:text-xl">Already have an account</button>

      </div>
    </div>

  )
}

export default Clubsignup
