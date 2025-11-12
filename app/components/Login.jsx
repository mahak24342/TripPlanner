"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  const [showSignIn, setShowSignIn] = useState(false);

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100 text-center p-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome back, {session.user?.name} 👋
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Ready to plan your next amazing journey?
        </p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100">
      {/* Left side - Banner text */}
      <div className="flex-1 flex flex-col justify-center items-center text-gray-800 p-10 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
          AI Travel Planner ✈️
        </h1>
        <p className="text-lg md:text-xl max-w-md mb-6 text-gray-700">
          Discover, plan, and personalize your trips effortlessly.  
          Let our AI craft the perfect itinerary for you — from flights to hidden gems.
        </p>
        <p className="italic opacity-80 text-gray-600">
          “Your next adventure starts with one click.”
        </p>
      </div>

      {/* Right side - Get Started / Login card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white/70 backdrop-blur-lg p-8 shadow-xl rounded-3xl border border-white/30 w-full max-w-sm text-center transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {showSignIn ? "Sign in to Continue" : "Welcome to TripPlanner.ai"}
          </h2>
          <p className="text-gray-500 mb-6">
            {showSignIn
              ? "Plan your next trip in seconds with AI 🚀"
              : "Get started to explore personalized travel experiences."}
          </p>

          {!showSignIn ? (
            <button
              onClick={() => setShowSignIn(true)}
              className="bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white px-6 py-3 rounded-xl w-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white px-6 py-3 rounded-xl w-full font-medium transition-all duration-200 shadow-md hover:shadow-lg animate-fadeIn"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
