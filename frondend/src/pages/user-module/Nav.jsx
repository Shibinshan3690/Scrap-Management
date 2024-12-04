import React, { useState } from 'react';
import logo from "../../pics/logo.png";
import { IoIosNotifications, IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";  // You can remove this import if it's not needed anymore

const ProfileModal = ({ isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+1234567890");

  const handleEditToggle = () => {  
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile Information</h2>
        {/* Profile Section */}
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold">Name:</h3>
            {isEditing ? (
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="border p-1 rounded w-full"
              />
            ) : (
              <p>{name}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Email:</h3>
            {isEditing ? (
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="border p-1 rounded w-full"
              />
            ) : (
              <p>{email}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Phone:</h3>
            {isEditing ? (
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="border p-1 rounded w-full"
              />
            ) : (
              <p>{phone}</p>
            )}
          </div>
        </div>

        {/* Edit and Save Button */}
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <button className="bg-blue-500 text-white p-2 rounded w-full mr-2" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="bg-gray-300 p-2 rounded w-full mr-2" onClick={handleEditToggle}>
              Edit
            </button>
          )}
          <button className="bg-gray-300 p-2 rounded w-full" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        width: isOpen ? "250px" : "0",
        position: "fixed",
        top: 100,
        borderRadius: "0px 0px 0px 20px",
        right: 0,
        backgroundColor: "#111",
        overflowX: "hidden",
        transition: "0.3s",
        padding: isOpen ? "20px" : "0",
        color: "#fff",
        zIndex: 1000,
      }}
    >
      <button
        style={{
          fontSize: "34px",
          color: "#fff",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px"
        }}
        onClick={onClose}
      >
        &times;
      </button>
      <div className="h-full">
        <div className="w-full h-1/3 space-y-5">
          <button className="px-6 py-2 hover:bg-gray-400 border-white" onClick={toggleProfileModal}>
            Profile
          </button>
          <button className="px-6 py-2 hover:bg-gray-400 border-white">Account</button>
        </div>
        <div className="w-full h-1/2 flex items-end">
          <button className="w-36 h-10 hover:bg-gray-400 border-white" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <ProfileModal isOpen={isProfileModalOpen} onClose={toggleProfileModal} />
    </div>
  );
};

const Nav = ({ colours }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className='bg-yellow-100 flex h-24'>
      <span className="flex items-center justify-start ml-6 ">
  <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black via-green-500 to-yellow-500">
    Scrap<span className="text-gray-900">Pro</span>
  </h1>
</span>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <span style={{ marginLeft: "200px", fontSize: "20px", fontWeight: "500", marginTop: "40px", display: "flex" }} onClick={() => navigate("/home")}>
            Home<IoMdArrowDropdown style={{ marginLeft: "10px", marginTop: "5px" }} />
          </span>
          <span style={{ marginLeft: "150px", fontSize: "20px", fontWeight: "500", marginTop: "40px", display: "flex" }} onClick={() => navigate("/about")}>
            About<IoMdArrowDropdown style={{ marginLeft: "10px", marginTop: "5px" }} />
          </span>
          <span style={{ marginLeft: "150px", fontSize: "20px", fontWeight: "500", marginTop: "40px", display: "flex" }} onClick={() => navigate("/contact")}>
            Contact<IoMdArrowDropdown style={{ marginLeft: "10px", marginTop: "5px" }} />
          </span>
          <span style={{ marginLeft: "100px", fontSize: "20px", fontWeight: "500", marginTop: "40px", display: "flex" }} onClick={() => navigate("/myOrders")}>
            Orders<IoMdArrowDropdown style={{ marginLeft: "10px", marginTop: "5px" }} />
          </span>
          <span style={{ marginLeft: "130px", fontSize: "20px", fontWeight: "500", marginTop: "40px", display: "flex" }}  onClick={()=>navigate("/notifcation")}>
            <IoIosNotifications style={{ marginTop: "5px", width: "50px", height: "30px" }} />
          </span>
        </div>

        <div style={{ display: "flex" }}>
          <button style={{ width: "100px", height: "50px", border: "1px solid black", font: "inherit", fontSize: "17px", marginTop: "30px", padding: "5px", fontWeight: "400", marginLeft: "30px" }} onClick={() => navigate("/ratelist")}>
            Rate List
          </button>
          <button style={{ width: "100px", height: "50px", border: "1px solid black", font: "inherit", fontSize: "17px", marginTop: "30px", padding: "5px", fontWeight: "400", marginLeft: "30px", backgroundColor: "black", color: "white" }} onClick={() => navigate("/sellscrap")}>
            Sell scrap
          </button>
          <CgProfile
            style={{ width: "100px", height: "50px", font: "inherit", fontSize: "17px", marginTop: "30px", padding: "5px", fontWeight: "400", marginLeft: "0" }}
            onClick={toggleSidebar}
          />
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Nav;
