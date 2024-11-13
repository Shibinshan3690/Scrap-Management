import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import supplireApi from '../../api/suplyerinterceptor';
import "./signUp.css"

const SignUp = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [phoneNumber,setPhoneNumber]= useState("");
    const [password, setPassword] = useState("");
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false)

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
     const adminData={name,email,password,phoneNumber};
          try {
              const response=await supplireApi.post(`/signUp`,adminData);
              toast.success(response.data.message);
              handleSignInClick();
                 
          } catch (error) {
            toast.error(error.response?.data?.message || "Sign Up failed");
            
          }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const adminData = { email: signInEmail, password: signInPassword };
      try {
           const response= await supplireApi.post(`/signIn`,adminData);
               console.log("response",response)
           toast.success(response.data.message);
           localStorage.setItem('supplireToken', response.data.token);
           localStorage.setItem('supplire', JSON.stringify(response.data.supplier));
          toast.success(navigate("/supplirehome"))  

      } catch (error) {
        toast.error(error.response?.data?.message || "Sign In failed");
      }
       
  }

  return (
    <>
  <ToastContainer/>


  <div className={`containerr ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        <div className="form sign-up-container" >
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
              type="number"
              placeholder="phone number" 
              required 
              className='input'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required 
              className='input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='button' style={{backgroundColor:"InactiveCaptionText"}}>Sign Up</button>
          </form>
        </div>
        
        <div className="form sign-in-container" >
          <form className='form' onSubmit={handleSignInSubmit} >
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
            <button type='submit' className='button' style={{backgroundColor:"black"}}>Sign In</button>
          </form>
        </div>
        
        <div className="overlay-container" style={{backgroundColor:"black"}} >
          <div className="overlay "style={{backgroundColor:"black"}} >
            <div className="overlay-panel overlay-left"style={{backgroundColor:"gray"}}  >
              <h1 className='h1'>Welcome Back!</h1>
              <p className='p'>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick} style={{backgroundColor:"black"}}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right" style={{backgroundColor:"InactiveCaptionText"}}>
              <h1 className='h1'>Hello, Friend!</h1>
              <p className='p'>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={handleSignUpClick} style={{backgroundColor:"black"}}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default SignUp
