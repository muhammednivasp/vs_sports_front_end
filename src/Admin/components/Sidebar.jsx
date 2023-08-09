
import React from 'react';

const Sidebar = () => {
  // Sample data for the sidebar links
  const sidebarLinks = [
    { title: 'Graphs', link: '/admin/home' },
    { title: 'Clubs', link: '/admin/home/club' },
    { title: 'Users', link: '/admin/home/users' },
    { title: 'Tournaments', link: '/admin/home/tournaments' },
    { title: 'Matches', link: '/admin/home/matches' },
    // { title: 'Tickets', link: '/admin/home/tickets' },


  ];

  return (
    <div>
    <aside className="bg-gray-200 lg:w-60 p-4 fixed h-full top-16 left-0 z-20">
      <div className="text-xl font-bold mb-4 text-center">Menu</div>
      <ul className="list-none">
        {sidebarLinks.map((link, index) => (
          <li key={index} className="mb-2">
            <div className='border-2 border-gray-300 text-center'>
            <a href={link.link} className="text-blue-600 font-semibold text-xl hover:text-blue-800">
              {link.title}
            </a>
            </div>
          </li>
        ))}
      </ul>
    </aside>
    </div>
  );
};

export default Sidebar;



