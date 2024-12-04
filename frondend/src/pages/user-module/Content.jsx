import React from 'react';
import { useNavigate } from 'react-router-dom';
import truckhome from "../../pics/Delivery Truck.mp4";
import { MdHeight } from 'react-icons/md';

const  Content = () => {
    const navigate=useNavigate()
  return (
    <div className="flex justify-between  h-[660px] bg-yellow-100 ">
      {/* Left Section */}
      <div   className='mt-40 ml-20'>
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
      <div className="right-section w-1/2  ">
    <video 
    className=' mt-10 rounded-full animate-pulse h-[600px] w-[600px] ml-20'
    loop
          autoPlay
          muted src={truckhome} style={{  }}></video>
      </div>
    </div>
  );
};

export default Content;
