import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Adminsidebar from './Adminsidebar'

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notification/notifications');
        setNotifications(response.data);
          console.log("response",response.data)
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

      // total notification count code 


         const unreadCount=notifications.filter(notification=>!notification.isRead).length;
  return (
<>



    <div>
        <Adminsidebar  unreadCount={unreadCount}/>
    </div>

    <div className="notifications mx-auto  " >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6  border-gray-300 pb-2" style={{marginTop:"-320px",marginLeft:"-900px"}}>
          Notifications
        </h2>

        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification?._id}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 transition duration-800 ease-in-out
                         border-blue-500 hover:bg-blue-50"
                         style={{width:"800px",marginLeft:"-270px"}}
            >
              <p className="text-gray-700 font-medium">{notification?.message} </p>
              <span className="text-sm text-gray-500">
                {new Date(notification?.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

</>
  )
}

export default Notification