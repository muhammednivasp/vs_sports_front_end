import React, { useEffect, useState } from 'react'
import playerimg from '../assets/images/player/portrait.jpg'
import child from '../assets/images/player/child.jpg'
import bgimage from '../assets/images/bg/backgroundvssports.jpg'
import toast from 'react-hot-toast'
import { clubApi } from '../utils/api';

import Navbar from '../components/navbar/navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';


function AnnouncedShow() {

  const clubdatas = useSelector((state) => state.club);
  console.log(clubdatas, "ioioi")

  let mailId = clubdatas.email

  const Navigate = useNavigate()
  const location = useLocation()

  const data = location.state
  console.log(data, "iudev")
  const id = data._id
  console.log(id, "klmnbviudev")


  const [details, setDetails] = useState({
    tournamentname: data.tournamentname,
    location: data.location,
    teamsrequired: data.teamsrequired.toString(),
    fee: data.fee.toString(),
    lastdate: new Date(data.lastdate),
    category: data.category,
  })

  const [modal, setModal] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const savechanges = async () => {
    // e.preventDefault();
    const { tournamentname, location, fee, teamsrequired, lastdate, category } = details;
    console.log(details)
    console.log(fee)

    if (fee < 0) {
      return toast.error('fee minimum zero');
    }
    if (teamsrequired < 1 || teamsrequired > 64) {
      return toast.error('give proper team requirements');
    }
    if (tournamentname.trim() === '' || location.trim() === '' || fee.trim() === '' || teamsrequired.trim() === '' || lastdate === '' || category.trim() === '') {
      return toast.error('All fields are required');
    }

    try {
      const { data } = await clubApi.patch('/announcetournament', { ...details, EmailId: mailId, id: id }, { withCredentials: true });
      toast.success(data.message);
      console.log(data, "hiiiiiiii")
      setTimeout(() => {
        Navigate('/club/manage');
      }, 1000);
    } catch (error) {
      console.log(error, "hiiiiiiii")
      toast.error(error.message);
    }
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setDetails((prevValue) => ({
      ...prevValue,
      lastdate: date,
    }));
    setSelectedDate(date);
  };


  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const DetailsShow = ()=>{
    Navigate('/club/details',{state:{datas:data}})
  }

  return (

    <div className="min-h-screen relative">
      <div
        className=" inset-0 bg-cover bg-center min-h-screen pt-24"
        style={{ backgroundImage: `url(${bgimage})`, filter: modal ? "blur(30px)" : "none" }}
      >
        <Navbar data={clubdatas.isUser} />
        <h1 className="text-center font-bold text-blue-600 text-4xl m-6">Details</h1>

        <div className="flex justify-center items-center h-full ">
          <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
            <div className="mb-4">
              <div
                className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg"
                style={{ backgroundImage: `url(${child})` }}
              >
                <h1 className='text-lg font-semibold'>Tournament</h1>
                <span className="bg-green-600  h-12 mb-4  bg-opacity-60 flex items-center text-xl justify-center">{details.tournamentname}</span>
                <h1 className='text-lg font-semibold'>Location</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center"> {details.location}</span>
                <h1 className='text-lg font-semibold'>Required Teams</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{details.teamsrequired}</span>
                <h1 className='text-lg font-semibold'>Tournament Fee</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{details.fee}</span>
                <h1 className='text-lg font-semibold'>Tournament Type</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{details.category}</span>
                <h1 className='text-lg font-semibold'>Last Date</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{new Date(details.lastdate).toLocaleString()}</span>
                <div className="flex justify-center"> {/* Added flex and justify-center classes */}
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => setModal(true)}>Edit </button>
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => DetailsShow()}>Details</button>

                  {/* <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg">Button 2</button> */}
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
                  Edit
                </h1>

                <h1 className="text-lg font-semibold">Tournament</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 flex items-center text-xl justify-center w-full px-2"
                  type='text' name='tournamentname' placeholder={details.tournamentname} onChange={handleChange}
                />
                <h1 className="text-lg font-semibold">Location</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='text' name='location' placeholder={details.location} onChange={handleChange}
                />
                <h1 className="text-lg font-semibold">Required Teams</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='number' name='teamsrequired' placeholder={details.teamsrequired} onChange={handleChange}

                />
                <h1 className="text-lg font-semibold">Tournament Fee</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='number' name='fee' placeholder={details.fee} onChange={handleChange}

                />

                <select className="bg-green-600 h-12 mb-4 mt-8 bg-opacity-60 items-center flex text-xl justify-center w-full px-2" id="category" name="category" onChange={handleChange}>
                  <option value={details.category}  >{details.category}</option>
                  <option className='text-black font-medium' value="League">League</option>
                  <option className='text-black font-medium' value="Nockout">Nockout</option>
                  <option className='text-black font-medium' value="Combo">Combo</option>
                  {/* Add more options for different categories */}
                </select>
                <h1 className="text-lg font-semibold">Last Date</h1>
                <div >
                  <DatePicker
                    selected={details.lastdate}
                    onChange={handleDateChange}
                    minDate={tomorrow}
                    placeholderText={(details.lastdate) != null ? (details.lastdate) : "Select Last Date"}
                    dateFormat="yyyy-MM-dd"
                    className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  />
                </div>
                <div className="flex justify-center">
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => savechanges()}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AnnouncedShow