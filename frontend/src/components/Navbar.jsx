import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../axios.js";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger and close icons

export default function Navbar() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchUnreadMessages = async () => {
    if (!localStorage.getItem("token")) return;
    try {
      const res = await API.get("/messages");
      const unreadMessages = res.data.filter(msg => msg.status === "unread");
      setUnreadCount(unreadMessages.length);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchUnreadMessages();
    const interval = setInterval(fetchUnreadMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition">Reunite</Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/?type=lost" className="hover:text-gray-200 transition">Lost</Link>
          <Link to="/?type=found" className="hover:text-gray-200 transition">Found</Link>
          <Link to="/create" className="hover:text-gray-200 transition">Add item</Link>

          {isLoggedIn && (
            <Link to="/messages" className="relative hover:text-gray-200 transition">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
              <Link to="/register" className="hover:text-gray-200 transition">Register</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-200 transition">Home</Link>
          <Link to="/?type=lost" onClick={() => setMenuOpen(false)} className="hover:text-gray-200 transition">Lost</Link>
          <Link to="/?type=found" onClick={() => setMenuOpen(false)} className="hover:text-gray-200 transition">Found</Link>
          <Link to="/create" onClick={() => setMenuOpen(false)} className="hover:text-gray-200 transition">Add item</Link>

          {isLoggedIn && (
            <Link to="/messages" onClick={() => setMenuOpen(false)} className="relative hover:text-gray-200 transition">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => { logout(); setMenuOpen(false); }}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-gray-200 transition">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-gray-200 transition">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
