"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlaneDeparture } from "react-icons/fa";

const Input = () => {
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState({
    destination: "",
    arrival: "",
    leaving: "",
    days: "",
    extras: "",
  });
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  const [budget, setBudget] = useState(null);
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [budgetError, setBudgetError] = useState("");

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setItinerary(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: tripData.destination,
          days: tripData.days,
          extras: tripData.extras,
        }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to generate itinerary");
      setItinerary(data.plan);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateBudget = async () => {
    setBudgetLoading(true);
    setBudgetError("");
    setBudget(null);

    try {
      const res = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: tripData.destination,
          days: tripData.days,
        }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to generate budget");

      setBudget(data.budget);
    } catch (err) {
      setBudgetError(err.message);
    } finally {
      setBudgetLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#fdfaf6] via-[#fff7f8] to-[#fff8f3] min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 sm:p-8 md:p-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <FaPlaneDeparture className="text-4xl text-rose-500 mb-2" />
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Plan Your Trip
          </h2>
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-md">
            Plan your perfect adventure in seconds — powered by AI.  
            Get smart itineraries, flight ideas, and local insights tailored just for you.
          </p>
        </div>

        {/* Form */}
        {!itinerary && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <div>
              <label className="text-gray-700 text-sm font-medium mb-1 block">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={tripData.destination}
                onChange={handleChange}
                placeholder="Enter your destination (e.g., Bali, Japan)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                required
              />
            </div>

            {/* Dates & Days */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1 block">
                  Arrival Date
                </label>
                <input
                  type="date"
                  name="arrival"
                  value={tripData.arrival}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-medium mb-1 block">
                  Leaving Date
                </label>
                <input
                  type="date"
                  name="leaving"
                  value={tripData.leaving}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-medium mb-1 block">
                  No. of Days
                </label>
                <input
                  type="number"
                  name="days"
                  value={tripData.days}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                  required
                />
              </div>
            </div>

            {/* Extras */}
            <div>
              <label className="text-gray-700 text-sm font-medium mb-1 block">
                Anything extra you want? (e.g. budget limit, preferences)
              </label>
              <textarea
                name="extras"
                value={tripData.extras}
                onChange={handleChange}
                placeholder="I want beaches, local food, and fewer tourist spots..."
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-10 py-3 rounded-xl font-medium text-white shadow-sm transition-all duration-300 ${
                  loading ? "bg-rose-300 cursor-not-allowed" : "bg-rose-500 hover:bg-[#cf6a17]"
                }`}
              >
                {loading ? "Generating..." : "Generate Itinerary ✈️"}
              </button>
            </div>
          </form>
        )}

        {/* AI Output */}
        {error && <p className="mt-6 text-center text-red-500 font-medium">{error}</p>}

        {itinerary && (
          <>
            <div className="mt-10 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800 text-center">
                ✨ Your AI-Generated Itinerary
              </h3>

              {itinerary.summary && (
                <p className="text-gray-700 text-center italic">{itinerary.summary}</p>
              )}

              <div className="mt-6 space-y-5">
                {Array.isArray(itinerary.days) &&
                  itinerary.days.map((day, idx) => (
                    <div key={idx} className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
                      <h4 className="font-semibold text-rose-600">
                        Day {day.day}: {day.title}
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 mt-2">
                        {day.activities?.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>

              {Array.isArray(itinerary.recommendations) && itinerary.recommendations.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-800 mb-3">🌴 Recommendations</h4>
                  <ul className="space-y-2">
                    {itinerary.recommendations.map((rec, i) => (
                      <li key={i} className="border border-gray-100 bg-white rounded-lg p-3 shadow-sm">
                        <span className="font-medium text-rose-600">{rec.type.toUpperCase()}:</span>{" "}
                        {rec.name} — <span className="text-gray-700">{rec.short}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Generate Budget Button */}
           <div className="mt-6 text-center">
  <button
    onClick={generateBudget}
    disabled={budgetLoading}
    className={`px-8 py-3 rounded-xl font-medium text-white shadow-md transition-all duration-300 ${
      budgetLoading
        ? "bg-rose-300 cursor-not-allowed"
        : "bg-rose-500 hover:bg-rose-600"
    } text-sm md:text-base`}
  >
    {budgetLoading ? "Generating Budget..." : "Generate Trip Budget 💸"}
  </button>
</div>

          </>
        )}

        {/* Budget Output */}
        {budgetError && <p className="mt-4 text-center text-red-500">{budgetError}</p>}

       {budget && (
  <div className="mt-8 bg-rose-50 border border-rose-100 p-6 rounded-2xl shadow-md max-w-3xl mx-auto">
    <h3 className="text-xl md:text-2xl font-semibold text-rose-600 mb-4 text-center">
      💸 Trip Budget Breakdown
    </h3>
    <pre className="whitespace-pre-wrap text-gray-800 text-sm md:text-base leading-relaxed">
      {budget}
    </pre>
  </div>
)}

      </motion.div>
    </section>
  );
};

export default Input;
