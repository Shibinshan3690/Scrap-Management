import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSignUp = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

  // Handle Sign-Up Submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
     const adminData={name,email,password};
          try {
              const response=await axios.post("http://localhost:5000/admin/signUpAdmin",adminData);
              toast.success(response.data.message);
              handleSignInClick();
                 
          } catch (error) {
            toast.error(error.response?.data?.message || "Sign Up failed");
            
          }
  };

  // Handle Sign-In Submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const adminData = { email: signInEmail, password: signInPassword };
      try {
           const response= await axios.post(`http://localhost:5000/admin/signInAdmin`,adminData);
               console.log("response",response)
           toast.success(response.data.message);
           localStorage.setItem('adminToken', response.data.token);
           navigate("/adminDashboard")

      } catch (error) {
        toast.error(error.response?.data?.message || "Sign In failed");
      }
       
  }

  return (
    <>
      <ToastContainer />
      <div className={`containerr ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        <div className="form sign-up-container">
          <form className='form' onSubmit={handleSignUpSubmit}>
            <h1 className='h1'>Create Account</h1>
            <span className='span'>or use your email for registration</span>
            <input 
              type="text" 
              placeholder="Name"  
              required 
              className='input'
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="email"
              placeholder="Email" 
              required 
              className='input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required 
              className='input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='button'>Sign Up</button>
          </form>
        </div>
        
        <div className="form sign-in-container">
          <form className='form' onSubmit={handleSignInSubmit}>
            <h1 className='h1'>Sign in</h1>
            <span className='span'>or use your account</span>
            <input
              type="email" 
              placeholder="Email"
              required
              className='input'
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password" 
              required
              className='input'
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
            <button type='submit' className='button'>Sign In</button>
          </form>
        </div>
        
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className='h1'>Welcome Back!</h1>
              <p className='p'>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className='h1'>Hello, Friend!</h1>
              <p className='p'>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSignUp;
