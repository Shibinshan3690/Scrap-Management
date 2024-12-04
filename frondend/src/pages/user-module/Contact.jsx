import React from "react";
import Nav from "./Nav";

const Contact = () => {
  return (
    <>
      {/* Navigation Bar */}
      <Nav colours="white" />

      {/* Header Section */}
    

      {/* Main Content */}
      <main className=" bg-yellow-100  h-[700px]">
            <form className="space-y-6 bg-yellow-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-100">
                <div className="bg-yellow-100">
                  <label
                    className="block text-gray-600 font-medium mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300 rounded-md  bg-white focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div  className="bg-yellow-100">
                  <label
                    className="block text-gray-600 font-medium mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-300  bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
              <div className="bg-yellow-100">
                <label
                  className="block text-gray-600 font-medium mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Your Message"
                  className="w-full p-8 borderrounded-md  w-[500px] focus:"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-[200px] bg-gradient-to-r bg-black text-white  py-3 rounded-md "
              >
                Submit
              </button>
            </form>
            
     

          {/* Contact Information Section */}
          <div className="grid  grid-cols-1 bg-yellow-100 md:grid-cols-3 gap-8 p-10" style={{marginTop:"-100px"}}>
            <div className="bg-gradient-to-r bg-black text-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-white text-lg">(123) 456-7890</p>
            </div>
            <div className="bg-gradient-to-r bg-black text-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-white text-lg">support@scrapmanagement.com</p>
            </div>
            <div className="bg-gradient-to-r bg-black text-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-white text-lg">123 Scrap Street, Green City</p>
            </div>
          </div>
    
      </main>

    </>
  );
};

export default Contact;
