// src/components/FuelStatus.jsx
import React from "react";

function FuelStatus({ fuel, gained }) {
  return (
    <div style={statusStyle}>
      <p>🚀 Current Fuel: <strong>{fuel}</strong></p>
      {gained !== null && (
        <p style={{ color: "green" }}>+{gained} fuel collected from this planet</p>
      )}
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
