// src/components/FuelStatus.jsx
import React from "react";
import { useGame } from "../context/GameContext";

function FuelStatus() {
  const { resources } = useGame();

  return (
    <div style={statusStyle}>
      <p>⛽ <strong>Fuel:</strong> {resources.fuel}</p>
      <p>🛠 <strong>Health:</strong> {resources.health}</p>
      <p>💨 <strong>Oxygen:</strong> {resources.oxygen}</p>
      <p>🪨 <strong>Minerals:</strong> {resources.minerals}</p>
      <p>💎 <strong>Points:</strong> {resources.points}</p>
    </div>
  );
}

const statusStyle = {
  position: "fixed",
  top: "10px",
  left: "10px",
  backgroundColor: "black",
  color: "white",
  padding: "10px 15px",
  borderRadius: "10px",
  zIndex: 1000,
  fontFamily: "sans-serif",
  fontSize: "14px"
};

export default FuelStatus;
