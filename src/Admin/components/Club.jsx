import React, { useEffect, useState } from 'react';
import { adminApi } from '../../utils/api';

function Club() {
  const [clubDatas, setClubDatas] = useState([])
  // const [block, setBlock] = useState(false)

  useEffect(() => {
    const datafetch = async () => {
      const { data } = await adminApi.get('/club', { withCredentials: true })
      console.log(data, "lklklklkk");
      setClubDatas(data.club)
    }
    datafetch()
  }, [])
  console.log(clubDatas, "jijijij");


  const handleBlock = async(item,status)=>{
    const { data } = await adminApi.post('/block',item,{ withCredentials: true })
    console.log(data,"jjj");
    setClubDatas(data.club)
  }

  return (
    <>
    <div className='mx-auto mt-32 bg-white md:h-[42rem] h-[32rem] overflow-y-auto'>

       <div className='justify-center text-center sticky top-0 bg-white z-10 p-4'> {/* Apply the sticky styles here */}
          <h1 className=' text-blue-700 text-center font-bold text-2xl'>Clubs</h1>
        </div>
      <div >
        {clubDatas.map((item, index) => (
          <div className="justify-center items-center" key={index}>
            <div className='overflow-x-auto'>
              <div>
                <div className='flex bg-green-300 h-16 xl:w-[70rem] md:w-[30rem] lg:w-[40rem] sm:w-[20rem] m-2 mx-2'>
                  {/* <div className='flex'>  */}
                  <div className=' overflow-hidden'>
                    <h1 className='m-4 '>{index+1}</h1>
                  </div>
                  <div className=' overflow-hidden w-[20%]'>
                    <h1 className='m-4 '>{item.clubname}</h1>
                  </div>
                  <div className=' overflow-hidden w-[55%]'>
                    <h1 className='m-4 '>{item.email}</h1>
                    {/* </div> */}
                  </div>
                  <div className=' w-[25%]'>
                    {
                    item.block===false?<button className='m-3 h-9 bg-red-500 w-[80%] ' onClick={()=>{handleBlock(item,'block')}}>Block</button>
                    :
                    <button className='m-3 h-9 bg-yellow-500 w-[82%] ' onClick={()=>{handleBlock(item,'unblock')}}>UnBlock</button>
                    }
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
      </div>

    </>
  );
}

export default Club;
