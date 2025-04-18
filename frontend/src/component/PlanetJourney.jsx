import React, { useContext, useState, useRef, useEffect } from "react";
import QuizModal from "./QuizModal";
import TradeContext from "../context/tradeContext";
import { getPlanetInfo } from "../planetInfo/getPlanetInfo";
import travelSoundFile from "../assets/spaceship-fly.mp3";
import { planetDetails } from "../planetInfo/planetDetails";


export function PlanetJourney({ selectedPlanet, onExit }) {
  const [fade, setFade] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [selectedFact, setSelectedFact] = useState(null);

  const travelSoundRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    setTimeout(() => setFade(true), 2000);
    if (travelSoundRef.current) {
      travelSoundRef.current.volume = volume;
      travelSoundRef.current.play().catch((e) => console.log("Autoplay blocked", e));
    }
    return () => {
      travelSoundRef.current?.pause();
    };
  }, [volume]);

  if (!selectedPlanet) {
    return <div>Loading... 🚀</div>;
  }

  const { information, funFacts } = getPlanetInfo(selectedPlanet.name);

  const handleFactClick = (fact) => {
    setSelectedFact(fact);
    const utterance = new SpeechSynthesisUtterance(fact);
    synthRef.current.cancel();
    synthRef.current.speak(utterance);
  };

  const handleAboutClick = () => {
    setShowAbout(true);
    setShowSummary(false);
  };

  const handleReturnClick = () => {
    setShowAbout(false);
    setShowSummary(true);
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
      <audio ref={travelSoundRef} src={travelSoundFile} />

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
          <p>{information}</p>
          <h3>🪐 Fun Planet Facts</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "16px",
              justifyItems: "center",
              marginTop: "16px",
            }}
          >
            {funFacts?.map((fact, index) => (
              <div
                key={index}
                onClick={() => handleFactClick(fact)}
                style={{
                  gridColumn: funFacts.length === 3 && index === 2 ? "1 / span 2" : "auto",
                  background: selectedFact === fact
                    ? "linear-gradient(135deg, #2563eb, #1e3a8a)"
                    : "linear-gradient(135deg, #1f2937, #111827)",
                  color: selectedFact === fact ? "#ffffff" : "#e5e7eb",
                  borderRadius: "16px",
                  padding: "16px 24px",
                  maxWidth: "300px",
                  cursor: "pointer",
                  boxShadow: selectedFact === fact
                    ? "0 0 12px rgba(37, 99, 235, 0.7)"
                    : "0 2px 8px rgba(0, 0, 0, 0.25)",
                  transition: "all 0.3s ease",
                  transform: selectedFact === fact ? "scale(1.08)" : "scale(1)",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "1.4",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform =
                    selectedFact === fact ? "scale(1.08)" : "scale(1)")
                }
              >
                {fact}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "16px" }}>
            <button
              onClick={() => setShowQuiz(true)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                background: "#1e40af",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1e3a8a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1e40af")}
            >
              Start Quiz
            </button>
            <button
              onClick={handleAboutClick}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                background: "#1e40af",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1e3a8a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1e40af")}
            >
              Explore More
            </button>
          </div>
        </div>
      )}

{showAbout && (
  <div style={{ marginTop: "20px" }}>
    <h3>🧭 About {selectedPlanet.name}</h3>
    <p><strong>Terrain:</strong> {planetDetails[selectedPlanet.name]?.terrain}</p>
    <p><strong>Atmosphere:</strong> {planetDetails[selectedPlanet.name]?.atmosphere}</p>
    <p><strong>Did You Know?</strong> {planetDetails[selectedPlanet.name]?.interestingFact}</p>
    <button
      onClick={handleReturnClick}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "8px",
        background: "#374151",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        transition: "background 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#1f2937")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#374151")}
    >
      Return
    </button>
  </div>
)}


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
