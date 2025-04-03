import "./App.css";
import React, { useState } from "react";
import StartingPage from "./StartingPage";
import { PlanetJourney } from "./component/PlanetJourney";
import { ChoosePlanet } from "./component/ChoosePlanet";
import { Scene } from "./Scene"; // ✅ Correct path

function App() {
  const [showJourney, setShowJourney] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [fuel, setFuel] = useState(100);
  const [points, setPoints] = useState(0);
  const [currentPlanet, setCurrentPlanet] = useState("Earth");

  return (
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
  );
}

export default App;
