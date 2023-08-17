import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios'

import loginbg from '../../assets/images/loginbg/login.jpg'
import image from '../../assets/images/logo/logo.png'
import googlelogo from '../../assets/images/googlelogo/google.png'

import { userApi, clubApi } from '../../utils/api'
import { setUserDetails } from '../../redux/userDataSlice'
import { setClubDetails } from '../../redux/clubDataSlice'


function Login() {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const isClub = location.state

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
            setProfile({ ...res.data, isUser: 'user' })
            userApi.post('/googlelogin', { ...res.data, isUser: 'user' }, { withCredentials: true }).then((res) => {

              localStorage.setItem("userToken", res.data.token)

              dispatch(setUserDetails({
                id: res.data.userExist._id,
                email: res.data.userExist.email,
                isUser: res.data.userExist.isUser,
                name: res.data.userExist.name

              }))

              toast.success(res.data.message)
              setTimeout(() => {
                navigate('/user/home', { state: isClub })
              }, 1000)
            }).catch((res) => {
              toast.error(res.response.data.message);

            })
          })
          .catch((err) => {
            console.log(err)
          });

      }
    },
    [user, dispatch, navigate]
  );



  useEffect(() => {
    if (!isClub) {
      navigate('/')
    }

  }, [isClub])

  const [value, setValue] = useState({
    isUser: isClub,
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

  const checkUser = async (e) => {
    const { email, password, isUser } = value
    if (email.trim() === '' || password.trim() === '') {
      return toast.error("All fields are required")
    }
    try {

      const { data } = await (isClub === 'user'
        ? userApi.post('/login', value, { withCredentials: true })
        : clubApi.post('/login', value, { withCredentials: true }));
      if (data) {
        if (data.errors) {
          toast.error(data.message)
        } else {
          localStorage.setItem(
            isClub === 'user' ? 'userToken' : 'clubToken',
            data.token
          );
          isClub === 'user' ? dispatch(setUserDetails({
            id: data.userExist._id,
            email: data.userExist.email,
            isUser: data.userExist.isUser,
            name: data.userExist.name,
            phoneNumber: data.userExist?.phonenumber,
            isGoogle: data.userExist.isGoogle
          })) :
            dispatch(setClubDetails({
              id: data.userExist._id,
              email: data.userExist.email,
              isUser: data.userExist.isUser,
              name: data.userExist.clubname,
              clubRegisterNo: data.userExist.registration,
              location: data.userExist.location,
            }))

          toast.success(data.message)
          setTimeout(() => {
            navigate(isClub === 'user' ? '/user/home' : '/club/home', {
              state: isClub,
            });
          }, 1000);

        }
      }
    } catch (error) {
      error.response?.status == 400 ? toast.error(error.response?.data?.message) : toast.error(error.message)
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleForgotPasswordSubmit = async () => {

    let valueof = { email: forgotPasswordEmail, isUser: isClub }
    try {

      const { data } = await (isClub === 'user'
        ? userApi.post('/forgot', valueof, { withCredentials: true })
        : clubApi.post('/clubforgot', valueof, { withCredentials: true }))

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

    setIsModalOpen(false);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${loginbg})` }}>
      <div className="flex flex-col items-center justify-center h-full">
        <img src={image} alt="Logo" className="h-20 w-20 md:h-28 md:w-28 mb-4" />
        <h1 className="text-white text-3xl md:text-4xl font-semibold pb-6">{isClub === 'user' ? 'USER LOGIN' : 'CLUB LOGIN'}</h1>

        <div className="flex flex-col items-center m-4">
          <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="email">E-mail:</label>
          <input
            className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100"
            type="text"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={value.email}
            onChange={handleChange}
          />

          <label className="text-white text-lg md:text-xl font-semibold mb-2" htmlFor="password">Password:</label>
          <input
            className="bg-white hover:bg-opacity-60 text-black text-center font-normal py-2 px-4 rounded-full mb-4 w-80 md:w-96 placeholder-black placeholder-opacity-100"
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={value.password}
            onChange={handleChange}
          />
        </div>

        <button href="#" className="text-white hover:text-xl hover:font-bold text-sm mb-4 ml-2" onClick={() => setIsModalOpen(true)}>Forgot Password?</button>

        <button
          className="bg-gray-400 hover:bg-white text-lg text-black hover:text-green-500 font-bold py-2 px-6 rounded-full mb-6"
          type="submit"
          onClick={() => checkUser()}
        >
          SUBMIT
        </button>

        <h3 className="text-white mb-2 mx-5">
          Not a member!{' '}
          <a
            href={isClub === 'user' ? `/user/signup?isClub=${isClub}` : `/club/clubsignup?isClub=${isClub}`}
            className="text-red-800 font-bold mx-2 text-lg hover:text-blue-800 hover:text-xl"
          >
            Register Now...
          </a>
        </h3>

        {isClub === 'user' && (
          <div className="flex items-center">
            <button onClick={() => login()} className="flex items-center">
              <span className="text-white mr-1">OR Continue with</span>
              <img src={googlelogo} alt="Logo" className="h-4 w-4 md:h-8 md:w-8 ml-1" />
            </button>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>
              <div className="flex flex-col">
                <input
                  className="bg-gray-200 text-black px-4 py-2 rounded-full mb-4 w-80 md:w-96"
                  type="text"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-full m-2"
                  onClick={handleForgotPasswordSubmit}
                >
                  Submit
                </button>
                <button
                  className="text-gray-500 text-sm font-medium m-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}

export default Login
