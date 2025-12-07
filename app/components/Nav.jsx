"use client";

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-rose-200 backdrop-blur-xl border-b border-white/30 sticky top-0 z-30 shadow-md">
      {/* Logo / Brand */}
      <div className="flex items-center space-x-2">
        <FaPlaneDeparture className="text-rose-500 text-2xl" />
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
          Travi<span className="text-gray-900">AI</span>
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-10 items-center">
        {["Features", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-gray-800 hover:text-rose-500 transition-all duration-200 font-medium text-lg"
          >
            {item}
          </a>
        ))}
        <button
          onClick={() => alert("Redirect to Get Started section")}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get Started
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-rose-300 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <FiX size={28} className="text-rose-500" />
        ) : (
          <FiMenu size={28} className="text-rose-500" />
        )}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white/90 backdrop-blur-lg flex flex-col items-center py-6 space-y-5 border-t border-white/30 md:hidden animate-fadeIn shadow-lg">
          {["Features", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-rose-500 font-medium text-lg transition-all duration-200"
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => {
              alert("Redirect to Get Started section");
              setMenuOpen(false);
            }}
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
