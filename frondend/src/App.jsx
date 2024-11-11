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
import UserGetById from './pages/admin-module/UserGetById';
import UserDeatilsGetById from './pages/admin-module/UserDeatilsGetById';
import AdminOrders from './pages/admin-module/AdminOrders';
// import AdminOrders from './pages/admin-module/AdminOrders';


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
  <Route path='/userOrderDetail/:id'  element={<UserGetById/>}></Route>
  <Route path="/userDeatilsGetById/:id" element={<UserDeatilsGetById/>}></Route>
  

      {/* userRoute */}

        <Route path='/' element={<UserSignUp/>}></Route>
        <Route path='/home' element={<Home/>}></Route> 
        <Route path='/sellscrap' element={<Sellscrap/>}></Route>
        <Route path="/ratelist" element={<Ratelist/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        

 
 






      </Routes>
    </BrowserRouter>
  );
}

export default App;
