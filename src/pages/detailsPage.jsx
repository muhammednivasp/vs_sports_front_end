import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Navbar from '../components/navbar/navbar';
import { clubApi } from '../utils/api';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function DetailsPage() {
  const Navigate = useNavigate();
  const location = useLocation();

  const [details, setDetails] = useState([]);
  const [datasOf, setDatasOf] = useState({});

  let { datas } = location.state;

  console.log(datas, 'lokko');

  useEffect(() => {
    const change = async () => {
      setDatasOf(datas);
      console.log(datas, 'datasof'); // You can directly access the updated value here
    }
    change()
  }, [datas]);

  useEffect(() => {
    const functioncall = async () => {
      const { data } = await clubApi.post('/details', { id: datasOf._id }, { withCredentials: true });
      console.log(data.details, 'detailss');
      setDetails(data.details);
    };
    functioncall();
  }, [datasOf]); // Make sure to use datasOf as a dependency here to trigger the effect when it changes

  console.log(details, 'piip');

  // const sliderSettings = {
  //   dots: true,
  //       number:true,
  //       infinite: true,
  //       speed: 500,
  //       slidesToShow: 4, // Number of slides shown at a time
  //       slidesToScroll: 1,
  //       autoplay: true,
  //       autoplaySpeed: 2000,


  //       responsive: [
  //         {
  //           breakpoint: 1024,
  //           settings: {
  //             slidesToShow: 2,
  //             autoplay:true,
  //             autoplaySpeed: 2000,
  //           },
  //         },
  //         {
  //           breakpoint: 768,
  //           settings: {
  //             slidesToShow: 1,
  //             autoplay:true,
  //             autoplaySpeed: 2000,
  //           },
  //         },
  //       ],
  // };

  const addToTournament = async () => {
    const { data } = await clubApi.post('/addtotournament', { datasOf }, { withCredentials: true });
    console.log(data);
    setDatasOf(data.announce);
    datas = data.announce
    console.log(data.announce, 'datassfdf'); // The updated value will be available here after the state update
  };
  // ... Rest of the component ...


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})` }}>
      {/* Rest of your code */}
      <Navbar data='club' />
      <div className="w-full items-center text-center m-4 pt-12">
        {/* Team Details Box */}
        <h1 className='text-4xl text-blue-500 font-semibold m-4'>{datas.tournamentname}</h1>

        {details.length < 1 ?
          <h1 className='text-red-400 text-2xl font-semibold'>No Team Registered</h1>
          :
          <>
            <div className="bg-white bg-opacity-50 rounded-lg border-4 border-slate-400 shadow-md h-[38rem] m-2 p-8 px-8">
              <h1 className="text-2xl text-white font-semibold mb-2">Teams Registered</h1>
              <Slider dots={true} infinite={true} slidesToShow={1} slidesToScroll={1} responsive={[
                {
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,

                  },
                },
                {
                  breakpoint: "640px", // Adjust this value based on your desired breakpoint
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                  },
                },
                {
                  breakpoint: "768px", // Adjust this value based on your desired breakpoint
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoplay: true,
                    autoplaySpeed: 2000,
                  },
                },
                // Add more breakpoints if needed
              ]}>
                {/* Corrected mapping */}
                {details.map((item, index) => (
                  <div key={item._id}>
                    <h2 className="text-gray-800 text-xl font-bold text-center ">
                      Team No :- {index + 1}
                    </h2>
                    <div className="flex items-center justify-between p-12  rounded-lg bg-white shadow-indigo-50 shadow-md h-[24rem] m-4">
                      <div className="text-center">
                        <h3 className="m-4 text-xl font-bold text-yellow-500 text-left">
                          <span className="text-black">Team Club : </span>
                          {item.teamname}
                        </h3>
                        <h3 className="m-4 text-xl font-bold text-yellow-500 text-left">
                          <span className="text-black">Registration No : </span>
                          {item.registration}
                        </h3>
                        <h3 className="m-4 text-xl font-bold text-yellow-500 text-left">
                          <span className="text-black">Location : </span>
                          {item.location}
                        </h3>
                        <h3 className="m-4 text-xl font-bold text-yellow-500 text-left">
                          <span className="text-black">Phone Number : </span>
                          {item.phonenumber}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

          </>
        }

        {/* Buttons */}
        <div className="flex flex-col space-y-4 md:mt-6 m-6 mt-6">
          {/* <button className="bg-green-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-700">
            Button 1
          </button> */}
          {!datasOf.added &&
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700" onClick={() => { addToTournament() }}>
              Add This To Tournaments
            </button>

          }
        </div>
      </div>
    </div>
  );
};



export default DetailsPage;
