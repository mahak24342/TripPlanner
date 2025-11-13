"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaPlaneDeparture } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 bg-[#fdfaf6]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-rose-500">
          <FaPlaneDeparture className="text-3xl md:text-4xl" />
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-800">
            AI Travel Planner
          </h1>
        </div>

        <p className="text-gray-600 mt-2 text-base md:text-lg leading-relaxed">
          Plan your perfect trip in seconds — powered by AI.  
          Get personalized itineraries, flight ideas, and budget insights.
        </p>

        <div className="mt-8">
          <button className="bg-rose-500 hover:bg-[#cf6a17] text-white px-6 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 shadow-sm">
            Plan Your Trip ✈️
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
