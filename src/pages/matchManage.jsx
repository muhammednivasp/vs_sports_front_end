import React, { useEffect, useState } from 'react';
import { DateTimePicker } from 'react-rainbow-components';
import image from '../assets/images/logo/logo.png';
import yellowimg from '../assets/images/player/yellowplayer.png';
import bwimg from '../assets/images/player/bw1.jpg';
import dual from '../assets/images/player/dual.avif'
import bgb from '../assets/images/player/bgb.jpg'
import baby from '../assets/images/player/baby.jpg'
import bgimage from '../assets/images/bg/backgroundvssports.jpg';
import Navbar from '../components/navbar/navbar';
import { useLocation } from 'react-router-dom';
import { clubApi } from '../utils/api';
import toast from 'react-hot-toast'

function MatchManage() {
  const location = useLocation();
  const datas = location.state;
  const [state, setState] = useState(datas)
  const [teams, setTeams] = useState([])
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [editMatchNumber, setEditMatchNumber] = useState(1);

  const [matchData, setMatchData] = useState({
    matchnumber: 1,
    date: new Date(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    firstteamid: '',
    secondteamid: '',
    matchstatus: true,
    tournament: state._id,
    results: {
      firstteamscore: 0,
      firstteamscorers: [],
      secondteamscore: 0,
      secondteamscorers: [],
    },
    tickets: 0,
    ticketsfee: 0
  });

  const [matchEditData, setMatchEditData] = useState({
    matchnumber: 1,
    date: new Date(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    firstteamid: '',
    secondteamid: '',
    matchstatus: true,
    tournament: state._id,
    results: {
      firstteamscore: 0,
      firstteamscorers: [],
      secondteamscore: 0,
      secondteamscorers: [],
    },
    tickets: 0,
    id: '',
    ticketsfee: 0
  });

  useEffect(() => {
    const currentDate = new Date();
    const selectedDate = matchData.date;
    const selectedTime = matchData.time; // Use matchData.time instead of selectedTime
    const dateTime = new Date(selectedDate);
    const timeArray = selectedTime.split(':');
    dateTime.setHours(timeArray[0]);
    dateTime.setMinutes(timeArray[1]);

    const isOver = currentDate > dateTime;
    setIsMatchOver(isOver); // Set the correct value for isMatchOver state
  }, [matchData.date, matchData.time]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { matchnumber, firstteamid, secondteamid, date, time } = matchData;
      const timeParts = time.split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const selectedTime = new Date(date);
      selectedTime.setHours(hours);
      selectedTime.setMinutes(minutes);
      if (matchnumber <= 0) {
        toast.error('Match Number should be greater than 1');
        return;
      }
      if (firstteamid === secondteamid) {
        toast.error('Each Team Should be Different');
        return;
      }
      if (isMatchOver) {
        setMatchData({ ...matchData, matchstatus: false });
      }
      const { data } = await clubApi.post(
        '/matchpost',
        {
          ...matchData,
          date: new Date(date), // Convert the date to a valid date object
          time: selectedTime, // Use the converted time
        },
        { withCredentials: true }
      );
      toast.success(data.message);
      setMatch(data.details)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const edit = async (item) => {
    setMatchEditData({
      ...matchEditData,
      matchnumber: item.matchnumber,
      date: new Date(item.date),
      time: new Date(item.time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      firstteamid: item.firstteam._id,
      secondteamid: item.secondteam._id,
      id: item._id
    });
    setEditModal(true);
  };

  const handleEdit = async (e) => {
    try {
      const { matchnumber, firstteamid, secondteamid, date, time, tickets, ticketsfee } = matchEditData;
      const timeParts = time.split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const selectedTime = new Date(date);
      selectedTime.setHours(hours);
      selectedTime.setMinutes(minutes);

      if (matchnumber <= 0) {
        toast.error('Match Number should be greater than 1');
        return;
      }
      if (firstteamid === secondteamid) {
        toast.error('Each Team Should be Different');
        return;
      }
      if (isMatchOver) {
        setMatchEditData({ ...matchEditData, matchstatus: false });
      }
      const { data } = await clubApi.patch(
        '/editmatchpost',
        {
          ...matchEditData,
          date: new Date(date), // Convert the date to a valid date object
          time: selectedTime, // Use the converted time
        },
        { withCredentials: true }
      );
      toast.success(data.message);
      setMatch(data.details)
      setEditModal(false)
      setModal(false)

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const [match, setMatch] = useState([])
  useEffect(() => {
    const matchfind = async () => {
      const { data } = await clubApi.post('/matches', { ...state }, { withCredentials: true })
      setMatch(data.finding)
    }
    matchfind()
  }, [matchData, state, isMatchOver])

  const [modal, setModal] = useState(false)
  const [data, setData] = useState('')
  const [item, setItem] = useState('')

  const matchsetup = (item) => {
    const dateString = '2023-07-25T06:15:25.900Z';
    const dateObj = new Date(dateString);
    const datePart = dateObj.toISOString().slice(0, 10); // Get the date part (YYYY-MM-DD)
    const timePart = dateObj.toISOString().slice(11, 19); // Get the time part (HH:mm:ss)
    setItem(item)
    setData({ ...item, date: datePart, time: timePart })
    setScore(item.results?.firstteamscore)
    setScorers(item.results?.firstteamscorers)
    setSecondScore(item.results?.secondteamscore)
    setSecondScorers(item.results?.secondteamscorers)
    setModal(true)
  }

  const [editModal, setEditModal] = useState(false)

  useEffect(() => {
    try {
      const teamget = async () => {
        const { data } = await clubApi.post('/teamget', { ...state }, { withCredentials: true })
        setTeams(data.teams)
      }
      teamget()
    } catch (err) {
      console.log(err);
    }
  }, [modal, editModal, matchData])

  const [team, setTeam] = useState('')
  const changeScoreDetails = async (team) => {
    setTeam(team)
    setScoreModal(true)
  }

  const [values, setValues] = useState('')
  const [score, setScore] = useState('')
  const [scorers, setScorers] = useState([])
  const [secondScore, setSecondScore] = useState('')
  const [secondScorers, setSecondScorers] = useState([])

  const handleChange = (e) => {
    const { value } = e.target;
    setValues(value);
  };

  const onSubmitScorer = () => {
    {
      team === 'first' ?
        setScorers([...scorers, values]) :
        setSecondScorers([...secondScorers, values])
    }
    setValues("")
  };

  const scoreChange = (e) => {
    const { value } = e.target;
    team === 'first' ? setScore(value) : setSecondScore(value);
  };
  const [scoreModal, setScoreModal] = useState(false)
  const submitScore = async () => {
    const response = await clubApi.post('/scorechange', (team === 'first' ? { id: data._id, score: score, scorers: scorers, team: team } : { id: data._id, score: secondScore, scorers: secondScorers, team: team }), { withCredentials: true })
    let newData = response.data.matchResults
    setData(newData)
    setScoreModal(false)
  }

  const clearAll = async () => {
    const response = await clubApi.post('/scorechange', (team === 'first' ? { id: data._id, score: 0, scorers: [], team: team } : { id: data._id, score: 0, scorers: [], team: team }), { withCredentials: true })
    let newData = response.data.matchResults
    setData(newData)
    setScoreModal(false)
    setScore('')
    setScorers([])
    setSecondScore(0)
    setSecondScorers([])
  }

  return (
    <div className="min-h-screen relative">
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})`, filter: modal ? "blur(30px)" : "none" }}>
        <Navbar data="club" />

        <div className="flex flex-col xl:flex-row mt-12" >
          <form className="md:w-[40rem] md:h-[45rem] mt-12 bg-cover bg-center bg-no-repeat shadow-md rounded p-16 m-2" onSubmit={handleSubmit} style={{ backgroundImage: `url(${bwimg})` }} >
            <div className='justify-center flex'>
              <h2 className="text-2xl font-bold mb-6 text-emerald-500">Add Match Details</h2>
            </div>
            <div className="mb-4">
              <label className="block text-pink-600 text-lg font-medium mb-2 text-right" htmlFor="matchnumber">
                Match Number
              </label>
              <input
                type="number"
                id="matchnumber"
                name="matchnumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                value={matchData.matchnumber}
                min={1}
                onChange={(e) => setMatchData({ ...matchData, matchnumber: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-pink-600 text-lg font-medium mb-2 text-right" htmlFor="date">
                Match Date
              </label>
              <DateTimePicker
                id="date"
                value={matchData.date}
                onChange={(value) => setMatchData({ ...matchData, date: value })}
                formatStyle="large"
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-pink-600 text-lg font-medium mb-2 text-right" htmlFor="firstteam">
                First Team
              </label>
              <select
                id="firstteam"
                name="firstteam"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                value={matchData.firstteamid}
                onChange={(e) => setMatchData({ ...matchData, firstteamid: e.target.value })}
                required
              >
                <option value=''>Select Team</option>
                {teams.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.teamname}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-pink-600 text-lg font-medium mb-2 text-right" htmlFor="secondteam">
                Second Team
              </label>
              <select
                id="secondteam"
                name="secondteam"
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline text-black"
                value={matchData.secondteamid}
                onChange={(e) => setMatchData({ ...matchData, secondteamid: e.target.value })}
                required
              >
                <option value=''>Select Team</option>
                {teams.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.teamname}
                  </option>
                ))}

              </select>
            </div>

            <div className="mb-4">
              <label className="block text-pink-600 text-lg font-medium mb-2 text-right" htmlFor="matchnumber">
                Available Tickets
              </label>
              <input
                type="number"
                id="tickets"
                name="tickets"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                value={matchData.tickets}
                min={0}
                onChange={(e) => setMatchData({ ...matchData, tickets: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-pink-600 text-lg font-medium mb-2 text-right" htmlFor="matchnumber">
                Ticket Fee
              </label>
              <input
                type="number"
                id="ticketsfee"
                name="ticketsfee"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                value={matchData.ticketsfee}
                min={0}
                onChange={(e) => setMatchData({ ...matchData, ticketsfee: e.target.value })}
                required
              />
            </div>


            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
              >
                Add Match
              </button>
            </div>
          </form>

          <div className="md:w-[40rem] lg:w-[40rem] h-[45rem]  bg-white shadow-md rounded p-10 md:mt-12 overflow-y-auto mt-6">
            <div class="bg-white ">
              <div className=' flex justify-center ' >

                <div className='h-12 bg-white w-96 text-center  md:fixed z-10 '>
                  <span className='text-black text-xl font-medium  '>Matches</span>
                </div>
              </div>
              <div class="container mx-auto    justify-center ">
                <div class="mx-auto ">


                  <div class="bg-white ">
                    <div class="container mx-auto py-12 ">
                      <div class="mx-auto sm:w-6/12 lg:w-8/12 xl:w-[100%] ">

                        {(match.length === 0) ? <>
                          <h1 className='text-3xl text-red-500 font-medium text-center items-center'>No Matches Found !</h1>
                          <h1 className='text-xl text-blue-500 font-medium text-center items-center'>Please Add Matches</h1>
                        </>
                          :
                          <>

                            {match.map((item) => (
                              <div class="mt-2 " key={item._id}>
                                <div class="relative flex flex-col justify-end overflow-hidden rounded-b-xl pt-6 ">
                                  <div class="group relative flex cursor-pointer justify-between rounded-xl bg-amber-200 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-amber-600 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100">
                                    <div class="relative  space-y-1 p-8">
                                      <h4 class="text-lg text-amber-900">Match No :-  {item.matchnumber}</h4>
                                      <div class="relative h-20 text-amber-800 text-sm">
                                        <div className='flex'>
                                          <span class="transition duration-300 group-hover:invisible group-hover:opacity-0 text-2xl">{item.firstteam.teamname}</span>
                                          <span className='mx-2 text-xl'>Vs</span>
                                          <span class="transition duration-300 group-hover:invisible group-hover:opacity-0 text-2xl">{item.secondteam.teamname}</span>
                                        </div>
                                        <button href="" class="mt-10 mx-2 flex items-center gap-3 invisible absolute left-0 top-0 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0" onClick={() => { matchsetup(item) }}>
                                          <span>View now </span>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -translate-x-4 transition duration-300 group-hover:translate-x-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                    <img class="absolute bottom-2 right-6 w-[6rem] transition duration-300 group-hover:scale-[1.4]" src={yellowimg} alt="" />
                                  </div>
                                </div>


                              </div>
                            ))}
                          </>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg z-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Match No :- {data.matchnumber}</h2>
            <div class="group relative flex cursor-pointer justify-center rounded-xl bg-amber-200 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-amber-600 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 w-[40rem] h-[40rem]">
              <div class="relative  space-y-1 p-4">
                <div className='flex justify-center m-2'>
                  <span class="transition duration-300 text-center text-4xl font-semibold">{data.firstteam.teamname}</span>
                  <span className='mx-6 text-2xl'>Vs</span>
                  <span class="transition duration-300 text-center text-4xl font-semibold">{data.secondteam.teamname}</span>
                </div>
                <div className='flex justify-center m-2'>
                  <span class="transition duration-300 text-center text-xl font-semibold">(first team)</span>
                  <span className='mx-6 text-xl'></span>
                  <span class="transition duration-300 text-center text-xl font-semibold">(second team)</span>
                </div>
                <div className='pt-6'>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Date :- <span className='text-black text-xl'> {data.date}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Time :- <span className='text-black text-xl'> {data.time}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Tickets :  <span className='text-black text-xl'> {data.tickets}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Tickets Fee :  <span className='text-black text-xl'> {data.ticketsfee}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">status :- <span className='text-black text-xl'> {(data.matchstatus === true ? 'On Going' : 'Over')}</span></h4>


                  <div className='flex justify-center m-2'>
                    <span class="transition duration-300 text-center text-xl font-semibold">contact:{data.firstteam.phonenumber}</span>
                    <span className='mx-6 text-xl'></span>
                    <span class="transition duration-300 text-center text-xl font-semibold">contact:{data.secondteam.phonenumber}</span>
                  </div>
                  <div className='flex justify-center m-2'>
                    <span class="transition duration-300 text-center text-xl font-semibold">Score: {data.results.firstteamscore}</span>
                    <span className='mx-6 text-xl'></span>
                    <span class="transition duration-300 text-center text-xl font-semibold">Score: {data.results.secondteamscore}</span>
                  </div>

                  <div className='flex justify-center m-2'>
                    <span class="transition duration-300 text-center text-xl font-semibold">Scorers:[<span className='text-gray-400'> {(data.results?.firstteamscorers).map((item, index) => (<div key={index}> {item}</div>))}  </span>]</span>
                    <span className='mx-6 text-xl'></span>
                    <span class="transition duration-300 text-center text-xl font-semibold">Scorers:[<span className='text-gray-400'> {(data.results?.secondteamscorers).map((item, index) => (<div key={index}> {item}</div>))}  </span>]</span>
                  </div>
                  <div className='flex justify-center m-2'>
                    <button class="text-center text-xl font-semibold border-2 border-cyan-500 rounded-full mt-2 p-2 text-white hover:bg-cyan-500" onClick={() => changeScoreDetails('first')}>Change Score</button>
                    <span className='mx-6 text-xl'></span>
                    <button class="text-center text-xl font-semibold border-2 border-cyan-500 rounded-full mt-2 p-2 text-white hover:bg-cyan-500" onClick={() => changeScoreDetails('second')}>Change Score</button>

                  </div>
                </div>
              </div>
              <img class="absolute bottom-2 right-6 w-[6rem] transition duration-300 group-hover:scale-[1.4]" src={yellowimg} alt="" />
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setModal(false)}
            >
              Close
            </button>
            <button
              className="mt-4 m-2 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => edit(item)}
            >
              Edit
            </button>
          </div>
        </div>
      )}


      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 " >
          <div className="bg-blue-300 p-8 rounded-lg z-10  " >
            <div className="md:w-[40rem] md:h-[45rem] mt-12  shadow-md rounded p-20 m-2 bg-cover bg-no-repeat bg-center justify-center" style={{ backgroundImage: `url(${baby})` }}>
              <div className='justify-center flex'>
                <h2 className="text-2xl font-bold mb-4">Add Match Details</h2>
              </div>
              <div className="mb-4">
                <label className="block text-black text-lg font-medium mb-2" htmlFor="matchnumber">
                  Match Number
                </label>
                <input
                  type="number"
                  id="matchnumber"
                  name="matchnumber"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={matchEditData.matchnumber}
                  min={1}
                  onChange={(e) => setMatchEditData({ ...matchEditData, matchnumber: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-lg font-medium mb-2" htmlFor="date">
                  Match Date
                </label>
                <DateTimePicker
                  id="date"
                  value={matchEditData.date}
                  onChange={(value) => setMatchEditData({ ...matchEditData, date: value })}
                  formatStyle="large"
                  className="w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-lg font-medium mb-2" htmlFor="firstteam">
                  First Team
                </label>
                <select
                  id="firstteam"
                  name="firstteam"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={matchEditData.firstteamid}
                  onChange={(e) => setMatchEditData({ ...matchEditData, firstteamid: e.target.value })}
                  required
                >
                  <option value=''>Select Team</option>
                  {teams.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.teamname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-black text-lg font-medium mb-2" htmlFor="secondteam">
                  Second Team
                </label>
                <select
                  id="secondteam"
                  name="secondteam"
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline text-black"
                  value={matchEditData.secondteamid}
                  onChange={(e) => setMatchEditData({ ...matchEditData, secondteamid: e.target.value })}
                  required
                >
                  <option value=''>Select Team</option>
                  {teams.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.teamname}
                    </option>
                  ))}

                </select>
              </div>

              <div className="mb-4">
                <label className="block text-black text-lg font-medium mb-2" htmlFor="secondteam">
                  Tickets available
                </label>
                <input
                  type="number"
                  id="tickets"
                  name="tickets"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  value={matchEditData.tickets}
                  min={0}
                  onChange={(e) => setMatchEditData({ ...matchEditData, tickets: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-black text-lg font-medium mb-2" htmlFor="secondteam">
                  Ticket Fee
                </label>
                <input
                  type="number"
                  id="ticketsfee"
                  name="ticketsfee"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  value={matchEditData.ticketsfee}
                  min={0}
                  onChange={(e) => setMatchEditData({ ...matchEditData, ticketsfee: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-300 hover:bg-blue-700 text-blue-600  hover:text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline mt-2"
                  onClick={() => handleEdit()}>
                  Submit
                </button>
              </div>

            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setEditModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}


      {scoreModal &&
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg z-10 flex flex-col p-2 text-center">
            <h2 className='text-xl font-medium text-green-500 m-2'>First Team Score Details</h2>

            <div className="bg-red-300 p-12 rounded-lg justify-center">
              <div>
                <input
                  type="text"
                  value={values}
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 lg:w-96 xl:w-112 text-center"
                  placeholder="Enter scorer name"
                  onChange={handleChange} />
              </div>

              <div className='mt-2'>
                <button
                  className="px-4 py-2 bg-none border-2 hover:bg-green-400 text-black font-semibold rounded-lg w-full md:w-80 lg:w-96 xl:w-112 "
                  onClick={() => onSubmitScorer()}>
                  Add
                </button>
              </div>

              <div>
                <div
                  type="text"
                  className="px-4 py-2 border bg-blue-200 border-gray-300 rounded-lg w-full md:w-80 lg:w-96 xl:w-112 mt-2 h-12 overflow-y-auto text-center"
                  placeholder=""
                >
                  {(team === 'first' ? scorers.length === 0 : secondScorers.length === 0) ? <h3 className='text-red-700'>No Scorers !</h3> : (
                    <>
                      {(team === 'first' ? scorers : secondScorers).map((item, index) => (
                        <div className='border-2 border-blue-500 m-2' key={index}>
                          <h2 className='text-black'>{index + 1}.{item}</h2>
                        </div>
                      ))}

                    </>
                  )
                  }
                </div>
              </div>

            </div>
            <div className='justify-center p-12'>
              <div>
                <input
                  type="number"
                  value={team === 'first' ? score : secondScore}
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-60 lg:w-60 xl:w-100 text-center"
                  placeholder="Enter Score"
                  onChange={scoreChange} />
              </div>
              <div className='mt-2 flex flex-col'>
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg w-full md:w-80 lg:w-96 xl:w-112"
                  onClick={submitScore}>
                  Submit
                </button>
                {(team === 'first' ? scorers.length : secondScorers.length) && <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg w-full md:w-80 lg:w-96 xl:w-112 mt-2"
                  onClick={clearAll}>
                  clear all
                </button>}
              </div>
              <div className='mt-2'>
                <button
                  className="px-4 py-2 border-2 hover:bg-yellow-600 text-yellow-600 hover:text-white font-semibold rounded-lg w-full md:w-60 lg:w-60 xl:w-100"
                  onClick={() => setScoreModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>

  );
}

export default MatchManage;


