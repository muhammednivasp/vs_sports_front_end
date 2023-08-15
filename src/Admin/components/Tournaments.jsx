import React, { useEffect, useState } from 'react';
import { adminApi } from '../../utils/api';


function Tournaments() {

  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    const datafetch = async () => {
      const { data } = await adminApi.get('/tournaments', { withCredentials: true })
      setTournaments(data.Tournamentsdata)
    }
    datafetch()
  }, [])

  const handleBlock = async (item, status) => {
    const { data } = await adminApi.post('/tournaments', item, { withCredentials: true })
    setTournaments(data.tournaments)
  }
  return (
    <>
      <div className='mx-auto mt-32 bg-white md:h-[42rem] h-[32rem] overflow-y-auto'>
        <div className='justify-center text-center sticky top-0 bg-white z-10 p-4'> {/* Apply the sticky styles here */}
          <h1 className=' text-blue-700 text-center font-bold text-2xl'>Tournaments</h1>
        </div>
        <div >
          {tournaments.map((item, index) => (
            <div className="justify-center items-center" key={index}>
              <div className='overflow-x-auto'>
                <div>
                  <div className='flex bg-green-300 h-16 xl:w-[70rem] md:w-[30rem] lg:w-[40rem] sm:w-[20rem] m-2 mx-2'>
                    <div className=' overflow-hidden'>
                      <h1 className='m-2 mt-5'>{index + 1}</h1>
                    </div>
                    <div className=' overflow-hidden w-[32%]'>
                      <h1 className='m-4 mt-5 text-sm'>{item.tournamentname}</h1>
                    </div>
                    <div className=' overflow-hidden w-[22%]'>
                      <h1 className='m-3 mt-5 text-sm'>{item.tournamenttype}</h1>
                    </div>
                    <div className=' overflow-hidden w-[20%]'>
                      <h1 className='m-3 mt-5 text-sm'>{item.club.clubname}</h1>
                    </div>
                    <div className=' w-[26%]'>
                      {
                        item.block === false ? <button className='m-3 h-9 bg-red-500 w-[80%] ' onClick={() => { handleBlock(item, 'block') }}>Block</button>
                          :
                          <button className='m-3 h-9 bg-yellow-500 w-[82%] ' onClick={() => { handleBlock(item, 'unblock') }}>UnBlock</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Tournaments