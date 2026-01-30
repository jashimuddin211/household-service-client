import React from 'react';
import { NavLink } from 'react-router';


const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-white border-b-2 border-white pb-1'
      : 'text-gray-200 hover:text-white transition';

  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center h-20 px-4">
          
          <img
            className="w-24 h-16 rounded-2xl"
            src="logo.png"
            alt="Local Household"
          />

          <div className="flex gap-7 font-bold">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>

            <NavLink to="/add-service" className={navLinkClass}>
              Add Service
            </NavLink>

            <NavLink to="/bookings" className={navLinkClass}>
              My Bookings
            </NavLink>

            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
