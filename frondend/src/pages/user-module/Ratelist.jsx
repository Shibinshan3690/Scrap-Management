import React, { useState } from 'react';
import Nav from './Nav';
import { IoSearch } from "react-icons/io5";
import newspapper from "../../images/newspaper.jpeg";
import books from "../../images/Books.jpeg";
import Carboard from "../../images/Carboard.jpg";
import plastic from "../../images/Palstic.jpg";
import hardplastic from "../../images/HardPlastic.webp";
import Iron from "../../images/Iron.jpg";
import Steel from "../../images/steel.jpeg";
import Coper from "../../images/Coper.jpeg";
import ewast from "../../images/ewast.webp";
import cottanWast from "../../images/cottanWast.jpeg";

const Ratelist = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const items = [
    { name: 'News Paper', price: '₹10.00 Per Kg', img: newspapper },
    { name: 'Books', price: '₹10.00 Per Kg', img: books },
    { name: 'Cardboard', price: '₹7.00 Per Kg', img: Carboard },
    { name: 'Soft Plastic', price: '₹10.00 Per Kg', img: plastic },
    { name: 'Hard Plastic', price: '₹5.00 Per Kg', img: hardplastic },
    { name: 'Iron', price: '₹26.00 Per Kg', img: Iron },
    { name: 'Steel', price: '₹42.00 Per Kg', img: Steel },
    { name: 'Copper', price: '₹300.00 Per Kg', img: Coper },
    { name: 'E-waste', price: '₹12.00 Per Kg', img: ewast },
    { name: 'Cotton Waste', price: '₹50.00 Per Kg', img: cottanWast },
  ];


  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const topItems = filteredItems.slice(0, 5);
  const bottomItems = filteredItems.slice(5, 10);

  return (
    <>
      <div style={{ marginTop: "365px" }}>
        <Nav colours='white' />
      </div>

      <div className="flex justify-center mt-8">
        
  <div className="relative w-[300px]">
    <IoSearch 
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      style={{ height: "30px", width: "30px" }} 
    />
    <input
      className="w-full pl-12 placeholder:text-center placeholder:text-2xl border border-black rounded-lg"
      style={{ height: "50px", backgroundColor: "white" }}
      type="text"
      placeholder="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>


      {filteredItems.length > 0 ? (
        <>
      
          <div className="flex justify-evenly text-center mt-8 space-x-4  overflow-hidden">
            {topItems.map((item, index) => (
              <div key={index} className="flex-col justify-center items-center">
                <img
                  className="rounded-xl mt-3"
                  src={item.img}
                  alt={`${item.name} Image`}
                  
                  style={{ width: "200px", height: "200px" }}
                />
                <p className="text-center font-bold">{item.name}</p>
                <p className="text-center font-bold">{item.price}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-evenly text-center mt-8 space-x-4">
            {bottomItems.map((item, index) => (
              <div key={index} className="flex-col justify-center items-center">
                <img
                  className="rounded-xl mt-3"
                  src={item.img}
                  alt={`${item.name} Image`}
               
                  style={{ width: "200px", height: "200px" }}
                />
                <p className="text-center font-bold">{item.name}</p>
                <p className="text-center font-bold">{item.price}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center font-bold w-full mt-8">No items match your search.</p>
      )}
    </>
  );
};

export default Ratelist;
