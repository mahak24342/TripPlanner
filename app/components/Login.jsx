"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showSignIn, setShowSignIn] = useState(false);

  // Redirect logged-in user to /dashboard
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // While session is loading, optionally show a loader
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100 text-center p-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome back, {session.user?.name} 👋
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Redirecting to your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100">
      {/* Left side - Banner text */}
      <div className="flex-1 flex flex-col justify-center items-center text-gray-800 p-10 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-400">
          AI Travel Planner ✈️
        </h1>
        <p className="text-lg md:text-xl max-w-md mb-6 text-gray-700">
          Discover, plan, and personalize your trips effortlessly.  
          Let our AI craft the perfect itinerary for you — from flights to hidden gems.
        </p>
        <p className="italic opacity-80 text-gray-600 mb-8">
          “Your next adventure starts with one click.”
        </p>

        {/* Get Started Button */}
        {!showSignIn && (
          <button
            onClick={() => setShowSignIn(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        )}
      </div>

      {/* Right side - Login card (only shows after Get Started) */}
      {showSignIn && (
        <div className="flex-1 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white/70 backdrop-blur-lg p-8 shadow-xl rounded-3xl border border-white/30 w-full max-w-sm text-center transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Sign in to Continue
            </h2>
            <p className="text-gray-500 mb-6">
              Plan your next trip in seconds with AI 🚀
            </p>
            <button
              onClick={() => signIn("google")}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl w-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
