import React, { useState, useEffect } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';

import image from "../assets/images/logo/logo.png";
import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import groupimg from '../assets/images/player//bw2.avif'

import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import yellowimg from '../assets/images/player/yellowplayer.png'
import { clubApi } from '../utils/api';

function Matches() {
    const location = useLocation()
    const state = location.state
    const clubidof = state.clubid
    const statusof = state.status
     console.log(state,"fff")
     const [clubId,setClubId] = useState(clubidof)
     const [matches,setMatches] = useState([])
     const [status,setStatus] = useState(statusof)
    // const [count,setCount] = useState(0)


     console.log(clubId);
     useEffect(()=>{
        const find = async()=>{
            console.log(clubId);
     const { data } = await clubApi.post('/clubmatches', {clubId }, { withCredentials: true })
     console.log(data,"lkg");
     setMatches(data.matches)

        }
        find()
     },[])
  return (
    <div className="flex  items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})` }}>
    <div className="flex flex-col items-center justify-center h-full">
        <Navbar data='club'/>

        <h1 className='text-3xl text-center my-auto mt-20 font-medium text-blue-500'>Matches</h1>
        <div class="bg-white p-6 mt-2 shadow-md rounded-lg bg-opacity-80">

        <div className="md:w-[40rem] lg:w-[70rem] h-[44rem] relative  rounded p-12  overflow-y-auto bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${groupimg})` }}>
        
            {/* <div class="bg-white ">
              <div className=' flex justify-center ' > */}

                {/* <div className='h-12 bg-white w-96 text-center  md:fixed z-10 '>
                  <span className='text-black text-xl font-medium  '>Matches</span>
                </div> */}
              {/* </div>
              <div class="container mx-auto    justify-center ">
                <div class="mx-auto "> */}


                  {/* <div class="bg-white "> */}
                    {/* <div class="container mx-auto py-4 "> */}
                      <div class="mx-auto sm:w-6/12 lg:w-8/12 xl:w-[100%] ">
                        {(matches.length===0 || (status===true ? matches.every((item) => !item.matchstatus): matches.every((item) => item.matchstatus)))?
                        <h1 className='text-3xl text-red-500 font-medium text-center items-center'>No Matches Found !</h1>
                        :
                         <>
                        {matches?.map((item) => (
                         
                        (status===true? item.matchstatus:!item.matchstatus) &&(
                            <>
                          
                          <div class="mt-2 " key={item._id}>
                            <div class="relative flex flex-col justify-end overflow-hidden rounded-b-xl mb-4 ">
                              <div class="group relative flex cursor-pointer justify-between rounded-xl bg-red-400 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-black before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 bg-opacity-90">
                                <div class="relative  space-y-1 p-8">
                                <h4 class="text-lg text-green-300">{item.tournamentData.tournamentname}</h4>
                                  <h4 class="text-lg text-white">Match No :-  {item.matchnumber}</h4>
                                  <div class="relative h-20 text-white text-lg">
                                    <div className='flex'>
                                      <span class="transition duration-300  ">{item.firstteamData.teamname}</span>
                                      <span className='mx-2 text-yellow-300'>Vs</span>
                                      <span class="transition duration-300 ">{item.secondteamData.teamname}</span>
                                    </div>
                                    {/* <button href="" class="mt-10 mx-2 flex items-center gap-3 invisible absolute left-0 top-0 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0">
                                      <span>View now </span>
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -translate-x-4 transition duration-300 group-hover:translate-x-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                      </svg>
                                    </button> */}
                                  </div>
                                </div>
                                <img class="absolute bottom-2 right-6 w-[6rem] transition duration-300 group-hover:scale-[1.4]" src={yellowimg} alt="" />
                              </div>
                            </div>
                          </div>
                             </>
                         ) 
                         

                        ))} 
                        
                        </>
                        }
                      </div>
                    {/* </div> */}
                  </div>
                  {/* ... */}
                </div>
              {/* </div>
            </div>
          </div> */}
                  {/* </div> */}

    </div>
    {/* <Footer /> */}
  </div>
  )
}

export default Matches