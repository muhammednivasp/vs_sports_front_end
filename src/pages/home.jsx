
import React,{useState} from 'react';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import Tournaments from '../components/tournamentShow/tournament';

import bgimage from "../assets/images/bg/backgroundvssports.jpg";
import Tournament from '../components/tournaments/tournament';
import playerimg from '../assets/images/player/portrait.jpg'
import fiveimg from '../assets/images/player/fiveimg.avif'
import secondimg from '../assets/images/player/secondimg.webp'
import threeimg from '../assets/images/player/threeimg.avif'
import child from '../assets/images/player/child.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../components/loader/loader';

function Home() {

  const location = useLocation()
  const isClub = location.state
  const [loader, setLoader] = useState(true);

  return (
    <div className='justify-center'>
    {setTimeout(()=>{
      setLoader(false)
   },1000)}
    {loader?<Loader/> :
    <div className="flex flex-col min-h-custom bg-cover bg-center bg-no-repeat relative " style={{ backgroundImage: `url(${bgimage})` }}>

      <Navbar data={isClub} />


      <Tournament data={isClub} />
      <tr className='h-2 mb-10 w-3/5  bg-blend-saturation bg-black opacity-60'></tr>

      <Tournaments data={isClub} />
      <tr className='h-2 mb-60 w-3/5 bg-blend-saturation bg-black opacity-60 ml-auto'></tr>

      {/* Footer */}
      <Footer />

      <style jsx>{`
      .flex-col {
        min-height: 100vh;
      }

      .flex-col > :not(style):last-child {
        margin-top: auto;
      }
    `}</style>
    </div>
     }  
    </div>
  );
}

export default Home;
