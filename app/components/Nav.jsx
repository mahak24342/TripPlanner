"use client";

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white/30 backdrop-blur-xl border-b border-white/40 sticky top-0 z-20 shadow-sm">
      {/* Logo / Brand */}
      <div className="flex items-center space-x-2">
        <FaPlaneDeparture className="text-rose-500 text-2xl" />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
          Travi<span className="text-white">AI</span>
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 items-center">
        {["Features", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white hover:text-rose-500 transition-all duration-200 font-medium"
          >
            {item}
          </a>
        ))}
        <button
          onClick={() => alert("Redirect to Get Started section")}
          className="bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          Get Started
        </button>
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
          {["Features", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-rose-500 transition-all duration-200 font-medium"
            >
              {item}
            </a>
          ))}

          <button
            onClick={() => {
              alert("Redirect to Get Started section");
              setMenuOpen(false);
            }}
            className="bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
