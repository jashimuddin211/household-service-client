import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

  const { user, handleSignOut } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  // DARK MODE
  const [dark, setDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // APPLY THEME
  useEffect(() => {

    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('theme', dark ? 'dark' : 'light');

  }, [dark]);

  // ACTIVE LINK STYLE
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-white border-b-2 border-white pb-1'
      : 'text-gray-200 hover:text-white transition duration-300';

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">

      <div className="max-w-[1280px] mx-auto px-4">

        {/* NAVBAR */}
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              className="w-24 h-16 rounded-2xl object-cover"
              src="logo.png"
              alt="Local Household"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-7 font-semibold">

            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/service" className={navLinkClass}>
              Services
            </NavLink>

            {user && (
              <>
                <NavLink to="/myservices" className={navLinkClass}>
                  My Services
                </NavLink>

                <NavLink to="/add-service" className={navLinkClass}>
                  Add Service
                </NavLink>

                <NavLink to="/bookings" className={navLinkClass}>
                  My Bookings
                </NavLink>
              </>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-4">

            {/* THEME TOGGLE */}
            <label className="flex cursor-pointer gap-2 text-white items-center">

              <span>🌞</span>

              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={dark}
                onChange={(e) => setDark(e.target.checked)}
              />

              <span>🌙</span>

            </label>

            {/* USER */}
            {user ? (
              <div className="dropdown dropdown-end">

                {/* AVATAR */}
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >

                  <div className="w-11 rounded-full ring ring-white ring-offset-2">

                    <img
                      src={
                        user.photoURL ||
                        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                      }
                      alt="Profile"
                    />

                  </div>

                </div>

                {/* DROPDOWN */}
                <ul className="menu menu-sm dropdown-content mt-3 z-[100] p-3 shadow-xl bg-white rounded-2xl w-56">

                  <li className="mb-2">
                    <span className="font-bold text-gray-700">
                      {user.displayName || user.email}
                    </span>
                  </li>

                  <li>
                    <NavLink to="/profile">
                      My Profile
                    </NavLink>
                  </li>

                  <li>
                    <button onClick={handleSignOut}>
                      Logout
                    </button>
                  </li>

                </ul>

              </div>
            ) : (
              <NavLink
                to="/login"
                className="bg-white text-purple-600 px-5 py-2 rounded-full font-bold hover:scale-105 transition duration-300"
              >
                Login
              </NavLink>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
          >

            {isOpen ? <X size={30} /> : <Menu size={30} />}

          </button>

        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden pb-5">

            <div className="flex flex-col gap-5 font-semibold bg-white/10 backdrop-blur-md p-5 rounded-2xl">

              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              <NavLink to="/service" className={navLinkClass}>
                Services
              </NavLink>

              {user && (
                <>
                  <NavLink to="/myservices" className={navLinkClass}>
                    My Services
                  </NavLink>

                  <NavLink to="/add-service" className={navLinkClass}>
                    Add Service
                  </NavLink>

                  <NavLink to="/bookings" className={navLinkClass}>
                    My Bookings
                  </NavLink>
                </>
              )}

              {/* MOBILE THEME */}
              <label className="flex cursor-pointer gap-2 text-white items-center">

                <span>🌞</span>

                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  checked={dark}
                  onChange={(e) => setDark(e.target.checked)}
                />

                <span>🌙</span>

              </label>

              {/* MOBILE AUTH */}
              <div className="border-t border-white/30 pt-4">

                {user ? (
                  <div className="flex flex-col gap-4">

                    <div className="flex items-center gap-3">

                      <img
                        className="w-12 h-12 rounded-full"
                        src={
                          user.photoURL ||
                          'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                        }
                        alt="Profile"
                      />

                      <div>

                        <h3 className="text-white font-bold">
                          {user.displayName}
                        </h3>

                        <p className="text-sm text-gray-200">
                          {user.email}
                        </p>

                      </div>

                    </div>

                    <NavLink
                      to="/profile"
                      className="text-white hover:text-yellow-300"
                    >
                      My Profile
                    </NavLink>

                    <button
                      onClick={handleSignOut}
                      className="bg-white text-purple-600 py-2 rounded-xl font-bold hover:bg-gray-200 transition"
                    >
                      Logout
                    </button>

                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className="bg-white text-purple-600 text-center py-2 rounded-xl font-bold"
                  >
                    Login
                  </NavLink>
                )}

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Navbar;