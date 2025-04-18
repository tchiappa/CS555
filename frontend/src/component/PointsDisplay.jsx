import React from "react";
import { useGame } from "../context/GameContext";

export default function PointsDisplay() {
  const { resources } = useGame();
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: '#222',
      color: '#fff',
      padding: '10px 15px',
      borderRadius: '8px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      💎 Points: {resources.points}
    </div>
  );
}


