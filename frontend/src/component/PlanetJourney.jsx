import React, { useContext, useState } from "react";
import QuizModal from "./QuizModal";
import TradeContext from "../context/tradeContext";

export function PlanetJourney({ selectedPlanet, onExit }) {
  const [fade, setFade] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const { getPlanetInfo } = useContext(TradeContext);

  if (!selectedPlanet) {
    return <div>Loading... 🚀</div>;
  }

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

      <div>
        <h3>🌍 Planet Summary</h3>
        <p>{getPlanetInfo(selectedPlanet.name).information}</p>
        <button
          onClick={() => setShowQuiz(true)}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Start Quiz
        </button>
      </div>

      {showQuiz && selectedPlanet && (
        <QuizModal
          selectedPlanet={selectedPlanet}
          onClose={() => {
            setShowQuiz(false);
            onExit();
          }}
        />
      )}
    </div>
  );
}
