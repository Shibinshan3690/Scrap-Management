import React, { useEffect, useState } from 'react';
import Adminsidebar from './Adminsidebar';
import { useParams } from 'react-router-dom';
import adminApi from '../../api/adminInterceptor';
import axios from 'axios';

const OrderTimeline = ({ status }) => {
  const stages = ["Placed", "Processed", "Shipped", "Delivered"];
  return (
    <div className="timeline flex justify-between items-center gap-4 mb-6">
      {stages.map((stage, index) => (
        <div key={index} className={`flex-1 text-center ${status === stage ? 'font-semibold text-blue-600' : 'text-gray-400'}`}>
          <span>{stage}</span>
        </div>
      ))}
    </div>
  );
};

const OrderNotes = ({ notes }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-6 flex flex-col">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Notes</h2>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      {notes.map((note, index) => (
        <li key={index}>{note}</li>
      ))}
    </ul>
  </div>
);

const ProductDetails = ({ productName, category, weight }) => (
  <div className="p-4 border-t border-gray-200 flex flex-col">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">Product Details</h2>
    <p className="text-gray-700">Name: {productName}</p>
    <p className="text-gray-700">Category: {category || "N/A"}</p>
    <p className="text-gray-700">Weight: {weight || "N/A"} kg</p>
  </div>
);

const PaymentInfo = ({ paymentMethod, status, transactionId }) => (
  <div className="p-4 bg-gray-50 rounded-lg shadow-md mt-6 flex flex-col">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">Payment Information</h2>
    <p className="text-gray-700">Method: {paymentMethod}</p>
    <p className={`text-gray-700 ${status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>Status: {status}</p>
    <p className="text-gray-700">Transaction ID: {transactionId || "N/A"}</p>
  </div>
);

const UserOrderDetails = () => {
  const { id } = useParams();
  const [userOrder, setUserOrder] = useState(null);
  const [error, setError] = useState(null);
  const [notes] = useState(["Delivered to gate", "Pending payment approval"]); // Example notes
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getOrderById = async () => {
      try {
        const response = await adminApi.get(`/getOrderById/${id}`);
        setUserOrder(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setError("Failed to fetch order details");
      }
    };
    getOrderById();
  }, [id]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notification/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Adminsidebar unreadCount={unreadCount} />
      <div className="flex flex-col bg-white ml-[275px] w-[1400px] h-[710px] mt-[15px] rounded-lg">
        <div className="  flex flex-col h-[710px]">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full h-full flex flex-col space-y-6">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            {userOrder ? (
              <>
                <OrderTimeline status={userOrder.status} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-gray-600">Customer Name</span>
                    <span className="text-gray-900 font-medium">{userOrder?.user?.name || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600">Phone Number</span>
                    <span className="text-gray-900 font-medium">{userOrder.phoneNumber}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600">Address</span>
                    <span className="text-gray-900 font-medium">{userOrder.adress}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600">Pincode</span>
                    <span className="text-gray-900 font-medium">{userOrder.pincode}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600">Order Date</span>
                    <span className="text-gray-900 font-medium">{new Date(userOrder.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600">Order Status</span>
                    <span className={`px-3 py-1 inline-flex rounded-full text-sm font-semibold ${
                      userOrder.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      userOrder.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {userOrder.status || "N/A"}
                    </span>
                  </div>
                </div>

                <ProductDetails 
                  productName={userOrder.productName} 
                  category={userOrder.category} 
                  weight={userOrder.weight} 
                />

                <PaymentInfo 
                  paymentMethod={userOrder.paymentMethod || "Credit Card"}
                  status={userOrder.paymentStatus || "Completed"}
                  transactionId={userOrder.transactionId}
                />

                <OrderNotes notes={notes} />
              </>
            ) : (
              <p className="text-center text-gray-500">Loading order details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetails;
