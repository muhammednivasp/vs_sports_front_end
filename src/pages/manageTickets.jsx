import React, { useEffect, useState } from 'react'
import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Navbar from '../components/navbar/navbar';
import { useLocation } from 'react-router-dom';
import { userApi, clubApi } from '../utils/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'

function ManageTickets() {

    const location = useLocation()
    const state = location.state
    const item = state.item
    const clubdatas = state.clubdatas
    console.log(clubdatas, "kikii");

    const [ticket, setTickets] = useState([])
    const [temp, setTemp] = useState('')

    useEffect(() => {
        const gettickets = async () => {
            const { data } = await clubApi.post('/clubticketgets', { item: item, clubdatas: clubdatas }, { withCredentials: true });
            console.log(data, "kkkk");
            setTickets(data.ticketsdata)
        }
        gettickets()
    }, [temp])
    console.log(ticket, "ggh");

    const changeStatus = async (item, tick) => {
        try {
        console.log("gdfg", item, "kjeer", tick);
        const id = tick._id
        const { data } = await clubApi.post('/ticketstatus', { id: id }, { withCredentials: true });
        toast.success(data.message)
        setTemp(data.ticket)
        console.log(data, "werewr");
    } catch (error) {
            console.log(error);
            toast.error(error)
    }
    }


    return (
        <div className="min-h-screen bg-gray-100 py-9 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})` }}>
            <Navbar data='club' />
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-[50rem] p-4 overflow-y-auto">
                    <div className="flex justify-center">
                        <h1 className="lg:text-3xl text-lg font-bold mb-4 text-center fixed left-1/2 transform -translate-x-1/2 text-black z-30">Ticket Details</h1>
                    </div>
                    {ticket.length==0?<h1 className='text-xl text-red-400 text-center mt-12'>No Bookings Found</h1>:
                      ticket.map((item, index) => (
                        item.tickets.map((tick, tickIndex) => (
                            <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-1 p-2" key={tickIndex}>
                                <div className="p-2 border border-gray-300 rounded-lg w-[100%] relative overflow-hidden bg-slate-200 mt-8">
                                    <h2 className="text-xl font-semibold m-2 overflow-hidden text-center text-blue-500">
                                        {item.match.tournament.tournamentname}
                                    </h2>
                                    <h2 className="text-lg font-semibold m-2 overflow-hidden text-center">
                                        Conducted by: <span className="text-lg text-green-500">{item.match.tournament.club.clubname}</span>
                                    </h2>
                                    <h2 className="text-lg font-semibold m-2 overflow-hidden text-center">
                                        Match No: <span className="text-xl ">{item.match.matchnumber}</span>
                                    </h2>
                                    <h2 className="text-lg font-semibold m-2 overflow-hidden text-center text-red-300"><span className="text-md text-green-500">{item.match.firstteam.teamname}</span> vs <span className="text-md text-green-500">{item.match.secondteam.teamname}</span>
                                    </h2>
                                    <h2 className="text-md font-normal overflow-hidden">
                                        Ticket No: <span className="text-sm text-yellow-500">{tick.no}</span>
                                    </h2>
                                    <h2 className="text-md font-normal overflow-hidden">
                                        Status: {tick.status === false ? <span className="text-sm text-green-500">valid</span> : <span className="text-sm text-red-500">'used'</span>}
                                    </h2>
                                    <p className="mb-4 overflow-hidden">
                                        Time:<span className='text-sm text-yellow-500'> {item.match.date}</span>
                                    </p>
                                    <p className="mb-4 overflow-hidden">
                                        Place:<span className='text-sm text-yellow-500'> {item.match.tournament.location}</span>
                                    </p>
                                    <div className="flex justify-between">
                                        {tick.status === true ?
                                            <button
                                                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"

                                                onClick={() => changeStatus(item, tick)}
                                            >
                                                change status
                                            </button>
                                            :
                                            <button
                                                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-300"

                                                onClick={() => changeStatus(item, tick)}
                                            >
                                                change status
                                            </button>
                                        }
                                        <span className="text-gray-500 p-2">Rs : {item.match.ticketsfee}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ))
                 }

                </div>
            </div>
        </div>

    );
}

export default ManageTickets