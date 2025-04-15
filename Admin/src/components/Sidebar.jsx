 import { BiTask } from "react-icons/bi"; 
import { CgAdd } from "react-icons/cg"; 
import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 bg-white   pt-6 pl-[20%] text-[15px] "> 
      </div>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to={"/add"}>
            <CgAdd className="text-[40px]" />
            <p className="hidden md:block">Add items</p>
        </NavLink>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to={"/list"}>
            <BiTask className="text-[40px]" />
            <p className="hidden md:block">List</p>
        </NavLink>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to={"/orders"}>
            <BiTask className="text-[40px]" />
            <p className="hidden md:block">Orders</p>
        </NavLink>
    </div>
  ) 
}

export default Sidebar
