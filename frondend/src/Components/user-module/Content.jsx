import React from 'react';
import { useNavigate } from 'react-router-dom';
import truckhome from "../../pics/Delivery Truck.mp4";
import { MdHeight } from 'react-icons/md';

const  Content = () => {
    const navigate=useNavigate()
  return (
    <div className="flex justify-between items-center mt-28 ml-24 ">
      {/* Left Section */}
      <div className="left-section space-y-2">
        <h1 className="text-4xl font-semibold font-revert leading-tight animate-bounce">
          Sell your scrap in
          <br />
          just a few clicks
        </h1>
        <p className="text-sm font-semibold " style={{marginTop:"50px"}} >
          Lorem ipsum error accusantium impedit eveniet
        </p>
        <p className="text-sm font-semibold mt-1">
          saepe ut tempore nostrum!
        </p>
        <button className="mt-10 w-48 h-12 border border-black font-semibold hover:bg-gray-200 transition-colors animate-rotateIn" style={{marginTop:"100px"}}
         onClick={()=>navigate("/sellscrap")}
        >
          Sell your scrap
        </button>
      </div>

      {/* Right Section */}
      <div className="right-section w-1/2" >
    <video 
    className='bg-white rounded-full animate-pulse'
    loop
          autoPlay
          muted src={truckhome} style={{height:"600px", width:"600px", marginTop:"-90px"  }}></video>
      </div>
    </div>
  );
};

export default Content;
