import React from 'react';
import Leaderboard from '../component/Leaderboard.jsx';
import { Link } from 'react-router-dom';

export default function LeaderPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl flex items-center gap-2 mb-8">
        <span role="img" aria-label="trophy">🏆</span> Leaderboard
      </h1>

      <Leaderboard defaultFilter="all" />

      <Link to="/" className="mt-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-800">
        Back to Home
      </Link>
    </div>
  );
}
