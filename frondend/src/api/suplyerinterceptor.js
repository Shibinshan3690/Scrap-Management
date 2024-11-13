import axios from 'axios';

// Create an axios instance with the base URL from environment variables
const susupplierApi = axios.create({
    baseURL: import.meta.env.VITE_SUPPLIRE_URL
});

// Request Interceptor: Adds authorization headers (if needed) and logs the request
susupplierApi.interceptors.request.use(
    (config) => {
        // Add an authorization token if available (optional)
        const token = localStorage.getItem('supplierToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Log request details

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor: Handles success and errors for responses
susupplierApi.interceptors.response.use(
    (response) => {
        // Handle the response data
        
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        
        // Optional: Custom error handling
        if (error.response && error.response.status === 401) {
            // Redirect to login page if unauthorized
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default susupplierApi;
