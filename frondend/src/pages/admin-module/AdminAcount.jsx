import React from 'react'
import "./adminaccount.css";
import { MdAccountCircle, MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag } from 'react-icons/md';
import { FaPeopleCarry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Adminsidebar from './Adminsidebar';

const AdminAcount = () => {
    const navigate=useNavigate();
  return (
    <>
    
       <div>
       <Adminsidebar/>
       </div>
         <div>admin acount view</div>
      
  
    
    
    
    </>
  )
}

export default AdminAcount
