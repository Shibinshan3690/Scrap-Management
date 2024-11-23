import React from "react";
import SuppliyerSidebar from "../../Components/SuppliyerSidebar";

const Report = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <SuppliyerSidebar />
      <div className="flex-grow p-2 ml-[295px] rounded-lg">
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
      {[{ item: "Newspaper", todayRate: 30, weight: "15 kg", amount: "$45", remarks: "Good condition" },
        { item: "Books", todayRate: 20, weight: "10 kg", amount: "$30", remarks: "Slightly torn" },
        { item: "Cardboard", todayRate: 50, weight: "20 kg", amount: "$50", remarks: "No issues" },
        { item: "Soft Plastic", todayRate: 40, weight: "8 kg", amount: "$24", remarks: "Clean" },
        { item: "Hard Plastic", todayRate: 25, weight: "12 kg", amount: "$36", remarks: "Some damaged" },
        { item: "Iron", todayRate: 15, weight: "50 kg", amount: "$75", remarks: "Rusty" },
        { item: "Steel", todayRate: 10, weight: "40 kg", amount: "$120", remarks: "Heavy" },
        { item: "Copper", todayRate: 8, weight: "5 kg", amount: "$60", remarks: "Valuable" },
        { item: "E-waste", todayRate: 20, weight: "7 kg", amount: "$14", remarks: "Recyclable" },
        { item: "Cotton Waste", todayRate: 18, weight: "6 kg", amount: "$18", remarks: "Reusable" }
      ].map((product, index) => (
        <tr key={index}>
          <td className="border border-gray-300 px-4 py-2">{product.item}</td>
          <td className="border border-gray-300 px-4 py-2">{product.todayRate}</td>
          <td className="border border-gray-300 px-4 py-2">
            <input
              type="text"
              value={product.weight}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </td>
          <td className="border border-gray-300 px-4 py-2">
            <input
              type="text"
              value={product.amount}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </td>
          <td className="border border-gray-300 px-4 py-2">
          <input
              type="text"
              value={product.remarks}
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
              placeholder="tottal weghit"
              value=""
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </td>
        <td className="border px-4 py-2">
        <input
              type="number"
              placeholder="tottal amount"
              value=""
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </td>

        <td className="border px-4 py-2">--</td>
      </tr>
    </tbody>
  </table>
</div>


          {/* Payment and Bank Details - Modal Style */}
          <div className="bg-white p-8 rounded-lg shadow-xl">
  <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
    Payment Order Details
  </h2>
  <form>
    {/* Order ID */}
    <div className="mb-8">
      <label
        htmlFor="orderId"
        className="block text-lg font-semibold text-gray-700 mb-3"
      >
        Order ID:
      </label>
      <input
        type="text"
        id="orderId"
        placeholder="Enter Order ID"
        className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 shadow-sm focus:ring-4 focus:ring-blue-300 focus:outline-none"
        required
      />
    </div>

    {/* Payment Method */}
    <div className="mb-8">
      <label
        htmlFor="paymentMethod"
        className="block text-lg font-semibold text-gray-700 mb-3"
      >
        Payment Method:
      </label>
      <select
        id="paymentMethod"
        className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 shadow-sm focus:ring-4 focus:ring-blue-300 focus:outline-none"
      >
        <option value="online">Online Payment</option>
        <option value="cod">Cash on Delivery</option>
      </select>
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
          placeholder="Enter account number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex-1">
        <label htmlFor="accountHolderName" className="block text-gray-600 font-medium mb-2">
          Account Holder Name:
        </label>
        <input
          type="text"
          id="accountHolderName"
          placeholder="Enter account holder name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>

    <div className="mb-6">
      <label htmlFor="ifscCode" className="block text-gray-600 font-medium mb-2">
        IFSC Code:
      </label>
      <input
        type="text"
        id="ifscCode"
        placeholder="Enter IFSC code"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg py-3 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105 duration-300"
    >
      Submit to Admin
    </button>
  </form>
</div>

        </div>
      </div>
    </div>
  );
};

export default Report;
