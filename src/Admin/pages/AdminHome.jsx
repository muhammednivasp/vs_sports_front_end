import React, { useState } from 'react';
import Club from '../components/Club';
import Users from '../components/Users';
import Tournaments from '../components/Tournaments'
import Matches from '../components/Matches'
import Graph from '../components/Graph';
// import Tickets from '../components/Tickets';

function AdminHome({data}) {
  console.log(data);
const [datas,setDatas] = useState(data)

  return (
    <div className='flex  bg-white h-screen'>
      
   
        {datas==='club'&&<Club/>}
        {datas==='user'&&<Users/>}
        {datas==='tournaments'&&<Tournaments/>}
        {datas==='matches'&&<Matches/>}
        {datas==='graphs'&&<Graph/>}
        {/* {datas==='tickets'&&<Tickets/>} */}




        </div>
  );
}

export default AdminHome;
