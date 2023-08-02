import React, { useState, useEffect } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';

import image from "../assets/images/logo/logo.png";
import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import yellowimg from '../assets/images/player/yellowplayer.png'
import { clubApi, userApi } from '../utils/api';

function MatchesView() {
    const location = useLocation()
     const {data,isUser} = location.state
     console.log(data,"fff")
     console.log(isUser,"fff")

     const [tournament,setTournament] = useState(data)
     const [details,setDetails] = useState([])
     console.log(tournament._id);
     const id = tournament._id
     useEffect(() => {
        const find = async () => {
          console.log(tournament._id);
      
          try {
            const requestData = { id: tournament._id }; // Set the request data as an object
            const { data } = await (isUser === 'club' ? clubApi : userApi).post(
              '/tournamentmatches',
              requestData,
              { withCredentials: true }
            );
            console.log(data, "sssss");
            setDetails(data.details)
          } catch (error) {
            console.error("Error occurred while fetching tournament matches:", error);
          }
        };
      
        find();
      }, [tournament._id, isUser]);
      
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})` }}>
    <div className="flex flex-col items-center justify-center h-full">
        <Navbar data='club'/>
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
                        {/* {details.length===0?'':(
                            <> */}
                        {details.map((item) => (
                          <div class="mt-2 " key={item._id} >
                            <div class="relative flex flex-col justify-end overflow-hidden rounded-b-xl pt-6 ">
                              <div class="group relative flex cursor-pointer justify-between rounded-xl bg-amber-200 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-amber-600 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100">
                                <div class="relative  space-y-1 p-8">
                                  <h4 class="text-lg text-amber-900">Match No :- {item.matchnumber}</h4>
                                  <div class="relative h-20 text-amber-800 text-sm">
                                    <div className='flex'>
                                      <span class="transition duration-300 group-hover:invisible group-hover:opacity-0"></span>
                                      <span className='mx-2'>Vs</span>
                                      <span class="transition duration-300 group-hover:invisible group-hover:opacity-0"></span>
                                    </div>
                                    <button href="" class="mt-10 mx-2 flex items-center gap-3 invisible absolute left-0 top-0 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0">
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
                          {/* </>
                        )
                        } */}
                      </div>
                    </div>
                  </div>
                  {/* ... */}
                </div>
              </div>
            </div>
          </div>
    </div>
    {/* <Footer /> */}
  </div>
  )
}

export default MatchesView