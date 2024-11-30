import React, { useEffect, useState } from "react";
import axios from "axios";
import SuppliyerSidebar from "../../Components/SuppliyerSidebar";
import { useNavigate } from "react-router-dom";

const MyReport = () => {
  const [supplierId, setSupplierId] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate=useNavigate();

  // Fetch supplier ID from local storage
  useEffect(() => {
    const storedSupplier = localStorage.getItem("supplire");
    if (storedSupplier) {
      const supplier = JSON.parse(storedSupplier);
      setSupplierId(supplier.id);
    } else {
      console.log("Supplier not found in localStorage");
    }
  }, []);

  // Fetch reports based on supplier ID
  useEffect(() => {
    if (!supplierId) return;

    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/suplierReport/report/${supplierId}`
        );
        setReports(response.data.reports || []);
        
        console.log("responseee",response)
        setLoading(false);
      } catch (err) {
        setError("Error loading reports.");
        setLoading(false);
      }
    };

    fetchReports();
  }, [supplierId]);

  return (
    <div className="flex min-h-screen bg-whait-100">
      <SuppliyerSidebar />
      <main className="flex-1 p-6 ml-[295px]">
        <h1 className="text-2xl font-bold text-gray-800">My Reports</h1>

        {/* Loading or Error Handling */}
        {loading ? (
          <p className="mt-4 text-center text-gray-500">Loading reports...</p>
        ) : error ? (
          <p className="mt-4 text-center text-red-500">{error}</p>
        ) : reports?.length === 0 ? (
          <p className="mt-4 text-center text-gray-500">No reports available.</p>
        ) : (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"  >
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-200"
                  onClick={() => navigate(`/specificReport/${report?._id}`)}
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order ID: {report?.orderId?._id || "N/A"}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Items:</span>
                    {report?.items?.length > 0 ? (
                      report?.items.map((item, idx) => (
                        <span key={idx} className="block">
                          {item?.item} - {item?.weight} kg - ₹{item?.amount}
                        </span>
                      ))
                    ) : (
                      "No items listed"
                    )}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Total Weight:</span>{" "}
                    {report?.totalWeight} kg
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Total Amount:</span> ₹
                    {report?.totalAmount}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Payment:</span>
                    {report.paymentDetails ? (
                      <span>
                        {report?.paymentDetails?.accountNumber} (
                        {report?.paymentDetails?.accountHolderName})
                      </span>
                    ) : (
                      "Not yet processed"
                    )}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        report?.orderId?.status === "compleated"
                          ? "text-white bg-green-500"
                          : "text-white bg-yellow-500"
                      }`}
                    >
                      {report?.orderId?.status || "Unknown"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyReport;
