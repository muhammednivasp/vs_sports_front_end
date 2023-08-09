import React, { useEffect, useState } from 'react';
import background from '../assets/images/bg/backgroundvssports.jpg'
import Navbar from '../components/navbar/navbar'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
// import playerimg from '../assets/images/player/pngwing.com.png'
import toast from 'react-hot-toast'
// import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import { clubApi } from '../utils/api';
// import yellowimg from '../assets/images/player/yellowplayer.png'


function ClubProfile() {

  const [clubsImg, setClubsImg] = useState([]);
  const [images, setimages] = useState([]);
  const [modal, setModal] = useState(false);
  const [view, setView] = useState(false);
  const [item, setItem] = useState('');


  const [memoryModal, setMemoryModal] = useState(false)

  const location = useLocation();
  const isUser = location.state;




  const clubdatas = useSelector((state) => state.club);
  console.log(clubdatas, "ioioi")

  const id = clubdatas.id
  console.log(id, "jiuy");


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const images = clubsImg
      const formData = new FormData();
      const formDataArray = images.map((imageFile, index) => {
        formData.append("images", imageFile);
        // console.log(index,"kk");
        // console.log(imageFile,"klk");

      });
      formData.append("id", id);
      // console.log(formData.get('image'));
      const { data } = await clubApi.post('/uploadimage', formData)
      console.log(data, "hy")
      toast.success(data.message)
      setModal(false)
    } catch (error) {
      console.log(error);
      toast.error(data.message)

    }
  }

  console.log(clubsImg, "hhhh");

  const Navigate = useNavigate()

  const EditClubProfile = () => {
    Navigate("/club/editprofile")
  }

  const ClubPassword = () => {
    Navigate("/club/changepassword")
  }

  const ManageTournaments = () => {
    Navigate("/club/manage")
  }

  const ManageMemories = () => {
    setModal(true)
  }

  const Memories = () => {
    setMemoryModal(true)
  }

  useEffect(() => {
    const loadImage = async () => {
      const { data } = await clubApi.post('/imagesget', { id: id })
      console.log(data, "fgfgerere");
      setimages(data.images)
    }
    loadImage()
  }, [])

  const viewImages = (item) => {
    setItem(item)
    setView(true)
  }

  const GetTickets = () => {
    Navigate(`/club/ticketshow`, { state: { isUser: 'club' } })
  }

  return (
    <div>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${background})`, filter: modal || memoryModal || view ? "blur(30px)" : "none" }}>
        <Navbar data='club' />

        <div className="container mx-auto ">

          <div className=" flex flex-col items-center justify-center pt-28">
            <h2 className="text-2xl text-blue-700 font-bold ">Profile</h2>

            <div className="w-full md:w-9/12 lg:w-9/12 xl:w-9/12 xm:w-9/12 xs:w-9/12 bg-white bg-opacity-50 rounded-lg flex flex-col justify-between items-center m-10"  >
              <div className=' flex'>
                <button className="w-40 h-10 bg-white rounded-full text-Black font-semibold ml-auto flex items-center justify-center m-4" onClick={() => { Memories() }}>
                  Club Memories
                </button>
                <button className="w-40 h-10 bg-white rounded-full text-Black font-semibold ml-auto flex items-center justify-center m-4"
                  onClick={() => { GetTickets() }}
                >
                  My Tickets
                </button>
              </div>

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
                  ManageMemories()
                }}>
                  Add Memories
                </button>
              </div>

              <div className='m-4 '>
                <h3 className='text-green-700'>Club signed in with club email Id</h3>
              </div>

            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 md:w-96 w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-amber-400">Upload Images</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="profileImage" className="block font-bold mb-1">
                  Profile Image
                </label>
                <input
                  id="profileImage"
                  type="file"
                  name="image"
                  accept=".jpeg, .jpg, .png, .gif"
                  multiple
                  className="border border-gray-400 p-2 w-full"
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setClubsImg(selectedFiles);
                  }}
                />
              </div>

              <div className="p-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-full mb-3"
                >
                  Upload
                </button>
                <button
                  className="border-2 border-yellow-400 text-red-500 hover:text-red-700 font-bold py-2 px-2 rounded w-full"
                  onClick={() => setModal(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {memoryModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg z-10 w-full max-w-md mx-4">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {images.map((item) => (
                <button className="m-2" onClick={() => { viewImages(item) }}>
                  <img className="w-full transition duration-300" src={item} alt="images" />
                </button>
              ))}
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setMemoryModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {view &&
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg z-10 ">
            <img class="  transition duration-300 w-[40rem] h-[40rem]" src={item} alt="images" />
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setView(false)}
            >
              Close
            </button>
          </div>
        </div>
      }
    </div>


  )
}

export default ClubProfile