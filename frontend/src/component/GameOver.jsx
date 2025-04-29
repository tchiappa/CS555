import React, { useContext } from 'react';
import GameContext from '../context/GameContext';

export default function GameOver() {
  const {setEnd, points: score, setFuel, setPoints, setSelectedPlanet} = useContext(GameContext)

  function onPlayAgain() {
    setEnd(false);
    setFuel(10);
    setPoints(0);
    setSelectedPlanet(null);
  }

  return (
      <div className="fixed top-0 left-0 z-[9999] w-screen h-screen bg-black/50 flex justify-center items-center text-white">
        <div className="bg-black/75 text-white text-center p-25 rounded-4xl w-lg h-lg">
          <h2 className="text-xl">Game Over</h2>
          {score !== undefined && <p className="text-lg mt-5">Your Score: {score}</p>}
          <button onClick={onPlayAgain} className="mt-5 p-2 px-6 bg-blue-600 hover:bg-blue-800 disabled:bg-zinc-600 text-white disabled:text-zinc-400 mb-2 rounded-lg">
              Play Again
          </button>
        </div>
      </div>
  );
}

