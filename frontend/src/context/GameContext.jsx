// context/GameContext.jsx

import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [resources, setResources] = useState({
    fuel: 50,       // NOT 100
    oxygen: 50,
    health: 60,
    minerals: 20,
    points: 0
  });
  

  const updateResource = (key, value) => {
    setResources(prev => ({ ...prev, [key]: value }));
  };

  const modifyResources = (updates) => {
    setResources(prev => ({
      ...prev,
      ...Object.entries(updates).reduce((acc, [key, delta]) => {
        acc[key] = Math.max((prev[key] || 0) + delta, 0);
        return acc;
      }, {})
    }));
  };

  return (
    <GameContext.Provider value={{ resources, setResources, updateResource, modifyResources }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
