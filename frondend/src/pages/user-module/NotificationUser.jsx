import React, { useState } from "react";
import Nav from "./Nav";  // Ensure Nav is correctly imported
import { IoIosNotifications } from "react-icons/io"; // Notification icon
import Modal from "./Modal"; // Profile modal or Notification modal

const NotificationUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Sample notifications data
  const notifications = [
    { id: 1, title: "Order Shipped", message: "Your order #1234 has been shipped." },
    { id: 2, title: "New Message", message: "You have received a new message from support." },
    { id: 3, title: "Price Update", message: "The price for your selected scrap items has been updated." },
  ];

  const handleOpenModal = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <> 
      <div  style={{marginTop:"365px"}}>
      <Nav />
      </div>
  
      <div className="min-h-screen bg-gray-100 pt-4 px-6">
        <div className=" mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold mb-6">Notifications</h1>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-gray-50 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-200"
                onClick={() => handleOpenModal(notification)}
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">{notification.title}</h3>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <p className="text-gray-700">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">{selectedNotification.title}</h2>
            <p className="text-gray-700 mb-6">{selectedNotification.message}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NotificationUser;
