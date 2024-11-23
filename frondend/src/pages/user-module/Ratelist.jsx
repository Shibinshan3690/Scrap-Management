import React, { useState } from "react";
import Nav from "./Nav";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const items = [
    { name: "News Paper", price: 10, description: "Old newspapers", img: newspapper },
    { name: "Books", price: 10, description: "Used books", img: books },
    { name: "Cardboard", price: 7, description: "Corrugated cardboard", img: Carboard },
    { name: "Soft Plastic", price: 10, description: "Soft plastic items", img: plastic },
    { name: "Hard Plastic", price: 5, description: "Durable plastic waste", img: hardplastic },
    { name: "Iron", price: 26, description: "Heavy iron scrap", img: Iron },
    { name: "Steel", price: 42, description: "Stainless steel waste", img: Steel },
    { name: "Copper", price: 300, description: "Copper wire and scraps", img: Coper },
    { name: "E-waste", price: 12, description: "Electronic waste", img: ewast },
    { name: "Cotton Waste", price: 50, description: "Fabric and textile scraps", img: cottanWast },
  ];

  // Filter and sort items
  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "price") return a.price - b.price;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
         <div  className="mt-[365px]">
      <Nav colours="white " />
       </div>

      {/* Search and Sort Section */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <div className="relative w-[400px]">
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          <input
            className="w-full pl-12 py-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:ring-indigo-200"
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="px-4 py-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:ring-indigo-200"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden group transform transition duration-300 hover:scale-105"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={`${item.name} Image`}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition duration-300"
                />
              </div>
              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg group-hover:text-indigo-600 transition duration-300">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <p className="mt-2 font-semibold text-indigo-600">
                  ₹{item.price} Per Kg
                </p>
              </div>
              {/* Floating Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-0 group-hover:opacity-50 transition duration-300"></div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full font-bold text-gray-500 mt-8">
            No items match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Ratelist;
