"use client";

import React, { useState } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const Navi = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-rose-200 backdrop-blur-xl border-b border-white/40 sticky top-0 z-20 shadow-sm">
      {/* Logo / Brand */}
      <div className="flex items-center space-x-2">
        <FaPlaneDeparture className="text-rose-500 text-2xl" />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text  bg-rose-500">
          Travi<span className="text-black">AI</span>
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 items-center">
        {["Plan Trip", "My Trips", "Explore"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="text-black hover:text-rose-500 transition-all duration-200 font-medium"
          >
            {item}
          </a>
        ))}

        {session && (
          <div className="flex items-center space-x-4">
            {/* User Avatar */}
            <img
              src={session.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-9 h-9 rounded-full border border-white/50 shadow-sm"
            />

            {/* Logout */}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 bg-rose-500 hover:from-rose-500 hover:to-orange-500 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-white/50 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <FiX size={26} className="text-rose-500" />
        ) : (
          <FiMenu size={26} className="text-rose-500" />
        )}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white/90 backdrop-blur-md flex flex-col items-center py-5 space-y-4 border-t border-white/40 md:hidden animate-fadeIn">
          {["Plan Trip", "My Trips", "Explore"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-rose-500 transition-all duration-200 font-medium"
            >
              {item}
            </a>
          ))}

          {session && (
            <>
              <img
                src={session.user?.image || "/default-avatar.png"}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border border-white/50 shadow-sm"
              />
              <button
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-rose-500  hover:from-rose-500 hover:to-orange-500 text-white px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navi;
