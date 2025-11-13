"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkedAlt } from "react-icons/fa";

const Recs = () => {
  const recos = [
    {
      title: "Local Attractions",
      desc: "Top-rated landmarks and must-visit spots around your destination.",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // beach
    },
    {
      title: "Best Food Spots",
      desc: "Authentic restaurants and cafes to taste the local cuisine.",
      img: "https://images.unsplash.com/photo-1555992336-03a23c36ef53?auto=format&fit=crop&w=800&q=80", // food
    },
    {
      title: "Hidden Gems",
      desc: "Peaceful and lesser-known places perfect for exploring quietly.",
      img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80", // forest
    },
  ];

  return (
    <section className="bg-[#fdfaf6] py-16 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <div className="flex justify-center items-center gap-2 mb-6 text-rose-500">
          <FaMapMarkedAlt className="text-2xl md:text-3xl" />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Recommendations for You
          </h2>
        </div>

        <p className="text-gray-600 mb-10 text-sm md:text-base max-w-2xl mx-auto">
          Explore destinations, food spots, and experiences curated just for your trip.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recos.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="h-48 md:h-52 w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Recs;
