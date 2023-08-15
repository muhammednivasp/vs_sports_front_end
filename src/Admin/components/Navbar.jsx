
import React from 'react';
import image from "../../assets/images/logo/logo.png";
import profilelogo from "../../assets/images/profilelogo/pngegg.png";
import { useLocation,useNavigate} from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import {useDispatch} from 'react-redux'
import { setAdminDetails } from '../../redux/adminDataSlice'


const Navbar = ({ showSidebar, toggleSidebar }) => {
  const location = useLocation();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
       dispatch(
        setAdminDetails({
          id: '',
          email: ''
        })
      ) 
  localStorage.removeItem('adminToken')
    navigate('/admin');
  };

  const home = () => {
      navigate("/admin/home")
   
  }

  return (
    <nav className="bg-green-600 bg-opacity-100 p-4 flex flex-wrap items-center  justify-between fixed w-full top-0 z-30">
      <div className="flex items-center">
        <button onClick={(()=>{home()})}>
          <img src={image} alt="Logo" className="h-10 " />
        </button>
      </div>

      <button
          className="text-white font-medium hover:text-gray-300 ml-4 md:ml-32"
          onClick={toggleSidebar}
          
        >
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
        <button className="text-white font-medium hover:text-gray-300 mr-5" onClick={() => logout()}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;



