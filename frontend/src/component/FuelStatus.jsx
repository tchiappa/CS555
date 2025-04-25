// src/components/FuelStatus.jsx
import React, { useContext } from "react";
import TradeContext from "../context/tradeContext";

function FuelStatus() {
  const { fuel, points } = useContext(TradeContext);
  return (
    <div className="fixed top-5 left-5 bg-black text-white px-6 py-6 rounded-lg z-[1000]">
      <p>
        🚀 Current Fuel: <strong>{fuel}</strong>
      </p>
      <p>
        Points Earned: <strong>{points}</strong>
      </p>
    </div>
  );
}

export default FuelStatus;
