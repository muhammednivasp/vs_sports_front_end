
// import React, { useState } from 'react';
// import image from "../../assets/images/logo/logo.png";
// import profilelogo from "../../assets/images/profilelogo/pngegg.png"

// import { useDispatch, useSelector } from 'react-redux';
// import { setUserDetails } from '../../redux/userDataSlice'
// import { setClubDetails } from '../../redux/clubDataSlice'

// import { useNavigate, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-green-900 bg-opacity-100 p-4 flex flex-wrap items-center justify-between fixed w-full top-0 z-30">

//       <div className="flex items-center">
//         <button onClick={() => home(userdatas.isUser)}>
//           <img src={image} alt="Logo" className="h-10 " />
//         </button>
//       </div>
//       <span className="text-white text-center font-bold text:xl md:text-2xl flex-grow">
//         <span style={{ color: "blue" }}>V</span>
//         <span style={{ color: "red" }}>s</span>{" "}
//         <span style={{ color: "white" }}>S</span>
//         <span style={{ color: "white" }}>p</span>
//         <span style={{ color: "white" }}>o</span>
//         <span style={{ color: "white" }}>r</span>
//         <span style={{ color: "white" }}>t</span>
//         <span style={{ color: "white" }}>s</span>
//       </span>


//       <div className="flex items-center mt-0 md:mt-0">
//         <button onClick={() => profile(userdatas.isUser)}>
//           <img src={profilelogo} alt="Profile Icon" className="h-6 mr-5 bg-white" />
//         </button>
//         <button className="text-white font-medium hover:text-gray-300 mr-5" onClick={() => logout(userdatas.isUser)}>Logout</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState } from 'react';
// import image from "../../assets/images/logo/logo.png";
// import profilelogo from "../../assets/images/profilelogo/pngegg.png";
// import { useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const location = useLocation();
//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   return (
//     <nav className="bg-green-900 bg-opacity-100 p-4 flex flex-wrap items-center justify-between fixed w-full top-0 z-30">
//       <div className="flex items-center">
//         <button onClick={() => home(userdatas.isUser)}>
//           <img src={image} alt="Logo" className="h-10 " />
//         </button>
//       </div>
//       <span className="text-white text-center font-bold text:xl md:text-2xl flex-grow">
//         <span style={{ color: "blue" }}>V</span>
//         <span style={{ color: "red" }}>s</span>{" "}
//         <span style={{ color: "white" }}>S</span>
//         <span style={{ color: "white" }}>p</span>
//         <span style={{ color: "white" }}>o</span>
//         <span style={{ color: "white" }}>r</span>
//         <span style={{ color: "white" }}>t</span>
//         <span style={{ color: "white" }}>s</span>
//       </span>
//       <div className="flex items-center mt-0 md:mt-0">
//         <button onClick={() => profile(userdatas.isUser)}>
//           <img src={profilelogo} alt="Profile Icon" className="h-6 mr-5 bg-white" />
//         </button>
//         <button className="text-white font-medium hover:text-gray-300 mr-5" onClick={() => logout(userdatas.isUser)}>Logout</button>
//         {/* Toggle button to show/hide the sidebar on small screens */}
//         <button
//           className="text-white font-medium hover:text-gray-300 md:hidden"
//           onClick={toggleSidebar}
//         >
//           {showSidebar ? "Hide" : "Show"} Sidebar
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from 'react';
import image from "../../assets/images/logo/logo.png";
import profilelogo from "../../assets/images/profilelogo/pngegg.png";
import { useLocation } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';

const Navbar = ({ showSidebar, toggleSidebar }) => {
  const location = useLocation();

  return (
    <nav className="bg-green-600 bg-opacity-100 p-4 flex flex-wrap items-center  justify-between fixed w-full top-0 z-30">
      <div className="flex items-center">
        <button onClick={() => home(userdatas.isUser)}>
          <img src={image} alt="Logo" className="h-10 " />
        </button>
      </div>

      <button
          className="text-white font-medium hover:text-gray-300 ml-4 md:ml-32"
          onClick={toggleSidebar}
          
        >
        {/* {showSidebar ? "Hide" : "Show"}  */}
        <BiMenu size={20} className="ml-2" />
        </button>
      <span className="text-white text-center font-bold text:xl md:text-2xl flex-grow">
        <span style={{ color: "blue" }}>V</span>
        <span style={{ color: "red" }}>s</span>{" "}
        <span style={{ color: "white" }}>S</span>
        <span style={{ color: "white" }}>p</span>
        <span style={{ color: "white" }}>o</span>
        <span style={{ color: "white" }}>r</span>
        <span style={{ color: "white" }}>t</span>
        <span style={{ color: "white" }}>s</span>
      </span>
      <div className="flex items-center mt-0 md:mt-0">
        <button onClick={() => profile(userdatas.isUser)}>
          <img src={profilelogo} alt="Profile Icon" className="h-6 mr-5 bg-white" />
        </button>
        <button className="text-white font-medium hover:text-gray-300 mr-5" onClick={() => logout(userdatas.isUser)}>Logout</button>
        {/* Hamburger menu icon to show/hide the sidebar on small screens */}
    
      </div>
    </nav>
  );
};

export default Navbar;



