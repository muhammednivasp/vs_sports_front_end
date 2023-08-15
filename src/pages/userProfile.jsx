import React, { useEffect } from 'react'
import background from '../assets/images/bg/backgroundvssports.jpg'
import Navbar from '../components/navbar/navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UserProfile() {

  const userdatas = useSelector((state) => state.user);
  const Navigate = useNavigate()

  const EditProfile = () => {
    Navigate("/user/editprofile")
  }
  const ChangePassword = () => {
    Navigate("/user/changepassword")
  }
  const mytickets = () => {
    Navigate(`/user/ticketshow`, { state: { isUser: 'user' } })
  }
  return (

    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${background})` }}>
      <Navbar data={userdatas.isUser} />
      <div className="container mx-auto">
        <div className=" flex flex-col items-center justify-center pt-32">
          <h2 className="text-2xl text-blue-700 font-bold ">Profile</h2>

          <div className="w-full md:w-9/12 lg:w-9/12 xl:w-9/12 xm:w-9/12 xs:w-9/12 bg-white bg-opacity-50 rounded-lg flex flex-col justify-between items-center m-10">
            <button className="w-40 h-10 bg-white rounded-full text-Black font-semibold ml-auto flex items-center justify-center m-4"
              onClick={() => { mytickets() }}>
              My Tickets
            </button>
            <div className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center">
              <span className="text-gray-800 text-lg mb-2">{userdatas.name}</span>
            </div>
            <div className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center">
              <span className="text-gray-800 text-lg mb-2">{userdatas.email}</span>
            </div>
            <div className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black">
              <span className="text-gray-800 text-lg mb-2">{userdatas.phoneNumber ? userdatas.phoneNumber : '"No Phone Number"'}</span>
            </div>

            {userdatas.isGoogle === false ? (
              <>
                <div className="flex justify-end mt-4">
                  <button className="w-32 h-8 md:w-48 md:h-10 bg-white text-black font-semibold rounded-md m-2 md:m-4" onClick={() => {
                    EditProfile()
                  }}>
                    Edit Profile
                  </button>
                  <button className="w-32 h-8 md:w-48 md:h-10 bg-white text-black font-semibold rounded-md m-2 md:m-4" onClick={() => {
                    ChangePassword()
                  }}>
                    Change Password
                  </button>
                </div>
                <div className='m-4 '>
                  <h3 className='text-green-700'>You signed in with email Id</h3>
                </div>
              </>
            ) : (
              <div className='m-4 '>
                <h3 className='text-green-700'>You signed in with Google</h3>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>

  )
}


export default UserProfile