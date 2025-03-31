import React, { useEffect, useState } from "react";

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

  const planetSummaries = {
    Mercury: "Mercury is the smallest and closest planet to the Sun, with extreme temperatures.",
    Venus: "Venus has a thick atmosphere that traps heat, making it the hottest planet in our solar system.",
    Earth: "Earth is the only planet known to support life, with vast oceans and diverse ecosystems.",
    Mars: "Mars is known as the Red Planet and has the tallest volcano and deepest canyon in the solar system.",
    Jupiter: "Jupiter is the largest planet, famous for its Great Red Spot and strong magnetic field.",
    Saturn: "Saturn is known for its stunning rings, which are made of ice and rock particles.",
    Uranus: "Uranus rotates on its side and has a pale blue color due to methane in its atmosphere.",
    Neptune: "Neptune is a cold, windy planet with the fastest recorded winds in the solar system.",
  };

  const handleShowTopics = () => {
    setShowTopics(true); // Show topics after button click
    setShowSummary(false); // Hide summary
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", opacity: fade ? 1 : 0, transition: "opacity 2s" }}>
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
          <p>{planetSummaries[selectedPlanet.name]}</p>
          <button onClick={handleShowTopics} style={{ padding: "10px 20px", fontSize: "16px" }}>
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
          <p>Prepare yourself for exciting questions about {selectedPlanet.name}!</p>
        </div>
      )}
    </div>
  );
}

