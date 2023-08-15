import React, { useState } from 'react';
import notFound from '../assets/images/404page/404page.jpg'

const NotFoundPage = ({ data }) => {
  const [datas, setDatas] = useState(data)
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-100 mb-2">Oops<span className='text-red-700'> !</span> Page Not Found</h1>
        <p className="text-gray-400 mb-4 text-2xl">The page you are looking for might have been removed or is temporarily unavailable.</p>
        <img src={notFound} alt="404 Illustration" className="w-64 mx-auto mb-6" />
        {datas === 'user' && <a href='/user/home' className="text-blue-300 hover:underline border-2 border-amber-400 p-2 rounded-3xl">Go back to homepage</a>}
        {datas === 'club' && <a href='/club/home' className="text-blue-300 hover:underline border-2 border-amber-400 p-2 rounded-3xl">Go back to homepage</a>}
        {datas === 'admin' && <a href='/admin/home' className="text-blue-300 hover:underline border-2 border-amber-400 p-2 rounded-3xl">Go back to homepage</a>}
      </div>
    </div>
  );
};

export default NotFoundPage;
