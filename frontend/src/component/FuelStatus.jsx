// src/components/FuelStatus.jsx
import React, { useContext } from "react";
import TradeContext from "../context/tradeContext";

function FuelStatus() {
  const { fuel, points } = useContext(TradeContext);
  return (
    <div style={statusStyle}>
      <p>
        🚀 Current Fuel: <strong>{fuel}</strong>
      </p>
      <p>
        Points Earned: <strong>{points}</strong>
      </p>
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
};

export default FuelStatus;
