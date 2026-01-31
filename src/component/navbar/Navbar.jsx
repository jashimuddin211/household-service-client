import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';


const Navbar = () => {
const { user, handleSignOut } = useContext(AuthContext);

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

            <NavLink to="/service" className={navLinkClass}>
              Services
            </NavLink>

            <NavLink to="/add-service" className={navLinkClass}>
              Add Service
            </NavLink>

            <NavLink to="/bookings" className={navLinkClass}>
              My Bookings
            </NavLink>

            <div className="flex items-center gap-4">
          

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                    alt="Profile"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <span className="font-semibold">
                    {user.displayName || user.email}
                  </span>
                </li>
                <li onClick={handleSignOut}>
                  <a>Logout</a>
                </li>
                <Link to='/profile'>My Profile</Link>
              </ul>
            </div>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
