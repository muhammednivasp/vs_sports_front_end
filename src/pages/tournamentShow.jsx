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

function TournamentShow() {
  const clubdatas = useSelector((state) => state.club);
  let mailId = clubdatas.email
  const Navigate = useNavigate()
  const location = useLocation()
  const [count, setCount] = useState(0)
  const [teams, setTeams] = useState([])
  const data = location.state
  let id
  let announce = data?.announced
  announce === false ?
    id = data._id
    :
    id = data?.announcedid

  useEffect(() => {
    const clubadd = async () => {
      const { data } = await clubApi.post('/count', { id: id, announce: announce }, { withCredentials: true });
      setTeams(data.teams)
      setCount(data.teams.length)
    }
    clubadd()
  }, [])

  const [details, setDetails] = useState({
    tournamentname: data?.tournamentname,
    location: data.location,
    status: data.status,
    tournamenttype: data.tournamenttype,
    winners: data?.winners,
    runners: data?.runners
  })

  const [resDetails, setResDetails] = useState({
    winners: '',
    runners: '',
    tournamentId: id,
    announced: announce,
    emailId: mailId
  })

  const [modal, setModal] = useState(false)
  const [addmodal, setAddModal] = useState(false)
  const [resultModal, setResultModal] = useState(false)
  const [addResultModal, setAddResultModal] = useState(false)

  const handleResChange = (e) => {
    const { name, value } = e.target;
    setResDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  const saveResChanges = async () => {
    const { winners, runners, tournamentId, announced, emailId } = resDetails;

    if (winners.trim() === '' || runners.trim() === '') {
      return toast.error('All fields are required');
    }
    if (winners === runners) {
      return toast.error('winners and runners are same');
    }

    try {
      const { data } = await clubApi.patch('/addresultstournament', resDetails, { withCredentials: true });
      toast.success(data.message);
      setTimeout(() => {
        Navigate('/club/manage');
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const savechanges = async () => {
    const { tournamentname, location, status, tournamenttype } = details;
    if (tournamentname.trim() === '' || location.trim() === '' || tournamenttype.trim() === '') {
      return toast.error('All fields are required');
    }
    try {
      const { data } = await clubApi.patch('/addtournament', { ...details, EmailId: mailId, id: id, announced: announce }, { withCredentials: true });
      toast.success(data.message);
      setTimeout(() => {
        Navigate('/club/manage');
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const [team, setTeam] = useState({
    clubname: '',
    location: '',
    phonenumber: '',
    registration: '',
    isUser: 'club',
    userId: clubdatas.id,
    tournament: id,
    manualAdd: true,
    amount: 0,
  })

  const Changes = (e) => {
    const { name, value } = e.target;
    setTeam((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    const { clubname, location, phonenumber, registration } = team
    if (clubname.trim() === '' || location.trim() === '' || registration.trim() === '') {
      return toast.error('All fields are required');
    }
    if (phonenumber.trim().length !== 10) {
      return toast.error('Phone number should be need ten digits');
    }
    try {
      const response = await clubApi.post('/addteammanual', { ...team })
      setTimeout(() => {
        setAddModal(false)
      }, 2000)
      return toast.success('Team Addd Successfullyy');

    } catch (error) {
      toast.error(error.message);
    }
  }


  return (

    <div className="min-h-screen relative">
      <div
        className=" inset-0 bg-cover bg-center min-h-screen py-24"
        style={{ backgroundImage: `url(${bgimage})`, filter: modal || addmodal || resultModal ? "blur(30px)" : "none" }}
      >
        <Navbar data={clubdatas.isUser} />
        <h1 className="text-center font-bold text-blue-600 text-2xl md:text-4xl m-2 md:m-8">Details</h1>

        <div className="flex justify-center items-center h-full">
          <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
            <div className="mb-2">
              <div
                className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg "
                style={{ backgroundImage: `url(${child})` }}
              >
                <h1 className='text-lg font-semibold'>Tournament</h1>
                <span className="bg-green-600  h-12 mb-4  bg-opacity-60 flex items-center text-xl justify-center">{details.tournamentname}</span>
                <h1 className='text-lg font-semibold'>Location</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center"> {details.location}</span>
                <h1 className='text-lg font-semibold'>Category</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{details.tournamenttype}</span>
                <h1 className='text-lg font-semibold'>Status</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{details.status == true ? "Ongoing" : "Over"}</span>
                <h1 className='text-lg font-semibold'>Teams Registered</h1>
                <span className="bg-green-600  h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center">{count}</span>
                <div className="flex lg:flex-row flex-col justify-center">


                  <button className="bg-white mx-auto text-gray-800 px-4 py-2  rounded-lg m-2 w-64 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => setModal(true)}>Edit </button>
                  {details.status === false ? <button className="bg-white mx-auto text-gray-800 px-4 py-2  rounded-lg m-2 w-64 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => setResultModal(true)}>RESULTS</button> :

                    !data.announced ?
                      <button className="bg-white mx-auto text-gray-800 px-4 py-2  items-center m-2 w-64 rounded-lg  font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => setAddModal(true)}>Add Teams </button>
                      : ''}
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
                  className="text-red-300 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:tracking-wider"
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

                <select className="bg-green-600 h-12 mb-4 mt-8 bg-opacity-60 items-center flex text-xl justify-center w-full px-2" id="category" name="tournamenttype" onChange={handleChange}>
                  <option value={details.tournamenttype}  >{details.tournamenttype}</option>
                  <option className='text-black font-medium' value="League">League</option>
                  <option className='text-black font-medium' value="Nockout">Nockout</option>
                  <option className='text-black font-medium' value="Combo">Combo</option>
                </select>
                <>
                  <h1 className="text-lg font-semibold mt-6 ml-8 mb-2 ">Change Status</h1>
                  <select className="border-2 bg-transparent h-10 mb-8 text-yellow-300 bg-opacity-60 items-center flex text-xl justify-center w-44 text-center px-2 rounded-xl" id="category" name="status" onChange={handleChange}>
                    <option className='text-yellow-300 font-medium' value={true} >Ongoing</option>
                    <option className='text-red-600 font-medium' value={false}>Over</option>
                  </select>

                </>
                {details.status === true ? <h1 className="text-lg font-semibold mb-2 text-center text-blue-500">Now Ongoing</h1>
                  :
                  <h1 className="text-lg font-semibold mb-2 text-center text-red-400">Tournament over</h1>
                }
                <div className="flex justify-center">
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-32 font-semibold text-lg hover:text-green-400 hover:tracking-wider" onClick={() => savechanges()}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {addmodal && (
        <div className="inset-0 fixed flex justify-center items-center">
          <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
            <div className="mb-2">
              <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                <button
                  className="text-red-500 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider"
                  onClick={() => setAddModal(false)}
                >
                  Close
                </button>
                <h1 className="text-center font-bold text-xl text-yellow-300">
                  Add Team
                </h1>

                <h1 className="text-lg font-semibold">Club Name</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 flex items-center text-xl justify-center w-full px-2"
                  type='text' name='clubname' placeholder="Club Name"
                  onChange={Changes} />
                <h1 className="text-lg font-semibold">Location</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='text' name='location' placeholder='Location'
                  onChange={Changes} />

                <h1 className="text-lg font-semibold">Phone Number</h1>

                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='number' name='phonenumber' placeholder='phonenumber' min={0}
                  onChange={Changes} />

                <h1 className="text-lg font-semibold">Registration Number</h1>

                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='number' name='registration' placeholder='registration'
                  onChange={Changes} />

                <div className="flex justify-center">
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-40 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => handleAdd()}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {resultModal && (
          details.winners && details.runners ?
            <div className="inset-0 fixed flex justify-center items-center">
              <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
                <div className="mb-2">
                  <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                    <h1 className="text-center font-bold text-xl text-yellow-300 mb-4">
                      Results
                    </h1>
                    <h1 className="text-lg font-semibold text-center mt-2">WINNERS</h1>
                    <h1 className="text-xl font-semibold text-center text-green-300 border-2 ">{details?.winners}</h1>

                    <h1 className="text-lg font-semibold text-center mt-2">RUNNERS</h1>
                    <h1 className="text-xl font-semibold text-center text-green-300 border-2">{details?.runners}</h1>
                    <button
                      className="text-red-300 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:tracking-wider mt-4"
                      onClick={() => setResultModal(false)}
                    >
                      Close
                    </button>

                  </div>
                </div>
              </div>
            </div>
            :
            <div className="inset-0 fixed flex justify-center items-center">
              <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
                <div className="mb-2">
                  <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                    <button
                      className="text-red-300 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:tracking-wider"
                      onClick={() => setResultModal(false)}
                    >
                      Close
                    </button>
                    <h1 className='m-4 '>Results not found <span className='text-red-400'>!</span></h1>
                    <button className="bg-white mx-auto text-gray-800 px-4 py-2  rounded-lg m-2 w-60 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => setAddResultModal(true)}>ADD RESULTS </button>
                  </div>
                </div>
              </div>
            </div>
        )}

        {addResultModal && (
          <div className="inset-0 fixed flex justify-center items-center">
            <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
              <div className="mb-2">
                <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                  <button
                    className="text-red-300 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:tracking-wider"
                    onClick={() => setAddResultModal(false)}
                  >
                    Close
                  </button>
                  <h1 className="text-center font-bold text-xl text-yellow-300">
                    Add Results
                  </h1>

                  <h1 className="text-lg font-semibold">WINNERS</h1>
                  <select
                    className="bg-green-600 h-12 mb-4 mt-8 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                    id="winners"
                    name="winners"
                    onChange={handleResChange}
                  >
                    <option className='text-black font-medium' value=''>Select</option>
                    {teams.map((item) => (
                      <option key={item._id} className='text-black font-medium' value={item.teamname}>
                        {item.teamname}
                      </option>
                    ))}
                  </select>

                  <h1 className="text-lg font-semibold">RUNNERS</h1>
                  <select
                    className="bg-green-600 h-12 mb-4 mt-8 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                    id="runners"
                    name="runners"
                    onChange={handleResChange}
                  >
                    <option className='text-black font-medium' value=''>Select</option>
                    {teams.map((item) => (
                      <option key={item._id} className='text-black font-medium' value={item.teamname}>
                        {item.teamname}
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-center">
                    <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-32 font-semibold text-lg hover:text-green-400 hover:tracking-wider" onClick={() => saveResChanges()}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        )}
      </div>

    </div>
  )
}

export default TournamentShow