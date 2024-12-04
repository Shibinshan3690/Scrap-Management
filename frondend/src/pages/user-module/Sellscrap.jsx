import React, { useState } from "react";
import Nav from "./Nav";

import { toast, ToastContainer } from "react-toastify";
import userApi from "../../api/userInterceptor";
import MiniPickup from "../../images/miniPicUp.avif";
import MaxPickup from "../../images/maxPicUp.avif";
import HighmaxPicUp from "../../images/highMaxPicUp.avif";


const Sellscrap = () => {
  const [productName, setProductName] = useState("");
  const [vehical, setVehical] = useState("");
  const [description, setDescription] = useState("");
  const [adress, setAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [date, setDate] = useState("");
  const [distric, setDistric] = useState("");
  const token = localStorage.getItem("userToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sellProductList = {
      productName,
      vehical,
      description,
      adress,
      phoneNumber,
      pincode,
      date,
      distric,
    };

    try {
      const response = await userApi.post("/sellproduct", sellProductList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Nav />
      <div className="bg-gradient-to-br bg-yellow-100 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Choose Your Preferred Vehicle
          </h1>
          <p className="text-lg text-gray-600">
          Select the type of vehicle you’d like to sell for scrap!
          </p>
        </div>

        {/* vehical Section */}
      
               <div className=" flex container mx-auto px-6 lg:px-20 gap-20  bg-black shadow-lg  p-8">

               <div className="group w-[400px] h-[400px] bg-yellow-100 shadow-lg rounded-lg overflow-hidden relative hover:scale-105 transition-transform duration-300 ease-in-out">
  {/* Image Section minPicup */}
  <div className="w-full h-[70%] bg-yellow-200 flex items-center justify-center overflow-hidden">
    <img
      src={MiniPickup}
      alt="Mini Pickup"
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
    />
  </div>

  {/* Text Section */}
  <div className="h-[30%] bg-yellow-200 flex flex-col justify-center items-center space-y-2 p-4">
    <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-700 transition-colors duration-300 ease-in-out">
      Mini Pickup
    </h3>
    <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300 ease-in-out">
      Perfect for small to medium loads. Click to select this vehicle!
    </p>
  </div>

</div>

              
            {/* miniMaxPicuP    */}


<div className="group w-[400px] h-[400px] bg-yellow-100 shadow-lg rounded-lg overflow-hidden relative hover:scale-105 transition-transform duration-300 ease-in-out">

  <div className="w-full h-[70%] bg-yellow-200 flex items-center justify-center overflow-hidden">
    <img
      src={MaxPickup}
      alt="MaxMinPicUp"
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
    />
  </div>

  {/* Text Section */}
  <div className="h-[30%] bg-yellow-200 flex flex-col justify-center items-center space-y-2 p-4">
    <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-700 transition-colors duration-300 ease-in-out">
      Mini Pickup
    </h3>
    <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300 ease-in-out">
      Perfect for small to medium loads. Click to select this vehicle!
    </p>
  </div>

</div>





  {/* higMaxImage section */}





              
<div className="group w-[400px] h-[400px] bg-yellow-100 shadow-lg rounded-lg overflow-hidden relative hover:scale-105 transition-transform duration-300 ease-in-out">
  {/* Image Section minPicup */}
  <div className="w-full h-[70%] bg-yellow-200 flex items-center justify-center overflow-hidden">
    <img
      src={HighmaxPicUp}
      alt="higMaxPicUp"
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
    />
  </div>

  {/* Text Section */}
  <div className="h-[30%] bg-yellow-200 flex flex-col justify-center items-center space-y-2 p-4">
    <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-700 transition-colors duration-300 ease-in-out">
      Mini Pickup
    </h3>
    <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300 ease-in-out">
      Perfect for small to medium loads. Click to select this vehicle!
    </p>
  </div>

</div>
               
               </div>

        {/* Form Section */}
        <div className="container mx-auto px-6 lg:px-20 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Sell Your Scrap
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              >
                <option disabled selected>
                  Select your product
                </option>
                <option>New Paper</option>
                <option>Books</option>
                <option>Cardboard</option>
                <option>Soft Plastic</option>
                <option>Hard Plastic</option>
                <option>Iron</option>
                <option>Steel</option>
                <option>Copper</option>
                <option>E-Waste</option>
                <option>Cotton Waste</option>
              </select>

              <select
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={vehical}
                onChange={(e) => setVehical(e.target.value)}
                required
              >
                <option disabled selected>
                  Choose Vehicle
                </option>
                <option>Mini Pickup</option>
                <option>Max Pickup</option>
                <option>High Max Pickup</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Product Description"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="District"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={distric}
              onChange={(e) => setDistric(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Pincode"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="pic up date"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-md hover:opacity-90 transition duration-200"
            >
              Submit Deal
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sellscrap;
