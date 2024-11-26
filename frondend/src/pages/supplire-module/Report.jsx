import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuppliyerSidebar from "../../Components/SuppliyerSidebar";
import axios from "axios"; // Import axios for making API calls

const Report = () => {
  const [data, setData] = useState([
    { item: "Newspaper", todayRate: 30, weight: "", amount: "", remarks: "" },
    { item: "Books", todayRate: 20, weight: "", amount: "", remarks: "" },
    { item: "Cardboard", todayRate: 50, weight: "", amount: "", remarks: "" },
    { item: "Soft Plastic", todayRate: 40, weight: "", amount: "", remarks: "" },
    { item: "Hard Plastic", todayRate: 25, weight: "", amount: "", remarks: "" },
    { item: "Iron", todayRate: 15, weight: "", amount: "", remarks: "" },
    { item: "Steel", todayRate: 10, weight: "", amount: "", remarks: "" },
    { item: "Copper", todayRate: 8, weight: "", amount: "", remarks: "" },
    { item: "E-waste", todayRate: 20, weight: "", amount: "", remarks: "" },
    { item: "Cotton Waste", todayRate: 18, weight: "", amount: "", remarks: "" },
  ]);
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    const storedSupplier = localStorage.getItem('supplire');
    if (storedSupplier) {
      const supplier = JSON.parse(storedSupplier);
      setSupplierId(supplier.id);
      console.log(supplier.id,"suplireId");

    } else {
      console.log("Supplier not found in localStorage");
    }
  }, []);

  const [orderId, setOrderId] = useState(""); 
  const [accountNumber, setAccountNumber] = useState(""); 
  const [accountHolderName, setAccountHolderName] = useState("");
  const [ifscCode, setIfscCode] = useState(""); 

  const handleChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const totalWeight = data.reduce((total, item) => total + parseFloat(item.weight || 0), 0);
  const totalAmount = data.reduce((total, item) => total + parseFloat(item.amount.replace('$', '') || 0), 0);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!orderId) {
      toast.error("Order ID is required!");
      return;
    }
  
    if (!accountNumber || !accountHolderName || !ifscCode) {
      toast.error("Complete bank details are required!");
      return;
    }
  
  
    const hasValidItem = data.some((item) => item.weight && item.amount);
    if (!hasValidItem) {
      toast.error("At least one item must have weight and amount specified!");
      return;
    }
  
    const items = data
      .filter((item) => item.weight && item.amount) 
      .map((item) => ({
        item: item.item,
        weight: item.weight,
        amount: item.amount,
        remarks: item.remarks,
      }));
  
    const paymentDetails = {
      accountNumber,
      accountHolderName,
      ifscCode,
    };
  
    const reportData = {
      orderId,
      items,
      totalWeight,
      totalAmount,
      paymentDetails,
    };
  
    try {
      const response = await axios.post(
        `http://localhost:5000/suplierReport/report/${supplierId}`,
        reportData
      );
      console.log("response", response);
      toast.success(response.data.message);

      setOrderId("");
      setAccountNumber("");
      setAccountHolderName("");
      setIfscCode("");
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          weight: "",
          amount: "",
          remarks: "",
        }))
      );
    } catch (error) {
      console.error(error);
      toast.error("Error submitting report: " + error?.response?.data?.message || error.message);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <SuppliyerSidebar />
      <div className="flex-grow p-4 ml-[295px] rounded-lg">
      <ToastContainer/>
        {/* Page Header */}
        <div className="mb-3 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white py-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold">Pick-up Boy Report</h1>
          <p className="text-lg mt-2">
            Provide order details and payment information for admin review.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Order Summary Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            <table className="w-full border-collapse border border-gray-300 text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Item</th>
                  <th className="border px-4 py-2 text-left">Today's Rate</th>
                  <th className="border px-4 py-2 text-left">Weight</th>
                  <th className="border px-4 py-2 text-left">Amount</th>
                  <th className="border px-4 py-2 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{product.item}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.todayRate}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={product.weight}
                        onChange={(e) => handleChange(index, "weight", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={product.amount}
                        onChange={(e) => handleChange(index, "amount", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={product.remarks}
                        onChange={(e) => handleChange(index, "remarks", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="font-semibold bg-gray-100">
                  <td className="border px-4 py-2">Total</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={totalWeight}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      readOnly
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={totalAmount}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      readOnly
                    />
                  </td>
                  <td className="border px-4 py-2">--</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment and Bank Details - Modal Style */}
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Payment Order Details</h2>
            <form onSubmit={handleSubmit}>
              {/* Order ID */}
              <div className="mb-8">
                <label htmlFor="orderId" className="block text-lg font-semibold text-gray-700 mb-3">
                  Order ID:
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter Order ID"
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 shadow-sm focus:ring-4 focus:ring-blue-300 focus:outline-none"
                  required
                />
              </div>

              {/* Bank Details Section */}
              <div className="mb-6 flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="accountNumber" className="block text-gray-600 font-medium mb-2">
                    Account Number:
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="accountHolderName" className="block text-gray-600 font-medium mb-2">
                    Account Holder Name:
                  </label>
                  <input
                    type="text"
                    id="accountHolderName"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    placeholder="Enter account holder name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* IFSC Code */}
              <div className="mb-8">
                <label htmlFor="ifscCode" className="block text-gray-600 font-medium mb-2">
                  IFSC Code:
                </label>
                <input
                  type="text"
                  id="ifscCode"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  placeholder="Enter IFSC code"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="bg-blue-600 text-white py-2 px-8 rounded-xl shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
