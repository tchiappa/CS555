import "./App.css";
import React, { useState } from "react";
import StartingPage from "./StartingPage";
import { PlanetJourney } from "./component/PlanetJourney";
import { ChoosePlanet } from "./component/ChoosePlanet";

function App() {
  const [showJourney, setShowJourney] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null); // ✅ Add state for selected planet

  return (
    <div>
      {!showJourney ? (
        <StartingPage onStart={() => setShowJourney(true)} />
      ) : (
        <PlanetJourney /> // ✅ Pass the selected planet
      )}
    </div>
  );
}

export default App;
