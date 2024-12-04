import React, { useEffect, useState } from "react";
import SuppliyerSidebar from "../../Components/SuppliyerSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

const SpecificReport = () => {
  const { id } = useParams();
  const [supplierId, setSupplierId] = useState(null);
  const [reports, setReports] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedSupplier = localStorage.getItem("supplire");
    if (storedSupplier) {
      const supplier = JSON.parse(storedSupplier);
      setSupplierId(supplier.id);
    } else {
      console.log("Supplier not found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (!supplierId) return;

    const fetchReport = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/suplierReport/report/${id}/${supplierId}`
        );
        setReports(response.data.reports);
      
      } catch (error) {
        setError("Error loading reports.");
        console.error(error);
      }
    };
    fetchReport();
  }, [supplierId, id]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!reports) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <>
      <div>
        <SuppliyerSidebar />
      </div>

      <div className="p-3 ml-[290px]">
        <div className="bg-blue-50 shadow rounded-lg h-[1400px] p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            Report Information
          </h1>

          <table className="min-w-full border-collapse border border-gray-200 mt-12">
            <thead>
              {/* Heading Row */}
              <tr className="bg-blue-200">
                <th
                  className="border border-gray-300 px-4 py-4 text-left font-semibold"
                  colSpan="4"
                >
                  Users Information
                </th>
              </tr>

              {/* Column Headers */}
              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
                  OrderId
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?._id || "N/A"}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
                  PicUp date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?.date || "N/A"}
                </th>
              </tr>

              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
                  UserId
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?.user || "N/A"}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
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
            </thead>
          </table>

          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 mt-20">
            Order Information
          </h1>

          {/* Second Table */}
                   {/* Second Table */}
                   <table className="min-w-full border-collapse border border-gray-200">
            
              <tr className="bg-blue-200">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Items
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Weight
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Amount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Remarks
                </th>
              </tr>
          
            <tbody>
              {reports?.items?.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {item.item || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {item.weight || "N/A"} kg
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    ₹{item.amount || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
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



 {/* Order details */}

 
 <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 mt-20">
            Order details
          </h1>


          <table className="min-w-full border-collapse border border-gray-200">
          <tr className="bg-blue-200">
                <th
                  className="border border-gray-300 px-4 py-4 text-left font-semibold"
                  colSpan="4"
                >
                   Order details
                  
                </th>
              </tr>
              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
               Adress
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?.adress || "N/A"}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
                  PicUp date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?.date || "N/A"}
                </th>
              </tr>
              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
                 Distric
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {reports?.orderId?.distric || "N/A"}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
                Vehicale
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {reports?.orderId?.vehical || "N/A"}
                </th>
              </tr>



</table>




  {/* Paymaent datils table */}


  <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 mt-20">
           payment details
          </h1>


          <table className="min-w-full border-collapse border border-gray-200">

          <tr className="bg-blue-200">
                <th
                  className="border border-gray-300 px-4 py-4 text-left font-semibold"
                  colSpan="4"
                >
                  payment details
                  
                </th>
              </tr>
          


              <tr
                 
                   className="border-gray-300  bg-blue-100 "
                >
                  <td className="border border-gray-300 px-4 py-2 text-gray-700  font-bold bg-blue-100">
                Account Holder Name
                  </td>
                  <td className="border bg-white px-4 py-2 text-gray-700">
                  {reports?.paymentDetails?.accountHolderName || "N/A"}
                  </td>
                 
                </tr>


              <tr className="border-gray-300 "
                >
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 w-[200px] font-bold bg-blue-100">
                  Account number
                  </td>
                  <td className="border bg-white px-4 py-2 text-gray-700">
                  {reports?.paymentDetails?.accountNumber || "N/A"}
                  </td>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
              IFSC 
                </th>
                  <th className="border border-gray-300 bg-white px-4 py-2 text-left font-semibold bg-blue-100">
                  {reports?.paymentDetails?.ifscCode || "N/A"}
                </th>
                 
                </tr>


            </table>





        </div>
      </div>
    </>
  );
};

export default SpecificReport;
