import React, { useEffect, useState } from "react";
import Adminsidebar from "./Adminsidebar";
import adminApi from "../../api/adminInterceptor";
import { useParams } from "react-router-dom";
import {loadStripe}  from "@stripe/stripe-js";

const AdminSpecificReport = () => {
  const { id } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [reports, setReports] = useState(null);
  const [error, setError] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/notification/notifications"
        );
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    const fetchReportAdmin = async () => {
      try {
        const response = await adminApi.get(`/getReportSpecifycAdmin/${id}`);
        console.log("response", response);
        setReports(response.data.reports);
      } catch (error) {
        setError("Error loading reports.");
        console.error(error);
      }
    };
    fetchReportAdmin();
  }, [id]);


  const handlePayment = () => {
    setPaymentDetails(reports?.paymentDetails || {});
    setIsPaymentModalOpen(true);
  };

  const closeModal = () => {
    setIsPaymentModalOpen(false);
  };


  const handleConfirmPayment = async () => {
    console.log("Processing payment with details:", paymentDetails);
    setIsPaymentModalOpen(false);
  
    try {
      const stripe = await loadStripe("pk_test_51OV6f7SEIbhFRslyOxy8GDuyaH1LAFqqS3lqKIKypdCymcUoQ2XkwmIVKDwsE6XrwxjJceHy35e54KrkTbugUYbN00G2SoxSWZ");
      
      const response = await adminApi.post("/makePayment", {
        accountHolderName: paymentDetails.accountHolderName,
        totalAmount: reports?.totalAmount,
      });
        console.log("response",response);
  
      if (response.data?.url) {
     
        window.location.href = response.data.url;
      } else {
        console.error("Error: Payment URL not returned.");
      }
    } catch (error) {
      console.error("Payment failed:", error.message);
    }
  };
  
  return (
    <>
      <div className="flex  min-h-screen bg-yellow-400">
        <Adminsidebar unreadCount={unreadCount} />

        <main className="flex-1 " style={{marginTop:"14px"}}>
          <div className="bg-white h-[715px] w-[1420px] shadow-md p-6 ml-[270px] overflow-y-scroll rounded-3xl">
            <h1 className="text-1xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-400 pb-2">
              ReportsByOrder
            </h1>

            <table className="min-w-full border-collapse border border-yellow-400 ">
              <thead>
                {/* Heading Row */}
                <tr className="bg-yellow-300">
                  <th
                    className="border border-yellow-400 px-2 py-2  text-left font-semibold"
                    colSpan="4"
                  >
                    Users Information
                  </th>
                </tr>

                {/* Column Headers */}
                <tr className="bg-white">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                    OrderId
                  </th>
                  <th className="border border-gray-300 bg-white px-4 py-2 text-left">
                    {reports?.orderId?._id || "N/A"}
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                    PicUp date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    {reports?.orderId?.date || "N/A"}
                  </th>
                </tr>

                <tr className="bg-white">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                    UserId
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    {reports?.orderId?.user || "N/A"}
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                    Status
                  </th>
                  <th
                    className={`border border-gray-300 px-4 py-2 text-left ${
                      reports?.orderId?.status === "compleated"
                        ? "bg-green-200"
                        : "bg-red-200"
                    }`}
                  >
                    {reports?.orderId?.status || "N/A"}
                  </th>
                </tr>
                <tr className="bg-white">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold  bg-yellow-100">
                    SupplierId
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    {reports?.supplierId || "N/A"}
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                    Create time
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    <span>
                      {reports?.createdAt
                        ? new Date(reports.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })
                        : "N/A"}
                    </span>
                  </th>
                </tr>
              </thead>
            </table>

            {/* second table */}

            <h1 className="text-1xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-400 pb-2 mt-10">
              Order Information
            </h1>

            <table className="min-w-full border-collapse border border-gray-200">
              <tr className="bg-yellow-300">
                <th className="border border-gray-300 px-2 py-2  text-left font-semibold">
                  Items
                </th>
                <th className="border border-gray-300 px-2 py-2  text-left font-semibold">
                  Weight
                </th>
                <th className="border border-gray-300 px-2 py-2  text-left font-semibold">
                  Amount
                </th>
                <th className="border border-gray-300 px-2 py-2 text-left font-semibold">
                  Remarks
                </th>
              </tr>

              <tbody>
                {reports?.items?.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 px-4 py-2 bg-yellow-100 text-gray-700">
                      {item.item || "N/A"}
                    </td>
                    <td className="border border-gray-300 bg-white px-4 py-2 text-gray-700">
                      {item.weight || "N/A"} kg
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white text-gray-700">
                      ₹{item.amount || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white text-gray-700">
                      {item.remarks || "N/A"}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-200 font-bold">
                  <td className="border border-gray-300 px-4 py-2">Total</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {reports?.totalWeight || "N/A"} kg
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{reports?.totalAmount || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
              </tbody>
            </table>

            {/* Order deatils */}

            <h1 className="text-1xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-400 pb-1 mt-10">
              Order details
            </h1>

            <table className="min-w-full border-collapse border border-gray-200">
              <tr className="bg-yellow-400">
                <th
                  className="border border-gray-300 px-2 py-2  text-left font-semibold"
                  colSpan="4"
                >
                  Order details
                </th>
              </tr>
              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                  Address
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?.adress || "N/A"}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                  Pincode
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?.pincode || "N/A"}
                </th>
              </tr>
              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                  Distric
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?.distric || "N/A"}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                  Vehicale
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?.vehical || "N/A"}
                </th>
              </tr>
            </table>

            <h1 className="text-1xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-400 pb-2 mt-20">
              payment details
            </h1>

            <table className="min-w-full border-collapse border border-gray-200">
              <tr className="bg-yellow-400">
                <th
                  className="border border-gray-300 px-2 py-2 text-left font-semibold"
                  colSpan="4"
                >
                  payment details
                </th>
              </tr>

              <tr className="border-gray-300  bg-yellow-100 ">
                <td className="border border-gray-300 px-4 py-2 text-gray-700  font-bold bg-yellow-100">
                  Account Holder Name
                </td>
                <td className="border bg-white px-4 py-2 text-gray-700">
                  {reports?.paymentDetails?.accountHolderName || "N/A"}
                </td>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-yellow-100">
                  IFSC
                </th>
                <th className="border border-gray-300 bg-white px-4 py-2 text-left font-semibold bg-blue-100">
                  {reports?.paymentDetails?.ifscCode || "N/A"}
                </th>
              </tr>

              <tr className="border-gray-300 ">
                <td className="border border-gray-300 px-4 py-2 text-gray-700 w-[200px] font-bold bg-yellow-100">
                  Account number
                </td>
                <td className="border bg-white px-4 py-2 text-gray-700">
                  {reports?.paymentDetails?.accountNumber || "N/A"}
                </td>
                
                    <td colSpan="2">
                  <button
                    onClick={handlePayment}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Pay Now
                  </button>
                </td>
              </tr>
              
            </table>
          </div>
        </main>
      </div>


 {/* Payment Modal */}


 {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>
            <p className="mb-4">
              Please confirm the payment for the account holder:{" "}
              <strong>{paymentDetails.accountHolderName || "N/A"}</strong>
            </p>
            <p className="mb-4">Amount: ₹{reports?.totalAmount || "N/A"}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}




    </>
  );
};

export default AdminSpecificReport;
