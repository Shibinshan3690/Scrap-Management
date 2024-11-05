import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import "./userSignUp.css";
import axios from 'axios';

const UserSignUp = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate();
 
  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpSubmit  = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
   
      try {
           const response=await axios.post("http://localhost:5000/user/signUpUser",userData);
           toast.success(response.data.message);
           handleSignInClick();

      } catch (error) {
        toast.error(error.response?.data?.message || "Sign Up failed");
        
      }
      
  }

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSignInSubmit =async (e) => {
    e.preventDefault();
    const userData = { email: signInEmail, password: signInPassword };
      try {
       const response=await axios.post("http://localhost:5000/user/signInUser",userData)
       toast.success(response.data.message);
       localStorage.setItem('userToken', response.data.token);
       navigate("/home")

      } catch (error) {
        toast.error(error.response?.data?.message || "Sign In failed");
      }
    }
  

  return (
    <>
      <ToastContainer /> 
      <div className={`containerr ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        <div className="form sign-up-container">
          <form onSubmit={handleSignUpSubmit} className='form'>
            <h1 className='h1'>Create account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
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
          <form onSubmit={handleSignInSubmit} className='form'>
            <h1 className='h1'>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
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
            <a href="#">Forgot your password?</a>
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
};

export default UserSignUp;
