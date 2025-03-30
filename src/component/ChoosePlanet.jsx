import React, { useState } from "react";

export function ChoosePlanet({ onPlanetSelect }) {
  const planets = [
    { name: "Mercury", image: "./giphy.gif", topics: ["Space Missions", "Extreme Temperatures"] },
    { name: "Venus", image: "./vgiphy.gif", topics: ["Greenhouse Effect", "Volcanic Activity"] },
    { name: "Earth", image: "./egiphy.gif", topics: ["Climate Change", "Biodiversity"] },
    { name: "Mars", image: "./mgiphy.gif", topics: ["Rovers", "Future Colonization"] },
    { name: "Jupiter", image: "./jgiphy.gif", topics: ["Gas Giants", "Great Red Spot"] },
    { name: "Saturn", image: "./sgiphy.gif", topics: ["Rings", "Moons like Titan"] },
    { name: "Uranus", image: "./ugiphy.gif", topics: ["Ice Giants", "Tilted Axis"] },
    { name: "Neptune", image: "./ngiphy.gif", topics: ["Storms", "Farthest Planet"] },
  ];

 
  const handleSelection = (e) => {
    const selectedPlanet = planets.find(p => p.name === e.target.value);
    onPlanetSelect(selectedPlanet);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Select a Planet:</h2>
      <select onChange={handleSelection} style={{ padding: "10px", fontSize: "16px" }}>
        <option value="">-- Choose a planet --</option>
        {planets.map((planet) => (
          <option key={planet.name} value={planet.name}>{planet.name}</option>
        ))}
      </select>
    </div>
  );
}
