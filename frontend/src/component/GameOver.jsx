// src/components/GameOver.jsx
import React, { useContext, useEffect, useRef } from 'react';
import { Link }  from 'react-router-dom';
import GameContext from '../context/GameContext.jsx';

export default function GameOver() {
  const {
    points: score,
    playerResources,
    missions,
    fuel,
    setPoints, setFuel, setSelectedPlanet,
    setPlayerResources, setStationVisits, setEnd,
  } = useContext(GameContext);

  /* final score */
  const resourcePts = Object.values(playerResources).reduce((s, v) => s + v, 0);
  const totalScore  = (score ?? 0) + resourcePts;

  /* post exactly once */
  const sentRef = useRef(false);
  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;

    setPoints(totalScore);
    const name = prompt('Enter your name for the leaderboard:') || 'Anonymous';
    fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName: name, totalScore, missions }),
      body: JSON.stringify({ 
        playerName: name,
        totalScore,
        missions,
        fuel,
      }),
    }).catch(err => console.error('POST error', err));
  }, []);

  /* hide global bar while overlay up */
  useEffect(() => {
    document.body.classList.add('hide-global-leaderboard');
    return () => document.body.classList.remove('hide-global-leaderboard');
  }, []);

  /* reset game */
  function onPlayAgain() {
    setEnd(false);
    setFuel(10);
    setPoints(0);
    setSelectedPlanet(null);
    setPlayerResources({ 'Red Dust': 5, 'Iron Ore': 2, 'Water Ice': 1 });
    setStationVisits(0);
  }

  /* render */
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
      <div className="bg-black/75 p-8 rounded-2xl text-white text-center w-96">
        <h2 className="text-2xl">Game Over</h2>

        {resourcePts > 0 && (
          <p className="mt-4">
            Your leftover resources were worth {resourcePts} points
          </p>
        )}
        <p className="mt-4 text-lg">Your Total Score: {totalScore}</p>

        {/* restart */}
        <button
          onClick={onPlayAgain}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded"
        >
          Play Again
        </button>

        {/* quick link to full leaderboard page */}
        <Link
          to="/leaderboard"
          className="mt-3 inline-flex items-center gap-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded"
        >
          View Leaderboard 🏆
        </Link>
      </div>
    </div>
  );
}
