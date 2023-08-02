import React, { useEffect, useState } from 'react'
import background from '../assets/images/bg/backgroundvssports.jpg'
import Navbar from '../components/navbar/navbar'
import { useSelector, useDispatch } from 'react-redux'
import { userApi } from '../utils/api';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

// import { setUserDetails } from '../redux/userDataSlice'

// import Footer from '../components/footer/footer'

function ChangeUserPassword() {

  const isClub = 'user'

  const userdatas = useSelector((state) => state.user);
  console.log(userdatas, "ioioi")

  let mailId = userdatas.email

  //   const dispatch = useDispatch()
  const Navigate = useNavigate()

  const [value, setValue] = useState({
    isUser: userdatas.isUser,
    Password: "",
    NewPassword: "",
    PasswordConform: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(value, "nanae")
  })

  const savechanges = async () => {
    // e.preventDefault();
    const { Password, NewPassword, PasswordConform, isUser } = value;

    if (Password.trim().length < 6 || NewPassword.trim().length < 6 || PasswordConform.trim().length < 6) {
      return toast.error('The length of Password should be more than six');
    }
    if (NewPassword !== PasswordConform) {
      return toast.error('New Password is Incorrect !');

    }

    try {
      const { data } = await userApi.patch('/userpassword', { ...value, EmailId: mailId }, { withCredentials: true });

      if (data) {
        console.log(data, "hiiihiihiihiihiihaaaa")
        if (data.errors) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          //   console.log(data,"hiiiiiiii")
          setTimeout(() => {
            Navigate("/user/profile", { state: isClub });
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error, "hiiiiiiii")
      toast.error(error.response.data.message);
    }
  };

  return (

    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${background})` }}>
      <Navbar data={userdatas.isUser} />
      <div className="container mx-auto ">

        <div className=" flex flex-col items-center justify-center pt-36">

          <h2 className="text-2xl text-blue-700 font-bold ">Change Password</h2>

          <div className="w-full md:w-9/12 lg:w-9/12 xl:w-9/12 xm:w-9/12 xs:w-9/12 bg-white bg-opacity-50 rounded-lg flex flex-col justify-between items-center m-10">

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-50" type="password" id="Password" name="Password" placeholder="Enter your old Password" onChange={handleChange}></input>

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-50" type="password" id="NewPassword" name="NewPassword" placeholder="Enter new Password" onChange={handleChange}></input>

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-50" type="password" id="PasswordConform" name="PasswordConform" placeholder="Conform New Password" onChange={handleChange}>


            </input>

            <div className="flex justify-end mt-4">
              <button className="w-32 h-8 md:w-48 md:h-10 bg-white text-black font-semibold rounded-md m-2 md:m-4" onClick={() => savechanges()} >
                Save Changes
              </button>
            </div>
            <div className='m-4 '>
              <h3 className='text-green-700'>You signed in with email Id</h3>
            </div>

          </div>
        </div>
      </div>
      {/* <Footer/>  */}
    </div>

  )
}



export default ChangeUserPassword