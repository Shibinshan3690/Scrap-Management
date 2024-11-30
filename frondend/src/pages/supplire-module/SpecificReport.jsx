import React from "react";
import SuppliyerSidebar from "../../Components/SuppliyerSidebar";

const SpecificReport = () => {
  return (
    <>
      <div>
        <SuppliyerSidebar />
      </div>

      <div className="p-3 ml-[290px]">
        <div className="bg-blue-50 shadow rounded-lg h-[800px] p-4">
          {/* First Table */}
          {/* <table className="min-w-full border-collapse border border-gray-200 mt-12" >
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 px-4 py-4  text-left font-semibold">
       Users Information
                </th>
               

             
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold" >
                    UserId
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                67483cd626493fe8a08220a6
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 1, Col 3
                </td>
               
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold">
OrderId
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                67483e5526493fe8a08220d8
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 2, Col 3
                </td>
               
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold">
                supplierId
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    67483d7326493fe8a08220b2
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 3, Col 3
                </td>
               
              </tr>
            </tbody>
          </table> */}



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
    <tr className="bg-blue-200">
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
        Column 1
      </th>
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
        Column 2
      </th>
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
        Column 3
      </th>
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
        Column 4
      </th>
    </tr>
  </thead>
</table>





          {/* Second Table */}
          <table className="min-w-full border-collapse border border-gray-200 mt-28">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Column 1
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Column 2
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Column 3
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Column 4
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Column 5
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 1, Col 1
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 1, Col 2
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 1, Col 3
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 1, Col 4
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 1, Col 5
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 2, Col 1
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 2, Col 2
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 2, Col 3
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 2, Col 4
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 2, Col 5
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 3, Col 1
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 3, Col 2
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 3, Col 3
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 3, Col 4
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Row 3, Col 5
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SpecificReport;
