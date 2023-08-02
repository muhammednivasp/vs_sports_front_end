import React,{useEffect, useState} from 'react';
import { adminApi } from '../../utils/api';

function Table() {
  const [clubDatas,setClubDatas] = useState([])
  useEffect(()=>{
    const datafetch = async()=>{
    const { data } = await adminApi.get('/club', { withCredentials: true })
    console.log(data,"lklklklkk");
    setClubDatas(data.club)
    }
    datafetch()
  },[])
  console.log(clubDatas,"jijijij");

  return (
    <div>
     <h1 className='m-4 text-blue-300 mt-4 text-center'>Clubs</h1>
     {clubDatas.map((item, index) => (
  <div className="justify-center items-center" key={index}>
      <div className='overflow-x-auto'>
        <div>
          <div className='flex bg-green-300 h-20 xl:w-[70rem] md:w-[30rem] lg:w-[40rem] sm:w-[20rem] m-4 mx-12'>
            {/* <div className='flex'>  */}
            <div className=' overflow-hidden w-[30%]'>
              <h1 className='m-4 '>{item.clubname}</h1>
            </div>
            <div className=' overflow-hidden w-[45%]'>
              <h1 className='m-4 '>{item.email}</h1>
            {/* </div> */}
            </div>
            <div className=' w-[25%]'>
              <button className='m-2 h-10 bg-red-500 w-[80%] '>Block</button>
            </div>


          </div>
        </div>
        {/* <table className="table-auto ">
            <thead>
              <tr>
                <th className="px-80 py-2">ID</th>
                <th className="px-80 py-2">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 md:w-1/3 text-center">dfgerggr</td>
                <td className="border px-4 py-2 md:w-1/3 text-center"><button className='w-32 h-10 bg-yellow-400 rounded-lg border-2 border-black'>Block</button></td>
              </tr>
            </tbody>
          </table> */}
      </div>
    </div>
  ))}
  </div>
  );
}

export default Table;
