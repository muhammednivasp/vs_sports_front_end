
import React, { useEffect, useState, useRef } from 'react';
// import playerimg from '../../assets/images/player/portrait.jpg';
// import child from '../../assets/images/player/child.jpg';
// import yellowplayer from '../../assets/images/player/yellowplayer.png';
// import groupplayer from '../../assets/images/player/groupplayer.png';
// import bgimage from '../../assets/images/bg/backgroundvssports.jpg';
import withball from '../../assets/images/player/withball.png';
import Loader from '../loader/loader';

import toast from 'react-hot-toast';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { userApi } from '../../utils/api';
import { clubApi } from '../../utils/api';
import { useLocation, useNavigate } from 'react-router-dom'

function Tournament({ data }) {
  const baseurl = data === 'user' ? userApi : clubApi;
  const [details, setDetails] = useState([]);
  const [sliderLoaded, setSliderLoaded] = useState(false);


  const Navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {

        const announcedtournament = await baseurl.get('/announced', { withCredentials: true });

        setDetails(announcedtournament.data.details);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const sliderRef = useRef(null);

  useEffect(() => {
    if (details.length > 0) {
      setSliderLoaded(true);
    }
  }, [details]);

  useEffect(() => {
    if (sliderLoaded && sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    className: 'w-full mx-auto max-w-2xl',
    customPaging: () => <div className="custom-dot"></div>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };
  const slideStyles = {
    margin: '0 10px',
  };

  const handle = (item, data) => {
    Navigate(data === 'user' ? '/user/show' : '/club/show', { state: { ...item, isUser: data } })

  }
 


  return (
    <>

      {details.length > 0 ? (
        <>
          <h1 className="text-center mt-28 text-3xl font-semibold text-white">Announced Tournaments</h1>

          {sliderLoaded && (
            <Slider {...settings} className="m-7 md:m-8" ref={sliderRef}>
              {details.map((item) => (
                <div key={item._id} style={slideStyles} className="">
                  <a onClick={() => handle(item, data)}>
                    <div
                      className="bg-contain bg-no-repeat bg-center bg-black bg-opacity-100 h-96  m-4 md:mx-20"
                      style={{ backgroundImage: `url(${withball})` }}
                    >
                      <h1 className=" text-3xl md:text-5xl text-yellow-400 font-semibold text-center pt-48">
                        {item.tournamentname ?? ' '}
                      </h1>
                      <h1 className="text-3xl text-white font-semibold text-center pt-2">
                        {item.category ?? ' '}
                      </h1>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          )}
        </>
      ) : (
        <>
          <h1 className="text-center mt-8 text-3xl font-semibold text-gray-600 text-opacity-100 pt-16">Announced Tournaments</h1>

          <div
            className="bg-contain bg-no-repeat bg-center bg-zinc-600 bg-opacity-100 h-80 m-2 mt-4 mx-4 md:mx-20 mb-16"
            style={{ backgroundImage: `url(${withball})` }}
          >
            <h1 className="text-2xl text-white font-semibold text-center pt-48 md:pt-48 md:text-4xl">
              Currently There is no Announced Tournaments !
            </h1>
            <h1 className="text-xl text-red-600 font-normal text-center pt-2 md:text-3xl">
              Wait for next update..
            </h1>
          </div>
        </>
      )}


    </>
  );
}

export default Tournament;


