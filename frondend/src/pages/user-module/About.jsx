import React from "react";
import Nav from "./Nav";

const About = () => {
  return (
    <>
      <Nav />

      {/* Header Section */}
      <div className="bg-gradient-to-r bg- text-black py-16 bg-yellow-100">
       
        <p className="text-lg max-w-2xl mx-auto">
          Our mission is to deliver exceptional solutions and create a positive
          impact in the industry through creativity, innovation, and dedication.
        </p>
      </div>

      {/* Mission Section */}
      <section className="py-20 bg-yellow-100 ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center leading-7">
          We strive to deliver high-quality solutions that empower businesses
          and individuals to succeed in a fast-paced, ever-evolving world. Our
          team is committed to continuous improvement and staying at the
          forefront of industry advancements.
        </p>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-yellow-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          <div className="text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb5BowdE-aW2fT-TrqxyNRQxXbnsqcltOvSO3XD6xWqystOUMCvNwIJA81tTtQdTqxhOM&usqp=CAU"
              alt="John Doe"
              className="w-44 h-44 mx-auto rounded-full shadow-md hover:scale-105 transition-transform"
            />
            <h3 className="text-xl font-semibold mt-4">John Doe</h3>
            <p className="text-gray-600">CEO</p>
          </div>
          <div className="text-center">
            <img
              src="https://www.shutterstock.com/image-photo/portrait-handsome-caucasian-man-formal-600nw-2142820441.jpg"
              alt="Jane Smith"
              className="w-44 h-44 mx-auto rounded-full shadow-md hover:scale-105 transition-transform"
            />
            <h3 className="text-xl font-semibold mt-4">Jane Smith</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r bg-yellow-100 text-blaxk text-center">
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="text-lg max-w-2xl mx-auto leading-7 mb-6">
          Have questions or want to learn more? Feel free to reach out to us.
          Our team is here to help you with any inquiries or support you need.
        </p>
        <button className="px-8 py-3 bg-white text-blue-500 font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200 transition">
          Contact Us
        </button>
      </section>
    </>
  );
};

export default About;
