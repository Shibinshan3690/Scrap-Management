import React, { useState } from 'react';
import logo from "../../pics/logo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import Modal from "./Modal";

const ProfileModal = ({ isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+1234567890");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you could send updated data to your server or database if needed
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
        height: "600px",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`bg-${colours}`} style={{ width: 1707, marginTop: "-377px", height: "100px", display: "flex" }}>
        <img
          src={logo}
          alt=""
          style={{ width: "140px", height: "70px", marginTop: "20px", marginLeft: "20px" }}
          onClick={() => navigate("/home")}
        />
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
        </div>

        <div style={{ display: "flex" }}>
          <span style={{ marginLeft: "300px", fontSize: "20px", fontWeight: "500", marginTop: "40px", display: "flex" }} onClick={handleNotificationClick}>
            <IoIosNotifications style={{ marginTop: "5px", width: "50px", height: "30px" }} />
          </span>
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

      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Nav;
