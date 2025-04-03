import React, { useEffect, useState } from "react";
import { getPlanetInfo } from "../utils/questions";

export function PlanetJourney({ selectedPlanet }) {
  const [fade, setFade] = useState(false);
  const [showTopics, setShowTopics] = useState(false); // Initially, don't show topics
  const [showSummary, setShowSummary] = useState(true); // Initially, show the planet summary

  useEffect(() => {
    setTimeout(() => setFade(true), 2000); // Fade in after 2 seconds
  }, []);

  if (!selectedPlanet) {
    return <div>Loading... 🚀</div>;
  }

  const handleShowTopics = () => {
    setShowTopics(true); // Show topics after button click
    setShowSummary(false); // Hide summary
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        opacity: fade ? 1 : 0,
        transition: "opacity 2s",
      }}
    >
      <h2>🚀 Traveling...</h2>
      <h2>Welcome to {selectedPlanet.name}!</h2>
      <img
        src={selectedPlanet.image}
        alt={selectedPlanet.name}
        style={{ width: "450px", height: "250px", borderRadius: "10%" }}
      />

      {showSummary && (
        <div>
          <h3>🌍 Planet Summary</h3>
          <p>{getPlanetInfo(selectedPlanet.name).information}</p>
          <button
            onClick={handleShowTopics}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Show Topics
          </button>
        </div>
      )}

      {showTopics && (
        <div>
          <h3>📚 Topics Covered:</h3>
          <ul>
            {selectedPlanet.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
          <p>
            Prepare yourself for exciting questions about {selectedPlanet.name}!
          </p>
        </div>
      )}
    </div>
  );
}
