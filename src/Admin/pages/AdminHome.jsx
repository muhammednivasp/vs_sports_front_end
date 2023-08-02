import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';

function AdminHome() {


  return (
    <div className='flex  bg-gray-400 h-screen'>
    <div className='mx-auto mt-32 bg-white md:h-[42rem] h-[32rem] overflow-y-auto'>

        <Table/>
        <Table/>
        <Table/>
        <Table/>
        <Table/>

        </div>
    </div>
  );
}

export default AdminHome;
