import React from 'react'
import background from '../assets/images/bg/backgroundvssports.jpg'
import Navbar from '../components/navbar/navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import playerimg from '../assets/images/player/pngwing.com.png'



// import Footer from '../components/footer/footer'

function ClubProfile() {

  const clubdatas = useSelector((state) => state.club);
  console.log(clubdatas, "ioioi")

  const Navigate = useNavigate()

  const EditClubProfile = () => {
    Navigate("/club/editprofile")
  }

  const ClubPassword = () => {
    Navigate("/club/changepassword")
  }

  // const AnnounceTournament = ()=>{
  //   Navigate("/club/announce")
  // }

  const ManageTournaments = () => {
    Navigate("/club/manage")
  }

  return (

    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${background})` }}>
      <Navbar data='club' />

      <div className="container mx-auto ">

        {/* Content of the User Profile page */}
        <div className=" flex flex-col items-center justify-center pt-28">
          {/* Heading */}
          <h2 className="text-2xl text-blue-700 font-bold ">Profile</h2>

          <div className="w-full md:w-9/12 lg:w-9/12 xl:w-9/12 xm:w-9/12 xs:w-9/12 bg-white bg-opacity-50 rounded-lg flex flex-col justify-between items-center m-10"  >
            {/* Box Content */}

            <button className="w-40 h-10 bg-white rounded-full text-Black font-semibold ml-auto flex items-center justify-center m-4">
              My Tickets
            </button>

            <div className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center">
              <span className="text-gray-800 text-lg mb-2">{clubdatas.name}</span>
            </div>
            <div className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center">
              <span className="text-gray-800 text-lg mb-2">{clubdatas.email}</span>
            </div>
            <div className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black">
              <span className="text-gray-800 text-lg mb-2">{clubdatas.clubRegisterNo}</span>
            </div>
            <div className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black">
              <span className="text-gray-800 text-lg mb-2">{clubdatas.location}</span>
            </div>


            <div className="flex justify-end mt-4">
              <button className="w-36 h-8 md:w-48 md:h-10 bg-white text-black font-semibold rounded-md m-2 md:m-4" onClick={() => {
                EditClubProfile()
              }}>
                Edit Profile
              </button>
              <button className="w-36 h-8 md:w-48 md:h-10 bg-white text-black font-semibold rounded-md m-2 md:m-4" onClick={() => {
                ClubPassword()
              }}>
                Change Password
              </button>
            </div>
            <div className="flex justify-end mt-4">

              <button className="w-44 h-8 md:w-48 md:h-10 bg-white text-black font-semibold rounded-md m-2 md:m-4" onClick={() => {
                ManageTournaments()
              }}>
                Manage Tournament
              </button>

              <button className="w-44 h-8 md:w-48 md:h-10 bg-white text-black font-semibold rounded-md m-2 md:m-4" onClick={() => {
                ManageTournaments()
              }}>
                Manage Tickets
              </button>
            </div>

            <div className='m-4 '>
              <h3 className='text-green-700'>Club signed in with club email Id</h3>
            </div>

          </div>
        </div>
      </div>
      {/* <Footer/>  */}
    </div>

  )
}

export default ClubProfile