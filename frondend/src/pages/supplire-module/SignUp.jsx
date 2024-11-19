import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "./signUp.css"

import supplireApi from '../../api/suplyerinterceptor';


const SignUp = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const navigate = useNavigate();
     const [form ,setForm]=useState({
        name: '', email: '', phoneNumber: '', password: '',
        state: '', district: '', streetAddress: '', zipCode: '',
        gender: '', age: '', category: ''
     })
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false)


  const handleChange=(e)=>{  
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
   
          try {
              const response=await supplireApi.post(`/signUp`,form);
              toast.success(response.data.message);
              handleSignInClick();
                 
          } catch (error) {
            toast.error(error.response?.data?.message || "Sign Up failed");
            
          }
  };

  const handleSignInSubmit = async (e) => {
    console.log("ffff")
    e.preventDefault();
    const suplireData = { email: signInEmail, password: signInPassword };
      try {
           const response= await supplireApi.post(`/signIn`,suplireData);
               console.log("response",response)
           toast.success(response.data.message);
           navigate("/dashboard")  

           localStorage.setItem('supplireToken', response.data.token);
           localStorage.setItem('supplire', JSON.stringify(response.data.supplier));
         
      } catch (error) {
        toast.error(error.response?.data?.message || "Sign In failed");
      }
       
  }

  return (
    <>
  <ToastContainer/>


  <div className={`containerr ${isRightPanelActive ? 'right-panel-active' : ''}`} style={{height:"700px",width:"1200px",marginTop:"20px",marginLeft:"300px"}}>
        <div className="form sign-up-container " >
          <form className='form' onSubmit={handleSignUpSubmit}  style={{width:"600px",overflow:"auto",display:"inline-block",padding:"20px"}}>
         

            <h1 className='h1'>Create Account</h1>
            <span className='span'>or use your email for registration</span>
            <input 
              type="text" 
              placeholder="Name"  
              required 
              className='inputt'
              value={form.name}
              onChange={handleChange} 
              name='name'
            />
            <input 
              type="email"
              placeholder="Email" 
              required 
               className='inputt'
              value={form.email}
              onChange={handleChange}
              name='email'
            />
            <input 
              type="number"
              placeholder="phone number" 
              required 
              className='inputt'
              value={form.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
            />
            <input
              type="password"
              placeholder="Password"
              required 
              className='inputt'
              value={form.password}
              onChange={handleChange}
              name='password'
            />
            <input
              type="text"
              placeholder="state"
              required 
              className='inputt'
              value={form.state}
              onChange={handleChange}
              name='state'
            />
            <input
              type="text"
              placeholder="district"
              required 
              className='inputt'
              value={form.district}
              onChange={handleChange}
              name='district'
            />
            <input
              type="text"
              placeholder="streetAddress"
              required 
              className='inputt'
              value={form.streetAddress}
              onChange={handleChange}
              name='streetAddress'
            />
            <input
              type="number"
              placeholder="zipCode"
              required 
               className='inputt'
              value={form.zipCode}
              onChange={handleChange}
              name='zipCode'
            />
            <input
              type="text"
              placeholder="gender"
              required 
               className='inputt'
              value={form.gender}
              onChange={handleChange}
              name='gender'
            />
            <input
              type="number"
              placeholder="age"
              required 
               className='inputt'
              value={form.age}
              onChange={handleChange}
              name='age'
            />
            <input
              type="text"
              placeholder="category"
              required 
               className='inputt'
              value={form.category}
              onChange={handleChange}
              name='category'
            />
            <button type='submit' className='nnnn' >Sign Up</button>
          </form>
        </div>
        
        <div className="form sign-in-container" >
          <form className='form' onSubmit={handleSignInSubmit} >
            <h1 className='h11' style={{padding:"50px",marginTop:"-80px"}}>Sign in</h1>
            <span className='span'>or use your account</span>
            <input
              type="email" 
              placeholder="Email"
              required
              className='input1t'
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password" 
              required
              className='input1t'
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
            <button type='submit' className='nnnn' style={{backgroundColor:"black"}}>Sign In</button>
          </form>
        </div>
        
        <div className="overlay-container" style={{backgroundColor:"black"}} >
          <div className="overlay "style={{backgroundColor:"black"}} >
            <div className="overlay-panel overlay-left"style={{backgroundColor:"gray"}} >
              <h1 className='h11'>Welcome Back!</h1>
              <p className='pp'>To keep connected with us please login with your personal info</p>
              <button className="ghosts" onClick={handleSignInClick} style={{backgroundColor:"black"}}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right" style={{backgroundColor:"InactiveCaptionText"}}>
              <h1 className='h11'>Hello, Friend!</h1>
              <p className='pp'>Enter your personal details and start your journey with us</p>
              <button className="nnnn" type='submit' onClick={handleSignUpClick} style={{backgroundColor:"black"}}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default SignUp
