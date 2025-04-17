import React from "react";
import { useGame } from "../context/GameContext";

const messages = [
  "Welcome aboard, Captain. Ready for your first mission?",
  "Fuel is vital — don’t forget to refuel before long trips!",
  "Answer quizzes to earn rewards and boost our capabilities.",
  "Each planet has a story — explore them wisely.",
  "Our next stop might hold surprises. Stay alert!"
];

export default function AICopilot() {
  const { resources } = useGame();
  const [message, setMessage] = React.useState(messages[0]);
  const [warning, setWarning] = React.useState(null);

  React.useEffect(() => {
    if (resources.fuel < 20) {
      setWarning("⚠️ Fuel is too low for interplanetary travel!");
    } else if (resources.health < 30) {
      setWarning("⚠️ Ship integrity critical. Repair immediately.");
    } else {
      setWarning(null);
    }

    const interval = setInterval(() => {
      if (!warning) {
        const index = Math.floor(Math.random() * messages.length);
        setMessage(messages[index]);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [resources.fuel, resources.health]);

  return (
    <div style={{ ...copilotStyle, ...(warning ? flashingWarning : {}) }}>
      <p>🧠 <strong>AI Co-Pilot:</strong></p>
      <p style={{ fontStyle: "italic" }}>{warning || message}</p>
      <div style={{ marginTop: "10px", fontSize: "13px", color: "#ccc" }}>
        ⛽ Fuel: {resources.fuel} | 🛠 Health: {resources.health} | 💨 Oxygen: {resources.oxygen} | 🪨 Minerals: {resources.minerals}
      </div>
    </div>
  );
}

const copilotStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#111",
  color: "#0ff",
  padding: "15px",
  borderRadius: "10px",
  width: "320px",
  fontFamily: "monospace",
  fontSize: "14px",
  boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
  zIndex: 9999,
  transition: "box-shadow 0.5s ease",
};

const flashingWarning = {
  animation: "flashWarning 1s infinite alternate",
  boxShadow: "0 0 20px red",
  color: "#ff6666"
};
