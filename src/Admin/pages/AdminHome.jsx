import React, { useState } from 'react';
import Club from '../components/Club';
import Users from '../components/Users';
import Tournaments from '../components/Tournaments'
import Matches from '../components/Matches'
import Graph from '../components/Graph';

function AdminHome({data}) {
const [datas,setDatas] = useState(data)

  return (
    <div className='flex  bg-white h-screen'>
      
   
        {datas==='club'&&<Club/>}
        {datas==='user'&&<Users/>}
        {datas==='tournaments'&&<Tournaments/>}
        {datas==='matches'&&<Matches/>}
        {datas==='graphs'&&<Graph/>}


        </div>
  );
}

export default AdminHome;
