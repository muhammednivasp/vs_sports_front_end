
import React, { useState } from 'react';
// import { createCommunity } from '../../services/userApi';
import toast from 'react-hot-toast'
import { useNavigate,useLocation } from 'react-router-dom';
import bgimage from "../../assets/images/bg/backgroundvssports.jpg";
import { clubApi } from '../../utils/api';

function Images() {

  const [clubsImg, setClubsImg] = useState([]);

  const navigate = useNavigate()
  const location = useLocation();
  const id = location.state;

  const handleSubmit =async (e) => {
   e.preventDefault()
   

   try {
   
    const images = clubsImg
    const formData = new FormData();
    const formDataArray = images.map((imageFile,index) => {
      formData.append("images", imageFile);
      // console.log(index,"kk");
      // console.log(imageFile,"klk");
     
    });

    // console.log(formData.get('image'));
const {data} =await clubApi.post('/uploadimage',formData)

   } catch (error) {
    console.log(error);
   }
  }
  console.log(clubsImg,"hhhh");
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgimage})` }}>
    <div className="flex flex-col items-center justify-center h-full">
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="rounded-lg shadow-md bg-white p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">upload Images</h2>
        <form onSubmit={handleSubmit} >
        {/* <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-1">
            Title
          </label>
          <input
            id="title"
            name='title'
            type="text"
            className="border border-gray-400 p-2 w-full"
            // onChange={(e) => {setCommunity({...community,[e.target.name]:e.target.value})}}
          />
        </div> */}

        <div className="mb-4">
          <label htmlFor="profileImage" className="block font-bold mb-1">
            Profile Image
          </label>
          <input
             id="profileImage"
             type="file"
             name='image'
             accept=".jpeg, .jpg, .png, .gif"
             multiple
             className="border border-gray-400 p-2 w-full"
             onChange={(e) => {
             const selectedFiles = Array.from(e.target.files);
             setClubsImg(selectedFiles);
             }}
/>

        </div>

        

      

        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          upload
        </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Images
