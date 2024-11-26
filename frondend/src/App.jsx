import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Adminsidebar from './pages/admin-module/Adminsidebar';
import Adminsupplire from './pages/admin-module/Adminsupplire';
import Adminsdashboard from './pages/admin-module/Adminsdashboard';
import AdminCostomers from './pages/admin-module/AdminCostomers';

import AdminAcount from './pages/admin-module/AdminAcount';
import AdminSignUp from './pages/admin-module/AdminSignUp';
import UserSignUp from './pages/user-module/UserSignUp';
import Home from './pages/user-module/Home';
import Sellscrap from './pages/user-module/Sellscrap';
import Ratelist from './pages/user-module/Ratelist';
import About from './pages/user-module/About';
import Contact from './pages/user-module/Contact';
import Notification from './pages/admin-module/Notification';
import TodayOrders from './pages/user-module/TodayOrders';
import UserOrderDetails from './pages/admin-module/UserOrderDetails';
import TottalOrders from './pages/admin-module/TottalOrders';

import UserDeatilsGetById from './pages/admin-module/UserDeatilsGetById';
import AdminOrders from './pages/admin-module/AdminOrders';
import SignUp from './pages/supplire-module/SignUp';
import Dasboard from "./pages/supplire-module/Dasboard";


import Totaltask from './pages/supplire-module/Totaltask';
import Orders from './pages/user-module/Orders';
import NotificationUser from './pages/user-module/NotificationUser';
import SuplireOrders from './pages/supplire-module/SuplireOrders';
import Report from './pages/supplire-module/Report';
import PendingOrders from './pages/supplire-module/PendingOrders';
import CompleteOrders from './pages/supplire-module/CompleteOrders';
import SupleireProfail from './pages/supplire-module/SupleireProfail';
import MyReport from './pages/admin-module/MyReport';
import AdminReport from './pages/admin-module/AdminReport';




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          {/* admin routes */}
  <Route path="/adminSignUp" element={<AdminSignUp/>}></Route> 
  <Route path='/adminSidebar' element={<Adminsidebar/>}></Route>
  <Route path='/adminSupplire' element={<Adminsupplire/>}></Route>
  <Route path='/adminDashboard'   element={<Adminsdashboard/>}></Route>
  <Route path='/adminCostomers' element={<AdminCostomers/>}></Route>
  {/* <Route path='/adminOrderss' element={<Adminorder/>}></Route> */}
  <Route path='/adminOrders' element={<AdminOrders/>}></Route>
  <Route path="/adminAccount" element={<AdminAcount/>}></Route>
  <Route path='/notification' element={<Notification/>}></Route>
  <Route path='/todayOrders' element={<TodayOrders/>}></Route>
  <Route path="/tottalOrders" element={<TottalOrders/>}></Route>
  <Route path='/userOrderDetails/:id' element={<UserOrderDetails/>}></Route>

  <Route path="/userDeatilsGetById/:id" element={<UserDeatilsGetById/>}></Route>
  <Route path="/adminReport" element={<AdminReport/>}></Route>
  
  

      {/* userRoute */}

        <Route path='/' element={<UserSignUp/>}></Route>
        <Route path='/home' element={<Home/>}></Route> 
        <Route path='/sellscrap' element={<Sellscrap/>}></Route>
        <Route path="/ratelist" element={<Ratelist/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>

        <Route path="/myOrders" element={<Orders/>}></Route>
         <Route path="/notifcation"element={<NotificationUser/>}></Route>
        

 
 


       {/* Supplire route */}
   <Route path='/signUpSupllire' element={<SignUp/>}></Route>
     <Route path="/dashboard" element={<Dasboard/>}></Route>

    <Route path="/totaltask" element={<Totaltask/>}></Route>
    <Route path="/suplireOrders" element={<SuplireOrders/>}></Route>
    <Route path="/report" element={<Report/>}></Route>
    <Route path='/pendingOrder'  element={<PendingOrders/>}></Route>
    <Route path="/compleateOrder" element={<CompleteOrders/>}></Route>
    <Route path="/suplierProfail" element={<SupleireProfail/>}></Route>
    <Route path="/myReport" element={<MyReport/>}></Route>
   



      </Routes>
    </BrowserRouter>
  );
}

export default App;
