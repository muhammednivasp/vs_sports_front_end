import React, { useEffect, useState } from 'react';
import { adminApi } from '../../utils/api';

function Users() {

  const [userDatas, setUserDatas] = useState([])

  useEffect(() => {
    const datafetch = async () => {
      const { data } = await adminApi.get('/user', { withCredentials: true })
      setUserDatas(data.user)
    }
    datafetch()
  }, [])

  const handleBlock = async (item, status) => {
    const { data } = await adminApi.post('/userblock', item, { withCredentials: true })
    setUserDatas(data.user)
  }

  return (
    <>
      <div className='mx-auto mt-32 bg-white md:h-[42rem] h-[32rem] overflow-y-auto'>
        <div>

          <div className='justify-center text-center sticky top-0 bg-white z-10 p-4'> {/* Apply the sticky styles here */}
            <h1 className=' text-blue-700 text-center font-bold text-2xl'>Users</h1>
          </div>

          <div >
            {userDatas.map((item, index) => (
              <div className="justify-center items-center" key={index}>
                <div className='overflow-x-auto'>
                  <div>
                    <div className='flex bg-green-300 h-16 xl:w-[70rem] md:w-[30rem] lg:w-[40rem] sm:w-[20rem] m-2 mx-2'>
                      <div className=' overflow-hidden'>
                        <h1 className='m-4 '>{index + 1}</h1>
                      </div>
                      <div className=' overflow-hidden w-[20%]'>
                        <h1 className='m-4 '>{item.name}</h1>
                      </div>
                      <div className=' overflow-hidden w-[50%]'>
                        <h1 className='m-4 '>{item.email}</h1>
                      </div>
                      <div className=' w-[25%]'>
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
      </div>
    </>
  );
}

export default Users