// src/component/TidalLockEvent.jsx
import React, { useState } from "react";
import { useGame } from "../context/GameContext";

const sampleQuestion = {
  question: "What causes tidal locking between celestial bodies?",
  options: [
    "Magnetic fields",
    "Gravitational interaction and rotational slowing",
    "Orbital resonance",
    "Atmospheric drag"
  ],
  answer: 1
};

export default function TidalLockEvent({ onResolved }) {
  const { modifyResources } = useGame();
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleAnswer = (index) => {
    setSelected(index);
    const isCorrect = index === sampleQuestion.answer;
    if (isCorrect) {
      setFeedback("Correct! Escaping tidal lock...");
      setTimeout(() => onResolved(true), 1500);
    } else {
      setFeedback("Incorrect. Lost 10 fuel while trying to escape...");
      modifyResources({ fuel: -10 });
      setTimeout(() => onResolved(false), 2000);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <h2>🚨 Tidal Lock Encountered!</h2>
        <p>{sampleQuestion.question}</p>
        <ul>
          {sampleQuestion.options.map((opt, idx) => (
            <li key={idx}>
              <button
                style={{
                  padding: "8px 12px",
                  margin: "5px 0",
                  width: "100%",
                  backgroundColor: selected === idx ? "#888" : "#222",
                  color: "white",
                  border: "1px solid #555",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
                onClick={() => handleAnswer(idx)}
                disabled={feedback !== null}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
        {feedback && <p style={{ color: "#0f0", marginTop: "10px" }}>{feedback}</p>}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const cardStyle = {
  backgroundColor: "#111",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "500px",
  width: "90%",
  textAlign: "center",
  fontFamily: "sans-serif",
};
