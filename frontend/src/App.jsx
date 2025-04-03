import "./App.css";
import React, { useState } from "react";
import StartingPage from "./StartingPage";
import { PlanetJourney } from "./component/PlanetJourney";
import { ChoosePlanet } from "./component/ChoosePlanet";
<<<<<<< HEAD

function App() {
  const [showJourney, setShowJourney] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null); // ✅ Add state for selected planet
=======
import { Scene } from "./Scene"; // ✅ Correct path

function App() {
  const [showJourney, setShowJourney] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [fuel, setFuel] = useState(100);
  const [points, setPoints] = useState(0);
  const [currentPlanet, setCurrentPlanet] = useState("Earth");
>>>>>>> c7ac8e3 (🚀 Uploaded full local project with latest changes)

  return (
    <div>
      {!showJourney ? (
        <StartingPage onStart={() => setShowJourney(true)} />
      ) : (
<<<<<<< HEAD
        <PlanetJourney /> // ✅ Pass the selected planet
=======
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
>>>>>>> c7ac8e3 (🚀 Uploaded full local project with latest changes)
      )}
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> c7ac8e3 (🚀 Uploaded full local project with latest changes)
