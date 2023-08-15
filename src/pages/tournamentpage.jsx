import React, { useEffect, useState } from 'react'
import playerimg from '../assets/images/player/portrait.jpg'
import orgimg from '../assets/images/player/orgimg.avif'
import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Navbar from '../components/navbar/navbar';
import { useLocation, useNavigate } from 'react-router-dom'
import { clubApi } from '../utils/api'
import { userApi } from '../utils/api'
import Loader from '../components/loader/loader';

function TournamentPage() {
  const location = useLocation()
  const Navigate = useNavigate()
  const isUser = location.state
  const [value, setValue] = useState([])
  const [modal, setModal] = useState(false)
  const [data, setData] = useState('')
  const [loader, setLoader] = useState(true)
  const [resultModal, setResultModal] = useState(false)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await (isUser === 'user' ? userApi : clubApi).get('/tournament', { withCredentials: true });
        setValue(data.details)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const viewData = async (data) => {
    setData(data)
    setModal(true)
  }

  const matches = () => {
    const path = isUser === 'user' ? '/user/matchesview' : '/club/matchesview'
    Navigate(path, { state: { data: data, isUser: isUser } })
  }

  const winners = () => {
    setResultModal(true)
  }

  return (
    <>
      {setTimeout(() => { setLoader(false) }, 500)}
      {loader ? <Loader /> :
        <div className="min-h-screen relative">
          <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})`, filter: modal ? "blur(30px)" : "none" }}>
            <Navbar data={isUser} />
            <div className="container mx-auto px-4  pb-12">
              <h1 className="text-3xl font-bold tracking-tight text-center pt-16 pb-6 text-black">Tournaments</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                {value.length > 0 ? (
                  value.map((item, index) => (
                    <div className="flex flex-col rounded-lg bg-white shadow-lg" key={index}>
                      <img
                        src={playerimg}
                        alt=""
                        className="object-cover object-bottom h-52 rounded-t-lg"
                      />
                      <div className="p-4 flex flex-col flex-grow">
                        <p className="font-medium text-gray-800">{item.tournamenttype}</p>
                        <h2 className="mt-2 text-xl font-semibold">{item.tournamentname}</h2>
                        {item.status ? (
                          <div className="text-xl font-semibold ml-auto h-8 w-8 bg-green-500 rounded-2xl"></div>
                        ) : (
                          <div className="text-xl font-semibold ml-auto h-8 w-8 bg-red-500 rounded-2xl"></div>
                        )}
                        <div className="flex-grow"></div>
                        <button
                          className="inline-block px-4 py-2 mt-4 rounded-lg bg-gray-800 text-white text-sm font-medium"
                          onClick={() => { viewData(item) }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-red text-center font-medium text-3xl justify-center text-red-700">No Tournaments found</h1>
                )}
              </div>
            </div>
          </div>

          <div style={{ filter: resultModal ? "blur(30px)" : "none" }}>
            {modal && (
              <div className="fixed inset-0 flex justify-center items-center h-screen z-50">
                <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
                  <div className="mb-2">
                    <div
                      className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg relative"
                      style={{ backgroundImage: `url(${orgimg})` }}
                    >
                      <div className="flex justify-self-start">
                        <button className="bg-black text-gray-100 px-4 py-2 mb-4 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => setModal(false)}>close</button>
                      </div>
                      <h1 className='text-lg font-semibold'>Tournament</h1>
                      <span className="bg-green-800 h-12 mb-4 bg-opacity-90 flex items-center text-xl justify-center">{data.tournamentname}</span>
                      <h1 className='text-lg font-semibold'>Location</h1>
                      <span className="bg-green-800 h-12 mb-4 bg-opacity-90 items-center flex text-xl justify-center">{data.location}</span>
                      <h1 className='text-lg font-semibold'>Category</h1>
                      <span className="bg-green-800 h-12 mb-4 bg-opacity-90 items-center flex text-xl justify-center">{data.tournamenttype}</span>
                      <h1 className='text-lg font-semibold'>Status</h1>
                      <span className="bg-green-800 h-12 mb-4 bg-opacity-90 items-center flex text-xl justify-center">{data.status === true ? 'On going' : 'over'}</span>
                      <h1 className='text-lg font-semibold'>Conducted By</h1>
                      <span className="bg-green-800 h-12 mb-4 bg-opacity-90 items-center flex text-xl justify-center">{data.club.clubname}</span>
                      <div className="flex justify-center">
                        {data.status === true ?
                          <button className="bg-black text-gray-100 px-4 py-2 m-2 rounded-lg w-48 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => matches()}>Show Matches</button>
                          :
                          <button className="bg-black text-gray-100 px-4 py-2 m-2 rounded-lg w-48 font-semibold text-lg hover:text-red-400 hover:tracking-wider" onClick={() => winners()}>Show Winners</button>

                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {resultModal && (
            data.winners && data.runners ?
              <div className="inset-0 fixed flex justify-center items-center">
                <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
                  <div className="mb-2">
                    <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                      <h1 className="text-center font-bold text-xl text-yellow-300 mb-4">
                        Results
                      </h1>
                      <h1 className="text-lg font-semibold text-center mt-2">WINNERS</h1>
                      <h1 className="text-xl font-semibold text-center text-green-300 border-2 ">{data?.winners}</h1>

                      <h1 className="text-lg font-semibold text-center mt-2">RUNNERS</h1>
                      <h1 className="text-xl font-semibold text-center text-green-300 border-2">{data?.runners}</h1>
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
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      }
    </>
  )
}

export default TournamentPage