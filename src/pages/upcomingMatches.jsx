import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Navbar from '../components/navbar/navbar';
import { clubApi, userApi } from '../utils/api';
import yellowimg from '../assets/images/player/yellowplayer.png'

function UpcomingMatches() {
    const location = useLocation();
    const isUser = location.state;

    const [matches, setMatches] = useState([])
    const [modal, setModal] = useState(false)
    const [itemData, setItemData] = useState('')



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await (isUser === 'club' ? clubApi : userApi).get(
                    '/upcoming',
                    { withCredentials: true }
                );
                console.log(data, "sssss");
                setMatches(data.upcoming)
            } catch (error) {
                console.error("Error occurred while fetching upcoming matches:", error);
            }
        };

        fetchData();
    }, []);

    const showHandle = (item)=>{
      setItemData(item)
      setModal(true)
    }

    return (
        <>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})`, filter: modal ? "blur(30px)" : "none" }}>
            <div className="flex flex-col items-center justify-center">
                <Navbar data={isUser} />
                {matches.length === 0 ? (
                    <div className='flex justify-center items-center'>
                        <h1 className='text-red-600 text-2xl'>No Matches Found</h1>
                    </div>
                ) : (
                    <div className="md:max-w-[80rem] w-full md:mt-12 mt-8 shadow-md rounded p-2 md:p-6 relative">
                        <h1 className='text-white text-2xl font-medium fixed top-12 left-1/2 transform -translate-x-1/2 z-20 mt-12'>Matches</h1>
                        <div className="container mx-auto">
                            <div className="mx-auto">
                                <div className="">
                                    <div className="container mx-auto py-6">
                                        <div className="mx-auto sm:w-12/12 lg:w-8/12 xl:w-[100%] mt-10  ">
                                            {matches.map((item) => (
                                                <div className="mt-2 " key={item._id}>
                                                    <div className="relative flex flex-col justify-end overflow-hidden rounded-b-xl pt-6">
                                                        <div className="group relative flex cursor-pointer justify-between rounded-xl bg-red-400 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-white before:opacity-0 before:transition before:duration-500 hover:before:opacity-100">
                                                            <div className="relative space-y-1 p-6">
                                                                <h4 className="text-lg text-white">Match No: {item.matchnumber}</h4>
                                                                <div className="relative h-20 text-white text-sm">
                                                                    <div className='flex'>
                                                                        <span className="transition duration-300 group-hover:invisible group-hover:opacity-0">{item.firstteam.teamname}</span>
                                                                        <span className='mx-2'>Vs</span>
                                                                        <span className="transition duration-300 group-hover:invisible group-hover:opacity-0">{item.secondteam.teamname}</span>
                                                                    </div>
                                                                    <button href="" class="mt-10 mx-2 flex items-center gap-3 invisible absolute left-0 top-0 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0" onClick={() =>{showHandle(item)}}>
                                            <span>View now </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -translate-x-4 transition duration-300 group-hover:translate-x-0" viewBox="0 0 20 20" fill="currentColor">
                                              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                          </button>
                                                                </div>
                                                            </div>
                                                            <img className="absolute bottom-2 right-6 w-[6rem] transition duration-300 group-hover:scale-[1.4]" src={yellowimg} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                
            </div>
        </div>


    {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50" >
          <div className="bg-white p-6 rounded-lg z-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Match No :- {itemData.matchnumber}</h2>
            <div class="group relative flex cursor-pointer justify-center rounded-xl bg-amber-200 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-amber-600 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 w-[40rem] h-[40rem]">
              <div class="relative  space-y-1 p-4">
                <div className='flex justify-center m-2'>
                  <span class="transition duration-300 text-center text-4xl font-semibold">{itemData.firstteam.teamname}</span>
                  <span className='mx-6 text-2xl'>Vs</span>
                  <span class="transition duration-300 text-center text-4xl font-semibold">{itemData.secondteam.teamname}</span>
                </div>
                <div className='flex justify-center m-2'>
                  <span class="transition duration-300 text-center text-xl font-semibold">(first team)</span>
                  <span className='mx-6 text-xl'></span>
                  <span class="transition duration-300 text-center text-xl font-semibold">(second team)</span>
                </div>
                <div className='pt-6'>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Date :- <span className='text-black text-xl'> {itemData.date}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Time :- <span className='text-black text-xl'> {itemData.time}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Tickets :- <span className='text-black text-xl'> {itemData.tickets}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">Tickets Fee :- <span className='text-black text-xl'> {itemData.ticketsfee}</span></h4>
                  <h4 class=" text-blue-400 font-medium text-xl justify-center text-center">status :- <span className='text-black text-xl'> {(itemData.matchstatus === true ? 'On Going' : 'Over')}</span></h4>


                  <div className='flex justify-center m-2'>
                    <span class="transition duration-300 text-center text-xl font-semibold">contact:{itemData.firstteam.phonenumber}</span>
                    <span className='mx-6 text-xl'></span>
                    <span class="transition duration-300 text-center text-xl font-semibold">contact:{itemData.secondteam.phonenumber}</span>
                  </div>
                  <div className='flex justify-center m-2'>
                    <span class="transition duration-300 text-center text-xl font-semibold">Score: {itemData.results.firstteamscore}</span>
                    <span className='mx-6 text-xl'></span>
                    <span class="transition duration-300 text-center text-xl font-semibold">Score: {itemData.results.secondteamscore}</span>
                  </div>

                  <div className='flex justify-center m-2'>
                    <span class="transition duration-300 text-center text-xl font-semibold">Scorers:[<span className='text-gray-400'> {(itemData.results?.firstteamscorers).map((item, index) => (<div key={index}> {item}</div>))}  </span>]</span>
                    <span className='mx-6 text-xl'></span>
                    <span class="transition duration-300 text-center text-xl font-semibold">Scorers:[<span className='text-gray-400'> {(itemData.results?.secondteamscorers).map((item, index) => (<div key={index}> {item}</div>))}  </span>]</span>
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
            
          </div>
        </div>
      )}
     </>
    );
    
    
      
}

export default UpcomingMatches





