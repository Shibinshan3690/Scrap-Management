import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Adminsidebar from './Components/admin-module/Adminsidebar';
import Adminsupplire from './Components/admin-module/Adminsupplire';
import Adminsdashboard from './Components/admin-module/Adminsdashboard';
import AdminCostomers from './Components/admin-module/AdminCostomers';
import Adminorder from './Components/admin-module/Adminorder';
import AdminAcount from './Components/admin-module/AdminAcount';
import AdminSignUp from './Components/admin-module/AdminSignUp';
import UserSignUp from './Components/user-module/UserSignUp';
import Home from './Components/user-module/Home';
import Sellscrap from './Components/user-module/Sellscrap';
import Ratelist from './Components/user-module/Ratelist';
import About from './Components/user-module/About';
import Contact from './Components/user-module/Contact';
import Notification from './Components/admin-module/Notification';
import TodayOrders from './Components/user-module/TodayOrders';








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
  <Route path='/adminOrders' element={<Adminorder/>}></Route>
  <Route path="/adminAccount" element={<AdminAcount/>}></Route>
  <Route path='/notification' element={<Notification/>}></Route>
  <Route path='/todayOrders' element={<TodayOrders/>}></Route>

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
