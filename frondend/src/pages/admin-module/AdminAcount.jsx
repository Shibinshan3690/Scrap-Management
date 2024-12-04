import React, { useEffect, useState } from 'react';
import { MdAccountCircle, MdEmail, MdPhone, MdEdit, MdSave } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Adminsidebar from './Adminsidebar';
import axios from 'axios';
import adminApi from '../../api/adminInterceptor';

const AdminAccount = () => {
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem('admin')); // Assumes admin object includes 'id'
    console.log(admin, 'add');

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(admin?.name || '');
    const [email, setEmail] = useState(admin?.email || '');

    const handleEditClick = () => {
        setIsEditing(!isEditing); // Toggle edit mode
    };

    const handleSave = async () => {
      try {
          const updatedAdmin = { name, email };
          const response = await adminApi.put(`/admin/${admin.id}`, updatedAdmin);
  
          if (response.status === 200) {
              localStorage.setItem('admin', JSON.stringify(response.data.admin));
              setIsEditing(false);
              alert("Admin details updated successfully!");
          } else {
              console.log("Unexpected response:", response);
          }
      } catch (error) {
          console.error("Error updating admin details:", error.response || error);
          alert("Failed to update admin details. Please try again.");
      }
  };
  
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notification/notifications');
        setNotifications(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // total unread notification count
  const unreadCount = notifications.filter(notification => !notification.isRead).length;


    return (
        <div className="flex  min-h-screen bg-yellow-400">
            <Adminsidebar unreadCount={unreadCount}/>
            <main className="flex-1 "style={{marginTop:"14px"}}>

             <div className="bg-white h-[715px] w-[1420px] shadow-md p-6 ml-[270px]  rounded-3xl">
                <div className="bg-yellow-100 p-8 rounded-lg shadow-md max-w mx-auto h-auto">
                    <div className="flex-col ">
                        <MdAccountCircle className="text-blue-500" size={80} />
                        {isEditing ? (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-4 text-xl font-semibold border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                            />
                        ) : (
                            <h3 className="text-xl font-semibold mt-4">{name}</h3>
                        )}
                    </div>

                    <div className="mt-6 space-y-4" >
                        <div className="flex  text-gray-700">
                            <MdEmail className="text-blue-500 mr-2" />
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-gray-700 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                                />
                            ) : (
                                <p>Email: {email}</p>
                            )}
                        </div>
                        <div className="flex items-center text-gray-700">
                            <MdPhone className="text-blue-500 mr-2" />
                            <p>Phone:</p>
                        </div>
                    </div>

                    <button
                        className="flex items-center justify-center mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={isEditing ? handleSave : handleEditClick}
                    >
                        {isEditing ? <MdSave className="mr-2" /> : <MdEdit className="mr-2" />}
                        {isEditing ? 'Save' : 'Edit Profile'}
                    </button>
                </div>
            </div>
                   </main>
        </div>
    );
};

export default AdminAccount;
