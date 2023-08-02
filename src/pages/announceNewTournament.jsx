import React, { useEffect, useState } from 'react'
import background from '../assets/images/bg/backgroundvssports.jpg'
import Navbar from '../components/navbar/navbar'
import { useSelector, useDispatch } from 'react-redux'
import { clubApi } from '../utils/api';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';



// import { setUserDetails } from '../redux/userDataSlice'

// import Footer from '../components/footer/footer'

function AnnounceTournament() {
console.log('fff');
  const clubdatas = useSelector((state) => state.club);
  console.log(clubdatas, "ioioi")

  let mailId = clubdatas.email

  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const [value, setValue] = useState({
    tournamentname: '',
    location: '',
    fee: 0,
    teamsrequired: 0,
    lastdate: '',
    category: ''
  })

  const [selectedDate, setSelectedDate] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  // useEffect(() => {
    // console.log(value, "nanae")
  // })

  // const handleDateChange = (date) => {
  //   setValue((prevValue) => ({
  //     ...prevValue,
  //     lastdate: date.toISOString().split('T')[0],
  //   }));
  // };

  const handleDateChange = (date) => {
    setValue((prevValue) => ({
      ...prevValue,
      lastdate: parseISO(date.toISOString().split('T')[0]),
    }));
    setSelectedDate(date);
    console.log(date)
  };


  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const savechanges = async () => {
    // e.preventDefault();
    const { tournamentname, location, fee, teamsrequired, lastdate, category } = value;
    console.log(value)
    console.log(fee)

    if (fee < 0) {
      return toast.error('fee minimum zero');
    }
    if (teamsrequired < 1 || teamsrequired > 64) {
      return toast.error('give proper team requirements');
    }
    if (tournamentname.trim() === '' || location.trim() === '' || fee.toString().trim() === '' || teamsrequired.trim() === '' || lastdate === '' || category.trim() === '') {
      return toast.error('All fields are required');
    }

    try {
      const { data } = await clubApi.post('/announcetournament', { ...value, EmailId: mailId }, { withCredentials: true });

      if (data) {
        console.log(data, "hiiihiihiihiihiihaaaa")
        if (data.errors) {
          console.log(data.errors)
          toast.error(data.message);
        } else {
          toast.success(data.message);

          console.log(data, "hiiiiiiii")
          setTimeout(() => {
            Navigate("/club/manage");
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error, "hiiiiiiii")
      toast.error(error.response.data.message);
    }

    // const currentDate = new Date().toISOString().split('T')[0];

  };

  return (

    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${background})` }}>
      <Navbar data={'club'} />
      <div className="container mx-auto ">
        {/* Content of the User Profile page */}
        <div className=" flex flex-col items-center justify-center pt-32">
          {/* Heading */}
          <h2 className="text-2xl text-blue-700 font-bold ">Announce a Tournament</h2>

          <div className="w-full md:w-9/12 lg:w-9/12 xl:w-9/12 xm:w-9/12 xs:w-9/12 bg-white bg-opacity-50 rounded-lg flex flex-col justify-between items-center m-10">
            {/* Box Content */}


            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-100 placeholder-gray-900" type="text" id="tournamentname" name="tournamentname" placeholder="Enter Tournament Name" onChange={handleChange}></input>

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-100 placeholder-gray-900" type="text" id="location" name="location" placeholder="Enter Tournament Location" onChange={handleChange}></input>

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-100 placeholder-gray-900" type="number" id="fee" name="fee" placeholder="Tounament Fee" onChange={handleChange}></input>

            <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-100 placeholder-gray-900" type="number" id="teamsrequired" name="teamsrequired" placeholder="Teams Required" onChange={handleChange}></input>


            <select className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-100 placeholder-gray-900" id="category" name="category" onChange={handleChange}>
              <option value="">Select Category</option>
              <option className='text-black font-medium' value="League">League</option>
              <option className='text-black font-medium' value="Nockout">Nockout</option>
              <option className='text-black font-medium' value="Combo">Combo</option>
              {/* Add more options for different categories */}
            </select>


            {/* <input className="w-full md:w-11/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-50" type="date" id="date" name="date" placeholder="Last date" onChange={handleChange}></input> */}

            <div >
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={tomorrow}
                placeholderText={selectedDate != null ? { selectedDate } : "Select Last Date"}
                dateFormat="yyyy-MM-dd"
                className="w-full md:w-12/12 bg-gray-200 p-4 rounded-lg mt-8 text-center text-black text-opacity-100 placeholder-gray-900"
              />
            </div>

            <div className="flex justify-end mt-4">
              <button className="w-32 h-8 md:w-48 md:h-12 bg-white text-black font-bold rounded-md m-2 md:m-4 " onClick={() => savechanges()} >
                ADD
              </button>

            </div>


          </div>
        </div>
      </div>
      {/* <Footer/>  */}
    </div>

  )
}



export default AnnounceTournament