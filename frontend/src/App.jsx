import "./App.css";
import React, { useState } from "react";
import StartingPage from "./StartingPage";
import { Scene } from "./Scene";
import { TradeProvider } from "./context/tradeContext";

function App() {
  const [showJourney, setShowJourney] = useState(false);
  const [fuel, setFuel] = useState(100);
  const [points, setPoints] = useState(0);
  const [currentPlanet, setCurrentPlanet] = useState("Earth");

  return (
    <TradeProvider>
      <div>
        {!showJourney ? (
          <StartingPage onStart={() => setShowJourney(true)} />
        ) : (
          <>
            <Scene
              fuel={fuel}
              setFuel={setFuel}
              points={points}
              setPoints={setPoints}
              currentPlanet={currentPlanet}
              setCurrentPlanet={setCurrentPlanet}
            />
          </>
        )}
      </div>
    </TradeProvider>
  );
}

export default App;
