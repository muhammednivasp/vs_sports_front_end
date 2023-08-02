
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

import loginbg from '../../assets/images/loginbg/login.jpg';
import image from '../../assets/images/logo/logo.png';
import googlelogo from '../../assets/images/googlelogo/google.png';
import { userApi } from '../../utils/api'
import { useGoogleLogin } from '@react-oauth/google';



function Signup() {

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);
  // const [msg,setMsg]=useState("")

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            // console.log("vannu")
            setProfile({ ...res.data, isUser: 'user' })
            // console.log(res.data)
            userApi.post('/googlesignup', { ...res.data, isUser: 'user', isGoogle: true }, { withCredentials: true }).then((res) => {
              // console.log(res,"koikoikoi")
              toast.success(res.data.message);
              setTimeout(() => {
                navigate('/user/login', { state: 'user' });
              }, 1000);
            }).catch((res) => {
              // console.log(res)
              toast.error(res.response.data.message);

            })

          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );
  console.log(profile)



  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isclubor = queryParams.get('isClub');
  let isClub = location.state ?? isclubor;
  if (!isClub) {
    isClub = 'user'
  }

  const [value, setValue] = useState({
    isUser: isClub,
    email: '',
    phonenumber: '',
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  function already() {
    navigate('/user/login', { state: "user" })
  }

  const addUser = async (e) => {
    e.preventDefault();
    const { email, phonenumber, password, name, isUser } = value;

    if (email.trim() === '' || password.trim() === '' || name.trim() === '' || phonenumber.trim() === '') {
      return toast.error('All fields are required');
    }

    if (phonenumber.trim().length !== 10) {
      return toast.error('Mobile number must be ten digits');
    }

    if (password.trim().length < 6) {
      return toast.error('Password should be at least six digits long');
    }

    try {
      const { data } = await userApi.post('/signup', value, { withCredentials: true });


      console.log(data, "datassss")
      if (data) {
        if (data.errors) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          // setTimeout(() => {
          //   navigate('/user/login',{ state: isClub });
          // }, 1000);
          // setMsg(res.message)
        }
      }
    } catch (error) {
      console.log(error, "kiokipk")
      toast.error(error.response.data.message);
    }
  };
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${loginbg})` }}>
      <div className="flex flex-col items-center justify-center h-full">
        <img src={image} alt="Logo" className="h-20 w-20 md:h-28 md:w-28 mt-3" />
        <h1 className="text-white text-3xl md:text-4xl font-semibold pb-6">User Signup</h1>

        <div className="flex flex-col items-center m-4">
          {/* <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="email">E-mail:</label> */}
          <input className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100" type="text" id="name" name="name" value={value.name} placeholder="Enter your name" onChange={handleChange} />

          {/* <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="email">E-mail:</label> */}
          <input className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100" type="email" id="email" name="email" value={value.email} placeholder="Enter your email Id" onChange={handleChange} />

          {/* <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="email">E-mail:</label> */}
          <input className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100" type="number" id="number" name="phonenumber" value={value.phonenumber} placeholder="Enter your phonenumber" onChange={handleChange} />

          {/* <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="password">Password:</label> */}
          <input className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100 " type="password" id="password" name="password" value={value.password} placeholder="Enter your password" onChange={handleChange} />

        </div>

        <button className="bg-gray-400 hover:bg-white text-lg text-black hover:text-green-500 font-bold py-2 px-6 rounded-full mb-6" type='submit' onClick={addUser}>SUBMIT</button>


        {/* <h3 className="text-white mb-2 mx-5">Not a member ! <a href="#" className="text-blue-800 font-bold mx-2 text-lg hover:text-red-900 hover:text-xl">Register Now...</a></h3> */}

        <div className="flex items-center">
          <h3 className="text-white mr-2">OR Continue With</h3>

          <button onClick={() => login()}><img src={googlelogo} alt="Logo" className="h-4 w-4 md:h-8 md:w-8" /></button>
          {/* <a href='#'><img src={googlelogo} alt="Logo" className="h-4 w-4 md:h-8 md:w-8" /></a> */}
        </div>
        <button onClick={() => already()} className="text-white font-bold mx-2 text-lg hover:text-yellow-400 hover:text-xl">Already have an account</button>


      </div>
    </div>


  )
}

export default Signup
