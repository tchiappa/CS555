// src/component/Welcome.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Welcome({ handleStart }) {
  return (
    <div className="bg-zinc-900 h-screen w-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-6">Interstellar Voyager</h1>

      <p className="text-lg text-center max-w-2xl">
        Embark on an educational space exploration journey! Choose your starting
        planet, answer space trivia, and collect resources as you travel through
        the solar system.
      </p>

      {/* start button */}
      <button
        onClick={handleStart}
        className="mt-8 p-2 px-6 bg-blue-600 hover:bg-blue-800 text-lg font-semibold rounded-lg transition"
      >
        Start Exploration
      </button>

      {/* leaderboard link */}
      <Link
        to="/leaderboard"
        className="mt-3 inline-flex items-center gap-1 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
      >
        View Leaderboard <span role="img" aria-label="trophy">🏆</span>
      </Link>
    </div>
  );
}
