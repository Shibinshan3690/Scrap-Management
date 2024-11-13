import React, { useState } from 'react';
import axios from 'axios';
import suppireReg from "../../pics/Girl is telling about the online account.mp4";
import susupplierApi from '../../api/suplyerinterceptor';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const SupplierHome = () => {
    const navigate=useNavigate();
    const [supplierData, setSupplierData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        state: '',
        district: '',
        streetAddress: '',
        zipCode: '',
        gender: '',
        age: '',
        category: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setSupplierData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await susupplierApi.post('/supplireReg', supplierData);
        setSuccessMessage(response.data.message);
        toast.success(response.data.message)
            navigate("/dasboard")

            setErrorMessage('');
            console.log("responseREgisstarion ",response);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
            setSuccessMessage('');
        }
    };

    const keralaDistricts = [
        "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", 
        "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", 
        "Kozhikode", "Wayanad", "Kannur", "Kasargod"
    ];

    return (

        <div className="bg-gray-50 flex items-center justify-center" style={{ padding: "30px", height: "800px", marginTop: "-20px" }}>
              <ToastContainer/>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full h-[700px]">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Registration</h1>
                <p className="text-center text-gray-600 mb-8">Please fill in the details below to register as a supplier.</p>
                
                {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
                {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}


                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ml-[150px] h-[400px]">
                       <div className="form-group">
                            <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={supplierData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={supplierData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactNumber" className="block text-gray-700">Contact Number</label>
                            <input
                                type="text"
                                id="contactNumber"
                                name="contactNumber"
                                value={supplierData.contactNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state" className="block text-gray-700">State</label>
                            <select
                                id="state"
                                name="state"
                                value={supplierData.state}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                                required
                            >
                                <option value="">Select State</option>
                                <option value="Kerala">Kerala</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="district" className="block text-gray-700">District</label>
                            <select
                                id="district"
                                name="district"
                                value={supplierData.district}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                                disabled={supplierData.state !== "Kerala"}
                                required
                            >
                                <option value="">Select District</option>
                                {keralaDistricts.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="streetAddress" className="block text-gray-700">Street Address</label>
                            <input
                                type="text"
                                id="streetAddress"
                                name="streetAddress"
                                value={supplierData.streetAddress}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="zipCode" className="block text-gray-700">Zip Code</label>
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={supplierData.zipCode}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender" className="block text-gray-700">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={supplierData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="age" className="block text-gray-700">Age</label>
                            <select
                                id="age"
                                name="age"
                                value={supplierData.age}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                                required
                            >
                                <option value="">Select Age Range</option>
                                <option value="18-25">18-25</option>
                                <option value="26-30">26-30</option>
                                <option value="31-35">31-35</option>
                                <option value="36-40">36-40</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category" className="block text-gray-700">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={supplierData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-600"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="raw_materials">Raw Materials</option>
                                <option value="finished_goods">Finished Goods</option>
                                <option value="services">Services</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                            Register Supplier
                        </button>
                    </div>
                </form>
                <div style={{ width: "400px", height: "400px", marginTop: "-600px" }}>
                    <video
                        className="bg-gray rounded-full animate-pulse"
                        loop
                        autoPlay
                        muted
                        src={suppireReg}
                        style={{ height: "400px", width: "400px", marginTop: "-90px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SupplierHome;
