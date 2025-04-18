// src/component/TutorialOverlay.jsx
import React, { useState } from "react";

const tutorialSteps = [
  {
    title: "Welcome, Space Cadet!",
    description: "You're about to begin your interplanetary adventure. Let's learn how to fly your ship!",
    emoji: "🚀"
  },
  {
    title: "Choose a Planet",
    description: "Click on any glowing planet to travel there. But make sure you have enough fuel!",
    emoji: "🪐"
  },
  {
    title: "Answer Science Quizzes",
    description: "After landing, you’ll face fun science questions. Answer them to collect minerals and fuel.",
    emoji: "🧠"
  },
  {
    title: "Refuel and Repair",
    description: "Visit the ship maintenance panel to refuel and repair using collected resources.",
    emoji: "🔧"
  },
  {
    title: "Meet Your Co-Pilot!",
    description: "The AI Co-Pilot will guide you with tips and warnings. Trust your space buddy!",
    emoji: "🤖"
  }
];

export default function TutorialOverlay({ onFinish }) {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <h2>{tutorialSteps[step].emoji} {tutorialSteps[step].title}</h2>
        <p style={{ fontSize: "16px", marginTop: "10px" }}>{tutorialSteps[step].description}</p>
        <button onClick={nextStep} style={buttonStyle}>
          {step === tutorialSteps.length - 1 ? "Let’s Go!" : "Next »"}
        </button>
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
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999,
  color: "white",
  fontFamily: "Comic Sans MS, sans-serif"
};

const cardStyle = {
  backgroundColor: "#222",
  padding: "30px",
  borderRadius: "15px",
  textAlign: "center",
  maxWidth: "500px",
  width: "80%",
  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)"
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#00bcd4",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};
