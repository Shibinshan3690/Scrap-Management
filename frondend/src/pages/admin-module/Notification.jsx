import React from 'react'
import { FaPeopleCarry } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { MdAccountCircle, MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Adminsidebar from './Adminsidebar'

const Notification = () => {
    const navigate=useNavigate()


  return (
<>



    <div>
        <Adminsidebar/>
    </div>


</>
  )
}

export default Notification