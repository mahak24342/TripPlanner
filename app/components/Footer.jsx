"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaPlaneDeparture } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-rose-200 border-t border-gray-200 py-10 px-6 md:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        {/* Logo / Title */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <FaPlaneDeparture className="text-rose-500 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-800">
            Travi<span className="text-rose-500">AI</span>
          </h1>
        </div>

        {/* Links */}
        <div className="flex justify-center flex-wrap gap-6 text-sm md:text-base text-gray-600 mb-6">
          <a href="#" className="hover:text-rose-500 transition-colors duration-300">
            Home
          </a>
          <a href="#" className="hover:text-rose-500 transition-colors duration-300">
            About
          </a>
          <a href="#" className="hover:text-rose-500 transition-colors duration-300">
            Contact
          </a>
          <a href="#" className="hover:text-rose-500 transition-colors duration-300">
            Privacy Policy
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-xs md:text-sm">
          © {new Date().getFullYear()} TraviAI — All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
