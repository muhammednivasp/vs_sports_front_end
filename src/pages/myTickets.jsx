import React, { useEffect, useState } from 'react'
import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Navbar from '../components/navbar/navbar';
import { useLocation } from 'react-router-dom';
import { userApi, clubApi } from '../utils/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'

function MyTickets() {
    const location = useLocation()
    const state = location.state
    const isUser = state.isUser
    console.log(isUser, "kikii");

    const datas = useSelector((state) => isUser === 'user' ? state.user : state.club);
    console.log('sdwqd', datas, "ioioi")

    const [ticket, setTickets] = useState([])
    useEffect(() => {
        const gettickets = async () => {
            const { data } = await (isUser === 'club' ? clubApi : userApi).post('/ticketget', { ...datas }, { withCredentials: true });
            console.log(data, "kkkk");
            setTickets(data.tickets)
        }
        gettickets()
    }, [])
    console.log(ticket, "ggh");

    // const handleDownloadTicket = async (ticketId) => {
    //     try {
    //       const { data } = await (isUser === 'club' ? clubApi : userApi).get(`/download-ticket/${ticketId}`, { responseType: 'blob' });

    //       const blob = new Blob([data], { type: 'application/pdf' });
    //       const url = window.URL.createObjectURL(blob);
    //       const link = document.createElement('a');
    //       link.href = url;
    //       link.download = 'ticket.pdf';
    //       link.click();
    //       toast.success('Downloaded successfully')
    //       window.print()
    //     } catch (error) {
    //       console.log('Error downloading ticket:', error);
    //       toast.error('Error downloading')
    //     }
    //   };

    const handlePrintTicket = (item, ticketData) => {
        const printableContent = `
          <div class='text-center p-4'>
            <h2 class='text-3xl font-semibold mb-2'>${item.match.tournament.tournamentname}</h2>
            <p class='text-lg mb-2'>Conducted by: ${item.match.tournament.club.clubname}</p>
            <h4 class='text-lg mb-2'>Match No: ${item.match.matchnumber}</h4>
            <h4 class='text-lg mb-2'> ${item.match.firstteam.teamname} vs ${item.match.secondteam.teamname}</h4>
            
            <p class='text-xl'>Ticket No: <span class="text-sm">${ticketData.no}</span></p>
            <p class='text-xl'>Date: <span class="text-sm">${item.match.date}</span></p>
            <p class='text-xl'>Date: <span class="text-sm">${ticketData.status === false ? 'valid' : 'used'}</span></p>
            <p class='text-xl'>Location: <span class="text-sm">${item.match.tournament.location}</span></p>
            <p class='text-xl'>Rs: <span class="text-sm">${item.match.ticketsfee}</span></p>
            
            <!-- Add other ticket details here -->
          </div>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Ticket</title>');
        // Include the necessary Tailwind CSS stylesheet in the print window
        printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printableContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();

        printWindow.print();
    };



    return (
        <div className="min-h-screen bg-gray-100 py-9 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})` }}>
            <Navbar data={isUser} />
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-[50rem] p-4 overflow-y-auto">
                    <div className="flex justify-center">
                        <h1 className="lg:text-3xl text-lg font-bold mb-4 text-center fixed left-1/2 transform -translate-x-1/2 text-black z-30">Ticket Details</h1>
                    </div>
                    {ticket.map((item, index) => (
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
                                        Ticket No: <span className="text-sm text-orange-500">{tick.no}</span>
                                    </h2>
                                    <h2 className="text-md font-normal overflow-hidden">
                                        Status: {tick.status === false ? <span className="text-sm text-green-500">valid</span> : <span className="text-sm text-red-500">'used'</span>}
                                    </h2>
                                    <p className="mb-4 overflow-hidden">
                                        Time:<span className='text-sm text-orange-500'> {item.match.date}</span>
                                    </p>
                                    <p className="mb-4 overflow-hidden">
                                        Place:<span className='text-sm text-orange-500'> {item.match.tournament.location}</span>
                                    </p>
                                    <div className="flex justify-between">
                                        <button
                                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                            // onClick={() => handleDownloadTicket(ticket)}
                                            //   onClick={() => handleDownloadTicket(tick._id)} 
                                            onClick={() => handlePrintTicket(item, tick)}
                                        >
                                            Download Ticket
                                        </button>
                                        {/* <span className="text-gray-500">{ticket.price} USD</span> */}
                                        <span className="text-gray-500 p-2">Rs : {item.match.ticketsfee}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ))}


                </div>
                {/* </div> */}
            </div>
        </div>
        // </div>
        // </div>

    );
}

export default MyTickets