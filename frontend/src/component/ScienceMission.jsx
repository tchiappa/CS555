import React, { useState } from "react";
import { useGame } from "../context/GameContext";

const missions = [
  {
    id: 1,
    task: "Analyze the atmospheric composition of this planet. Which gas is most common on gas giants?",
    options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
    answer: 1,
    reward: { minerals: 5, oxygen: 5 }
  },
  {
    id: 2,
    task: "You've landed on an icy moon. Which mineral is most likely to be found here?",
    options: ["Basalt", "Ice Crystals", "Iron", "Quartz"],
    answer: 1,
    reward: { minerals: 7 }
  },
  {
    id: 3,
    task: "Decode a pulsar signal pattern. What kind of waves are pulsars primarily detected in?",
    options: ["Gamma Rays", "X-rays", "Radio Waves", "UV Rays"],
    answer: 2,
    reward: { fuel: 5 }
  }
];

export default function ScienceMission({ onComplete }) {
  const { modifyResources } = useGame();
  const [current] = useState(() => missions[Math.floor(Math.random() * missions.length)]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleAnswer = (index) => {
    setSelected(index);
    const isCorrect = index === current.answer;
    if (isCorrect) {
      setFeedback("✅ Mission Success! Resources collected.");
      modifyResources(current.reward);
      setTimeout(() => onComplete(), 2000);
    } else {
      setFeedback("❌ Incorrect. Mission failed.");
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <div style={overlay}>
      <div style={card}>
        <h2>🧪 Science Mission</h2>
        <p>{current.task}</p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {current.options.map((opt, i) => (
            <li key={i}>
              <button
                onClick={() => handleAnswer(i)}
                style={{
                  margin: "6px 0",
                  padding: "8px 16px",
                  width: "100%",
                  backgroundColor: selected === i ? "#444" : "#222",
                  color: "white",
                  border: "1px solid #555",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
                disabled={feedback !== null}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
        {feedback && <p style={{ color: "lightgreen" }}>{feedback}</p>}
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000,
  color: "white"
};

const card = {
  backgroundColor: "#222",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "500px",
  width: "90%",
  textAlign: "center",
  fontFamily: "sans-serif"
};
