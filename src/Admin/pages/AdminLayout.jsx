import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function AdminLayout() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
  return (
    <div>
 <div className="bg-cover bg-center bg-no-repeat  bg-fixed" style={{ backgroundSize: '100% 100%' }}>
      <div className='flex'>
      <Navbar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      </div>
    </div>
    <div className="">
        {showSidebar && <Sidebar className="" />}
       
      </div>
      <div>{<Outlet/>}</div>
    </div>
  )
}

export default AdminLayout