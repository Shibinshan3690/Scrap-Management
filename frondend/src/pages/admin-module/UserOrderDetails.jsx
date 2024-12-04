import React, { useEffect, useState } from 'react';
import Adminsidebar from './Adminsidebar';
import { useParams } from 'react-router-dom';
import adminApi from '../../api/adminInterceptor';
import suplireApi from "../../api/suplyerinterceptor";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';



const SupplierAssignment = ({ suppliers, onAssign }) => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.district?.toLowerCase().includes(filterDistrict.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedSupplier) {
      onAssign(selectedSupplier); 
    } else {
      alert("Please select a supplier");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Assign Supplier
      </h2>
      <div className="mb-4">
        <label htmlFor="filter-district" className="block text-gray-600 font-medium mb-2">
          Filter by District
        </label>
        <input
          id="filter-district"
          type="text"
          placeholder="Enter district name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          value={filterDistrict}
          onChange={(e) => setFilterDistrict(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="supplier-list" className="block text-gray-600 font-medium mb-2">
          Select a Supplier
        </label>
        <select
          id="supplier-list"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
        >
          <option value="" disabled>
            Select Supplier
          </option>
          {filteredSuppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.name} - {supplier.district || "No district info"}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleAssign}
          className="bg-yellow-500 text-white px-6 py-2 rounded-md font-bold hover:bg-yello-600 transition duration-200"
        >
          Assign Supplier
        </button>
      </div>
    </div>
  );
};


const UserOrderDetails = () => {
  const { id } = useParams();
  const [userOrder, setUserOrder] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state



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


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await adminApi.get(`/getOrderById/${id}`);
        setUserOrder(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setError("Failed to fetch order details");
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await suplireApi.get('/allSupplires');
        setSuppliers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch suppliers", error);
      }
    };

    fetchOrderDetails();
    fetchSuppliers();
  }, [id]);

  const assignSupplier = async (supplierId) => {
    setLoading(true); 
    try {
      const response = await adminApi.post(`/assignSupplier/${id}`, { supplierId });
       console.log("resposne" ,response)
       toast.success(response.data.message); 
   
      setUserOrder((prevOrder) => ({
        ...prevOrder,
        assignedSupplier: response.data.assignedSupplier,
      }));
      setLoading(false); 
    } catch (error) {
      console.error("Failed to assign supplier", error);
      alert("Failed to assign supplier");
      setLoading(false);
    }
  };
  

  return (
    <div className="flex  min-h-screen bg-yellow-400">
      <Adminsidebar unreadCount={unreadCount}/>
      <ToastContainer/>
      <main className="flex-1 ">
      <div className="flex flex-col bg-white ml-[270px] w-[1400px] h-[710px] mt-[15px] rounded-lg">
        <div className="flex flex-col h-[710px]">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full h-full flex flex-col space-y-6">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            {userOrder ? (
              <>
                <div className="border  bg-yellow-300 p-4 flex items-center rounded-lg justify-center">
                <span className="font-bold text-2xl">
                Order To Supplier
                </span>
                </div>

                <div className="grid  sm:grid-cols-3 gap-2 border p-3 ">
                  <div className="flex ">
                    <span className="text-gray-600  font-bold">Customer Name :</span>
                    <span className="text-gray-900 font-medium ml-5">{userOrder?.user?.name || 'N/A'}</span>
                  </div>
                  <div className="flex ">
                    <span className="text-gray-600 font-bold">Phone Number :</span>
                    <span className="text-gray-900 font-medium  ml-5">{userOrder.phoneNumber}</span>
                  </div>
                  <div className="flex ">
                    <span className="text-gray-600 font-bold">Address :</span>
                    <span className="text-gray-900 font-medium ml-5">{userOrder.adress}</span>
                  </div>
                  <div className="flex ">
                    <span className="text-gray-600 font-bold  ">District :</span>
                    <span className="text-gray-900 font-medium ml-4">{userOrder.distric}</span>

                  </div>
                  <div className="flex ">
                    <span className="text-gray-600 font-bold">picUp date</span>
                    <span className="text-gray-900 font-medium ml-5">{userOrder.date}</span>

                  </div>
                  <div className="flex ">
                    <span className="text-gray-600 font-bold">picUp date</span>
                    <span className="text-gray-900 font-medium ml-5">{userOrder.status}</span>

                  </div>
                </div>
                <SupplierAssignment suppliers={suppliers} onAssign={assignSupplier} />
              </>
            ) : (
              <p className="text-center text-gray-500">Loading order details...</p>
            )}
          </div>
        </div>
      </div>
      </main>
    </div>
  );
};

export default UserOrderDetails;
