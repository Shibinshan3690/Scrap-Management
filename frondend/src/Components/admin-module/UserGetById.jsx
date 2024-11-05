import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Adminsidebar from './Adminsidebar';
import axios from 'axios';

const UserGetById = () => {
  const { id } = useParams();
  const [userOrder, setUserOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrderById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/getOrderById/${id}`);
        console.log("response:", response);
        setUserOrder(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setError("Failed to fetch order details");
      }
    };
    getOrderById();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <>
      <div>
        <Adminsidebar />
        <h1 style={{ marginLeft: "200px", marginTop: "-60px", fontWeight: "600" }}>User Order Details</h1>
        <div
          style={{
            width: "800px",
            margin: "20px auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          {userOrder ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Product Name:</span>
                <span className="text-gray-900">{userOrder.productName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Vehicle:</span>
                <span className="text-gray-900">{userOrder.vehical}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Phone Number:</span>
                <span className="text-gray-900">{userOrder.phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Address:</span>
                <span className="text-gray-900">{userOrder.adress}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Description:</span>
                <span className="text-gray-900">{userOrder.description}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Pincode:</span>
                <span className="text-gray-900">{userOrder.pincode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Date:</span>
                <span className="text-gray-900">{new Date(userOrder.date).toLocaleDateString()}</span>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading order details...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserGetById;
