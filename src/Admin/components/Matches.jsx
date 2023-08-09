import React, { useEffect, useState } from 'react';
import { adminApi } from '../../utils/api';

function Matches() {

    const [matches, setMatches] = useState([])
    // const [block, setBlock] = useState(false)

    useEffect(() => {
        const datafetch = async () => {
            const { data } = await adminApi.get('/matches', { withCredentials: true })
            console.log(data, "lklklklkk");
            setMatches(data.matchesdata)
        }
        datafetch()
    }, [])
    // console.log(matches, "jijijij")


    const handleBlock = async (item, status) => {
        const { data } = await adminApi.post('/matches', item, { withCredentials: true })
        console.log(data, "jjj");
        setMatches(data.matches)
    }
    return (
        <>
            <div className='mx-auto mt-32 bg-white md:h-[42rem] h-[32rem] overflow-y-auto'>
                <div className='justify-center text-center sticky top-0 bg-white z-10 p-2'> {/* Apply the sticky styles here */}
                    <h1 className=' text-blue-700 text-center font-bold text-2xl'>Matches</h1>
                </div>
                <div >
                    {matches.map((item, index) => (
                        <div className="justify-center items-center" key={index}>
                            <div className='overflow-x-auto'>
                                <div>
                                    <div className='flex bg-green-300 h-16 xl:w-[70rem] md:w-[30rem] lg:w-[40rem] sm:w-[20rem] m-2 mx-2'>
                                        {/* <div className=' overflow-hidden '>
                 <h1 className='ml-2 mt-5'>{index+1}</h1>
               </div> */}
                                        <div className=' overflow-hidden w-[15%]'>
                                            <h1 className='ml-1 mt-5 text-sm'>Match:{item.matchnumber}</h1>
                                        </div>
                                        <div className=' overflow-hidden w-[30%]'>
                                            <h1 className='m-4 mt-5 text-sm'>{item.firstteam.teamname} vs {item.secondteam.teamname}</h1>
                                        </div>
                                        <div className=' overflow-hidden w-[15%]'>
                                            <h1 className='m-3 mt-5 text-sm'>{item.tournament.tournamentname}</h1>
                                        </div>
                                        <div className=' overflow-hidden w-[20%]'>
                                            <h1 className='m-3 mt-5 text-sm'>{item.matchstatus === true ? 'On going' : 'Over'}</h1>
                                        </div>
                                        <div className=' w-[20%]'>
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


export default Matches
