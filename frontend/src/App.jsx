import { GameProvider } from "./context/GameContext.jsx";
import React, { useEffect, useRef, useState } from "react";
import backgroundMusic from "./assets/background.mp3";
import { Game } from "./component/Game.jsx";
import Welcome from "./component/Welcome.jsx";
import LeaderPage from "./pages/Leaderpage.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [start, setStart] = useState(false);
  const audioRef = useRef(null);

  const handleStart = () => {
    setStart(true);
    audioRef.current?.play().catch(() => {});
  };

  useEffect(() => () => audioRef.current?.pause(), []);

  return (
    <GameProvider>
      <audio ref={audioRef} src={backgroundMusic} volume={0.5} loop />

      <BrowserRouter>
        <Routes>
          {/* Home route shows Welcome or Game based on `start` */}
          <Route
            path="/"
            element={start ? <Game /> : <Welcome handleStart={handleStart} />}
          />
          {/* Stand-alone leaderboard page */}
          <Route path="/leaderboard" element={<LeaderPage />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
