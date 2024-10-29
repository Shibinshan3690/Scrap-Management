import React from 'react';
import Nav from './Nav';

const About = () => {
  return (
    <>
       <div   style={{marginTop:"602px"}}>
      <Nav colours="white"   />
      </div>
      
      <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f4f4f4" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>About Us</h1>
        <p style={{ fontSize: "18px", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
          Our mission is to deliver exceptional solutions to our customers and make a positive impact in the industry. 
          We bring creativity, innovation, and dedication to everything we do.
        </p>
      </div>

      {/* Mission Section */}
      <section style={{ padding: "40px", backgroundColor: "#ffffff" }}>
        <h2 style={{ fontSize: "28px", color: "#333", textAlign: "center", marginBottom: "20px" }}>Our Mission</h2>
        <p style={{ fontSize: "16px", color: "#666", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
          We strive to deliver high-quality solutions that empower businesses and individuals to succeed in a fast-paced, ever-evolving world. 
          Our team is committed to continuous improvement, ensuring we stay at the forefront of industry advancements.
        </p>
      </section>

      {/* Team Section */}
      <section style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ fontSize: "28px", color: "#333", textAlign: "center", marginBottom: "20px" }}>Meet Our Team</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ width: "200px", textAlign: "center" }}>
            <img src="/path/to/image1.jpg" alt="Team Member" style={{ width: "100%", borderRadius: "50%" }} />
            <h3 style={{ fontSize: "18px", marginTop: "10px" }}>John Doe</h3>
            <p style={{ fontSize: "14px", color: "#666" }}>CEO</p>
          </div>
          <div style={{ width: "200px", textAlign: "center" }}>
            <img src="/path/to/image2.jpg" alt="Team Member" style={{ width: "100%", borderRadius: "50%" }} />
            <h3 style={{ fontSize: "18px", marginTop: "10px" }}>Jane Smith</h3>
            <p style={{ fontSize: "14px", color: "#666" }}>CTO</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: "40px", backgroundColor: "#ffffff", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", color: "#333", marginBottom: "20px" }}>Get In Touch</h2>
        <p style={{ fontSize: "16px", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
          Have questions or want to learn more? Feel free to reach out to us. Our team is here to help you with any inquiries or support you need.
        </p>
        <button style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Contact Us
        </button>
      </section>
    </>
  );
}

export default About;
