
import React, { useState,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import Navbar from '../../Admin/components/Navbar';
import Sidebar from '../components/Sidebar';
import bgimage from '../../assets/images/bg/backgroundvssports.jpg';
import loginbg from '../../assets/images/loginbg/login.jpg'
import image from '../../assets/images/logo/logo.png'
import googlelogo from '../../assets/images/googlelogo/google.png'
import toast from 'react-hot-toast'
import { adminApi } from '../../utils/api';

import { useDispatch } from 'react-redux';

import { setAdminDetails } from '../../redux/adminDataSlice'



const LoginPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
    // console.log("ethi")
  // const userdatas = useSelector((state) => {
  //   state.user
  // })
  //  console.log(userdatas)
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const location = useLocation()
  // const isClub = location.state

  // console.log(isClub)



  // useEffect(() => {
  //   // const isClub = location.state 
  //   console.log(isClub)
  //   if (!isClub) {
  //     navigate('/')
  //   }

  // }, [isClub])

  const [value, setValue] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  console.log(value)


  const checkUser = async (e) => {
    // console.log(value)
    const { email, password } = value
    if (email.trim() === '' || password.trim() === '') {
      return toast.error("All fields are required")
    }
    try {
      console.log(value)

      // const {data} = clubApi.post('/login',value, { withcredentials: true })
      // console.log("fffffff")

      const { data } = await adminApi.post('/login', value, { withCredentials: true })
      console.log(data, "dsdsdsd")
      if (data) {
        if (data.errors) {
          toast.error(data.message)
        } else {
          // console.log("dkdkkdkkdkkdkyyyy")
          localStorage.setItem(
          'adminToken',
            data.token
          );
          // const tok=localStorage.getItem('token')
          // console.log(tok)
          dispatch(setAdminDetails({
            id: data.adminExist._id,
            email: data.adminExist.email,
          }))

          toast.success(data.message)
          setTimeout(() => {
            navigate( '/admin/home');
          }, 1000);

        }
      }
    } catch (error) {
      console.log(error)
      error.response?.status == 400 ? toast.error(error.response?.data?.message) : toast.error(error.message)
    }
  }




  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  // const handleForgotPasswordSubmit = async () => {

  //   console.log('Forgot Password form submitted');
  //   console.log('Email:', forgotPasswordEmail);

  //   let valueof = { email: forgotPasswordEmail, isUser: isClub }
  //   console.log(valueof, "kopkpkpk")
  //   try {

  //     const { data } = await (isClub === 'user'
  //       ? userApi.post('/forgot', valueof, { withCredentials: true })
  //       : clubApi.post('/clubforgot', valueof, { withCredentials: true }))
  //     console.log(data, "dsdsdsd")

  //     console.log(data, "datassss")
  //     if (data) {
  //       if (data.errors) {
  //         toast.error(data.message);
  //       } else {
  //         toast.success(data.message);
  //         // setTimeout(() => {
  //         //   navigate('/user/login',{ state: isClub });
  //         // }, 1000);
  //         // setMsg(res.message)
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error, "kiokipk")
  //     toast.error(error.response.data.message);
  //   }

  //   // Close the modal
  //   setIsModalOpen(false);
  // };


  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${loginbg})` }}>
      <div className="flex flex-col items-center justify-center h-full">
        <img src={image} alt="Logo" className="h-20 w-20 md:h-28 md:w-28 mb-4" />
        <h1 className="text-white text-3xl md:text-4xl font-semibold pb-6">Admin Login</h1>

        <div className="flex flex-col items-center m-4">
          <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="email">E-mail:</label>
          <input
            className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100"
            type="text"
            id="email"
            placeholder="Enter your email"
            name="email"
            // value={value.email}
            onChange={handleChange}
          />

          <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="password">Password:</label>
          <input
            className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100"
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            // value={value.password}
            onChange={handleChange}
          />
        </div>


        <button
          className="bg-gray-400 hover:bg-white text-lg text-black hover:text-green-500 font-bold py-2 px-6 rounded-full mb-6"
          type="submit"
          onClick={() => checkUser()}
        >
          SUBMIT
        </button>

        


      </div>
    </div>
    
  );
};

export default LoginPage;


