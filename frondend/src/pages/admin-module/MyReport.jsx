import React, { useEffect, useState } from "react";
import SuppliyerSidebar from "../../Components/SuppliyerSidebar";
import axios from "axios";

const MyReport = () => {
  const [reports, setReports] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error handling

  // Retrieve supplier ID from localStorage
  useEffect(() => {
    const storedSupplier = localStorage.getItem("supplire");
    if (storedSupplier) {
      const supplier = JSON.parse(storedSupplier);
      setSupplierId(supplier.id);
    } else {
      console.log("Supplier not found in localStorage");
    }
  }, []);

  // Fetch reports from backend
  useEffect(() => {
    if (supplierId) {
      const fetchReports = async () => {
        try {
          setLoading(true); // Start loading
          setError(""); // Reset error state
          const response = await axios.get(`/suplierReport/reportes/${supplierId}`);
           console.log("resposne",response);

          if (response.data?.reports) {
            setReports(response.data);
          } else {
            setReports([]); // Handle unexpected data structure
          }
        } catch (err) {
          console.error("Error fetching reports:", err);
          setError("Failed to fetch reports. Please try again later.");
        } finally {
          setLoading(false); // Stop loading
        }
      };
      fetchReports();
    }
  }, [supplierId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SuppliyerSidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800">My Reports</h1>

        {/* Conditional rendering */}
        {loading && (
          <p className="mt-4 text-center text-gray-500">Loading reports...</p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}
        {!loading && !error && reports.length === 0 && (
          <p className="mt-4 text-center text-gray-500">No reports available.</p>
        )}
        {!loading && !error && reports.length > 0 && (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-200"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order ID: {report.orderId || "N/A"}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Items:</span>{" "}
                    {report.items?.join(", ") || "No items listed"}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Total Weight:</span>{" "}
                    {report.totalWeight || "0"} kg
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Total Amount:</span> ₹
                    {report.totalAmount || "0"}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Payment:</span>{" "}
                    {report.paymentDetails?.method || "N/A"}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        report.status === "completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {report.status || "Unknown"}
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
