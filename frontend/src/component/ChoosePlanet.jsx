import React, { useContext, useState } from "react";
import TradeContext from "../context/tradeContext";

// You can move this to a shared data file if you want reuse
let planets = [
  {
    name: "Mercury",
    image: "./giphy.gif",
    fuelCoast: 2,
  },
  {
    name: "Venus",
    image: "./vgiphy.gif",
    fuelCoast: 4,
  },
  {
    name: "Earth",
    image: "./egiphy.gif",
    fuelCoast: 6,
  },
  {
    name: "Mars",
    image: "./mgiphy.gif",
    fuelCoast: 8,
  },
  {
    name: "Jupiter",
    image: "./jgiphy.gif",
    fuelCoast: 10,
  },
  {
    name: "Saturn",
    image: "./sgiphy.gif",
    fuelCoast: 12,
  },
  {
    name: "Uranus",
    image: "./ugiphy.gif",
    fuelCoast: 14,
  },
  {
    name: "Neptune",
    image: "./ngiphy.gif",
    fuelCoast: 16,
  },
];

export function ChoosePlanet({ onPlanetSelect }) {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const { fuel } = useContext(TradeContext);

  const handleSelection = (e) => {
    const planetName = e.target.value;
    if (!planetName) return;

    const found = planets.find((p) => p.name === planetName);
    planets = planets.filter((p) => p != found);
    if (found) {
      setSelectedPlanet(found); // for preview
      onPlanetSelect(found); // for triggering game logic
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {planets.length > 0 && (
        <>
          <h2 style={{ marginBottom: "15px" }}>Select a Planet:</h2>

          <select
            onChange={handleSelection}
            style={{ padding: "10px", fontSize: "16px" }}
          >
            <option value="">-- Choose a planet --</option>
            {planets.map(
              (planet) =>
                fuel > planet.fuelCoast && (
                  <option key={planet.name} value={planet.name}>
                    <strong>{planet.name} </strong>
                    Required Fuel <strong>{planet.fuelCoast}</strong>
                  </option>
                ),
            )}
          </select>
        </>
      )}
      {planets.length == 0 && (
        <>
          <h2>game over</h2>
        </>
      )}

      {/* Optional Preview */}
      {selectedPlanet && planets.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={selectedPlanet.image}
            alt={selectedPlanet.name}
            width="150"
            style={{ borderRadius: "8px", marginBottom: "10px" }}
          />
        </div>
      )}
    </div>
  );
}
