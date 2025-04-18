// Feature A: Ship Refueling and Repairs
// Feature C: Bonus Rewards for Correct Answers

import React, { useState, useEffect } from 'react';

const initialResources = {
  fuel: 100,
  minerals: 50,
  oxygen: 75,
  health: 80,
};

const getRandomBonus = (difficulty) => {
  const base = difficulty === 'hard' ? 30 : difficulty === 'medium' ? 20 : 10;
  return {
    fuel: Math.floor(Math.random() * base),
    minerals: Math.floor(Math.random() * base),
    oxygen: Math.floor(Math.random() * base),
  };
};

const ShipStatusBar = ({ label, value }) => (
  <div style={{ marginBottom: '10px' }}>
    <strong>{label}:</strong>
    <div style={{ background: '#eee', width: '100%', height: '20px' }}>
      <div style={{ background: 'green', width: `${value}%`, height: '100%' }}></div>
    </div>
  </div>
);

export default function ShipMaintenanceAndQuizReward() {
  const [resources, setResources] = useState(initialResources);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [bonus, setBonus] = useState(null);

  const refuel = () => {
    if (resources.minerals >= 10) {
      setResources((prev) => ({ ...prev, fuel: 100, minerals: prev.minerals - 10 }));
    } else {
      alert('Not enough minerals to refuel!');
    }
  };

  const repair = () => {
    if (resources.oxygen >= 15) {
      setResources((prev) => ({ ...prev, health: 100, oxygen: prev.oxygen - 15 }));
    } else {
      alert('Not enough oxygen to repair!');
    }
  };

  const answerQuestionCorrectly = (difficulty = 'medium') => {
    const bonusGained = getRandomBonus(difficulty);
    setResources((prev) => ({
      ...prev,
      fuel: Math.min(prev.fuel + bonusGained.fuel, 100),
      minerals: prev.minerals + bonusGained.minerals,
      oxygen: prev.oxygen + bonusGained.oxygen,
    }));
    setBonus(bonusGained);
    setTimeout(() => setBonus(null), 3000);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        backgroundColor: "rgba(255,255,255,0.95)",
        padding: "20px",
        zIndex: 9999,
        borderRadius: "10px",
        maxWidth: "350px",
        fontFamily: "sans-serif",
        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
      }}
    >
      <h2>🚀 Ship Maintenance & Bonus Rewards</h2>
      <button onClick={() => setShowMaintenance(!showMaintenance)}>
        {showMaintenance ? "Close Maintenance" : "Open Ship Maintenance"}
      </button>
  
      {showMaintenance && (
        <div style={{ marginTop: 20 }}>
          <ShipStatusBar label="Fuel" value={resources.fuel} />
          <ShipStatusBar label="Oxygen" value={resources.oxygen} />
          <ShipStatusBar label="Health" value={resources.health} />
          <ShipStatusBar label="Minerals" value={resources.minerals} />
          <br />
          <button onClick={refuel}>Refuel (Cost: 10 Minerals)</button>
          <button onClick={repair} style={{ marginLeft: 10 }}>
            Repair (Cost: 15 Oxygen)
          </button>
        </div>
      )}
  
      <hr />
  
      <div style={{ marginTop: 20 }}>
        <h3>🎯 Simulate Correct Answer</h3>
        <button onClick={() => answerQuestionCorrectly("easy")}>Easy</button>
        <button onClick={() => answerQuestionCorrectly("medium")} style={{ marginLeft: 10 }}>
          Medium
        </button>
        <button onClick={() => answerQuestionCorrectly("hard")} style={{ marginLeft: 10 }}>
          Hard
        </button>
  
        {bonus && (
          <div style={{ marginTop: 10, color: "green" }}>
            ✅ Bonus Received: +{bonus.fuel} Fuel, +{bonus.minerals} Minerals, +{bonus.oxygen} Oxygen!
          </div>
        )}
      </div>
    </div>
  );
}  