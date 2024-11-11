import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { AiOutlineCalendar, AiOutlinePhone, AiOutlineEnvironment, AiOutlineInfoCircle, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaProductHunt, FaTruck } from 'react-icons/fa';
import adminApi from '../../api/adminInterceptor';

const UserGetById = () => {
  const { id } = useParams();
  const [userOrder, setUserOrder] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <>
     <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <div>
        <AdminSidebar />

        <div className="flex flex-col  ml-[270px] mt-[15px]">
          

          {/* Order Details Container */}
          <div
            className="bg-white  md:w-1/1 lg:w-1/2 p-8 shadow-lg rounded-lg border border-gray-200" style={{width:"1300px"}}
          >
            {userOrder ? (
              <div className="flex flex-col gap-5">
                <OrderDetail 
                  icon={<FaProductHunt className="text-yellow-500" />} 
                  label="Product Name" 
                  value={userOrder.productName} 
                />
                <OrderDetail 
                  icon={<FaTruck className="text-green-500" />} 
                  label="Vehicle" 
                  value={userOrder.vehical} 
                />
                <OrderDetail 
                  icon={<AiOutlinePhone className="text-blue-500" />} 
                  label="Phone Number" 
                  value={userOrder.phoneNumber} 
                />
                <OrderDetail 
                  icon={<AiOutlineEnvironment className="text-purple-500" />} 
                  label="Address" 
                  value={userOrder.adress} 
                />
                <OrderDetail 
                  icon={<AiOutlineInfoCircle className="text-gray-500" />} 
                  label="Description" 
                  value={userOrder.description} 
                />
                <OrderDetail 
                  icon={<AiOutlineEnvironment className="text-indigo-500" />} 
                  label="Pincode" 
                  value={userOrder.pincode} 
                />
                <OrderDetail 
                  icon={<AiOutlineCalendar className="text-red-500" />} 
                  label="Order Date" 
                  value={new Date(userOrder.date).toLocaleDateString()} 
                />
                <OrderDetail 
                  icon={<AiOutlineCalendar className="text-red-500" />} 
                  label="Delivery Date" 
                  value={userOrder.deliveryDate ? new Date(userOrder.deliveryDate).toLocaleDateString() : "N/A"} 
                />
                <OrderDetail 
                  icon={<AiOutlineInfoCircle className="text-gray-500" />} 
                  label="Order Status" 
                  value={userOrder.status ? userOrder.status : "Pending"} 
                />
                {/* Additional Details */}
                <OrderDetail 
                  icon={<AiOutlineDollarCircle className="text-green-500" />} 
                  label="Order Total" 
                  value={`$${userOrder.totalAmount || '0.00'}`} 
                />
                <OrderDetail 
                  icon={<AiOutlineInfoCircle className="text-blue-500" />} 
                  label="Payment Status" 
                  value={userOrder.paymentStatus ? userOrder.paymentStatus : "Unpaid"} 
                />
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading order details...</p>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

// Component to display individual order details with icon and animation
const OrderDetail = ({ icon, label, value }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm transition transform hover:scale-105 duration-200 hover:bg-yellow-50">
    <div className="text-xl mr-4">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-gray-500 font-semibold">{label}</p>
      <p className="text-gray-900">{value}</p>
    </div>
  </div>
);

export default UserGetById;
