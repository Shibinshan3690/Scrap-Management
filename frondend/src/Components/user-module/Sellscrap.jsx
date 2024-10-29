import React, { useState } from 'react'
import Nav from './Nav'
import choosevideo from "../../pics/Choose.mp4";
import shedulePickup from "../../pics/Schedule.mp4";
import recieve from "../../pics/Give Payment.mp4";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
// import arrow from "../../pics/WhatsApp Video 2024-10-26 at 15.24.31_534f09f8.mp4";





const Sellscrap = () => {
  const [productName,setProductName]=useState("");
  const [vehical,setVehical]=useState("");
  const [description,setDescription]=useState("");
  const [adress,setAdress]=useState("");
  const  [phoneNumber,setPhoneNumber]=useState("");
  const [pincode,setPincode]=useState("");
  const   [date,setDate]=useState();


    const handleSubmit =async(e)=>{
      e.preventDefault();
      const sellProductList={
        productName,vehical,description,adress,phoneNumber,pincode,date

      }
      try {
        const response=await axios.post("http://localhost:5000/user/sellproduct",sellProductList);
        console.log(response,"responseeeee")
        
        toast.success(response.data.message);
       
       
        
      } catch (error) {
        toast.error(error.response?.data?.message || "erorrrr");
        
      }

    }
    
  return (
<>

   <div >
   <ToastContainer /> 
<div   style={{marginTop:"248px"}}>
      <Nav colours='white'/>
     </div>

             <div  style={{display:"flex"}} >

              <div  style={{marginTop:"100px",marginLeft:"100px"}}>
              <h1 style={{fontWeight:"600"}}>Step 1</h1>
              <video  loop autoPlay muted src={choosevideo} style={{width:"200px",height:"200px"}}></video>
              <h1 style={{marginTop:"20px", fontWeight:"600"}}>Choose material</h1>
              </div>

              <div  style={{marginTop:"100px",marginLeft:"100px"}} >
              <h1 style={{fontWeight:"600"}}>Step 2</h1>
              <video  loop autoPlay muted src={shedulePickup} style={{width:"200px",height:"200px"}}></video>
              <h1 style={{marginTop:"20px", fontWeight:"600"}}>Shedule Pickup</h1>
              </div>      
              <div  style={{marginTop:"100px",marginLeft:"100px"}}>
              <h1 style={{fontWeight:"600"}}>Step 3</h1>
              <video  loop autoPlay muted src={recieve} style={{width:"200px",height:"200px"}}></video>
              <h1 style={{marginTop:"20px", fontWeight:"600"}}>Recieve payment</h1>
              </div>
         </div>  
           <h1 style={{marginLeft:"400px" ,marginTop:"100px",fontSize:"30px",fontWeight:"600"}}>Esey to three steps</h1> 
          
           <div className="right-section bg-gradient-to-br from-white to-gray-400 border border-black h-[500px] w-[700px] ml-[950px] -mt-[500px] p-6 rounded-lg shadow-lg">
  <h2 className="text-xl font-semibold mb-4">Sell Products</h2>

  <select 
    className="mb-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={productName}
     onChange={(e)=>setProductName(e.target.value)}
  >
    <option disabled selected>Select your product</option>
    <option>New papper</option>
    <option>Books</option>
    <option >Carboard</option>
    <option>Softplastic</option>
    <option >Hard plastic</option>
    <option >Iron</option>
    <option >Steel</option>
    <option >copper</option>
    <option >E-Wasts</option>
    <option >Cotton-Wasts</option>
  </select>

  <select 
    className="mb-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
     value={vehical}
     onChange={(e)=>setVehical(e.target.value)}

  >
    <option disabled selected>Choose vehicle</option>
    <option >Mini-pickUp</option>
    <option >Max-pickUp</option>
    <option >highMax-pickUp 3</option>
  </select>

  <input 
    type="text" 
    placeholder="Product Description" 
    className="mb-4 p-2 w-full border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
     value={description}
    onChange={(e)=>setDescription(e.target.value)}
/>

  <input 
    type="text" 
    placeholder="Address" 
    className="mb-4 p-2 w-full border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={adress}
    onChange={(e)=>setAdress(e.target.value)}
/>

  <input 
    type="number" 
    placeholder="Phone Number" 
    className="mb-4 p-2 w-full border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={phoneNumber}
    onChange={(e)=>setPhoneNumber(e.target.value)}

/>

  <input 
    type="number" 
    placeholder="Pincode" 
    className="mb-4 p-2 w-full border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={pincode}
    onChange={(e)=>setPincode(e.target.value)}
/>

  <input 
    type="date" 
    className="mb-4 p-2 w-full border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={date}
    onChange={(e)=>setDate(e.target.value)}
/>

  <button  
    className="w-60 mt-16 ml-60 p-2 bg-gray-500 border-none text-white font-semibold rounded-md hover:bg-slate-600 gray-300transition-colors duration-200"
     onClick={handleSubmit}
  >
    Deal 👍
  </button>
</div>



          </div>
</>
  )
}

export default Sellscrap