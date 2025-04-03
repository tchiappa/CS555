import React, { useState } from "react";

// You can move this to a shared data file if you want reuse
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

export function ChoosePlanet({ onPlanetSelect }) {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handleSelection = (e) => {
    const planetName = e.target.value;
    if (!planetName) return;

    const found = planets.find((p) => p.name === planetName);
    if (found) {
      setSelectedPlanet(found); // for preview
      onPlanetSelect(found);    // for triggering game logic
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>Select a Planet:</h2>

      <select onChange={handleSelection} style={{ padding: "10px", fontSize: "16px" }}>
        <option value="">-- Choose a planet --</option>
        {planets.map((planet) => (
          <option key={planet.name} value={planet.name}>
            {planet.name}
          </option>
        ))}
      </select>

      {/* Optional Preview */}
      {selectedPlanet && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={selectedPlanet.image}
            alt={selectedPlanet.name}
            width="150"
            style={{ borderRadius: "8px", marginBottom: "10px" }}
          />
          <h3>Topics:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {selectedPlanet.topics.map((topic, idx) => (
              <li key={idx}>🚀 {topic}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
