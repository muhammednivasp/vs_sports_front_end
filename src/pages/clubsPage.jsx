import React, { useEffect, useState } from 'react';
import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Navbar from '../components/navbar/navbar';
import { useLocation } from 'react-router-dom';
import { userApi,clubApi } from '../utils/api';


function ClubsPage() {

  const [datas,setDatas] = useState([])

const location = useLocation()
const isUser = location.state
// setUser(isUser)
console.log(isUser,"joi");

  useEffect(()=>{
    console.log(isUser,clubApi,"effe");
    const calling = ()=>{
      try {
       (isUser==='club'?clubApi:userApi).get('/clubs',{withCredentials:true}).then((res)=>{
          console.log(res.data.details,"datas");
          setDatas(res.data.details)

        }).catch((err)=>console.log(err))
      } catch (error) {
        
      }
    
    }
    calling()
  },[])

  return (
    <section className="text-gray-600 body-font min-h-screen pt-32 justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${bgimage})` }}>
    <Navbar data={isUser} />
    <div>
      <h1 className="text-3xl font-bold text-center text-white">Clubs</h1>
    </div>
    <div className="container mx-auto flex flex-wrap justify-center gap-4 py-12" >
      {datas.map((item) => (
        <div className="  hover:scale-105 duration-500 mx-2 my-4 " key={item.id}  style={{ width: '600px', height: '200px' }}>
          <div className="flex items-center justify-between p-6 rounded-lg bg-white shadow-indigo-50 shadow-md">
            <div className="items-center text-center">
              <h2 className="text-gray-900 text-xl font-bold text-center ">{item.clubname.toUpperCase()}</h2>
              <h3 className="mt-2 text-xl font-bold text-yellow-500 text-left"><span className='text-black'>Email ID : </span>{item.email}</h3>
              <h3 className="mt-2 text-xl font-bold text-yellow-500 text-left"><span className='text-black'>Registration No : </span>{item.registration}</h3>
              <h3 className="mt-2 text-xl font-bold text-yellow-500 text-left"><span className='text-black'>Location : </span>{item.location}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  );
}

export default ClubsPage;
