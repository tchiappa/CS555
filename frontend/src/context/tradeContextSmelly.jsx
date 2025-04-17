import { createContext, useState } from "react";
import questions from "../planetInfo/data.js";

const TradeContext = createContext({});

export const TradeProvider = ({ children }) => {
  const [resource, setResource] = useState({
    minerals: 1000,
    metals: 1000,
    fuel: 100,
    oxygen: 100,
  });

  const [difficulty, setDifficulty] = useState("easy");

  function getPlanetInfo(planet) {
    return questions.planets.find(
      (planets) => planets.name.toLowerCase() === planet.toLowerCase(),
    );
  }

  const adjustDifficulty = (previousLevel, secondLastAns, lastAns) => {
    // Ans are boolean
    if (secondLastAns !== lastAns) return previousLevel;
    if (lastAns) {
      if (previousLevel === "easy") return "medium";
      if (previousLevel === "medium") return "hard";
    } else {
      if (previousLevel === "hard") return "medium";
      if (previousLevel === "medium") return "easy";
    }
    return previousLevel;
  };

  function getQuestion({ planet, secondLastAns, lastAns }) {
    const planetInfo = getPlanetInfo(planet);
    let newDifficulty = adjustDifficulty(difficulty, secondLastAns, lastAns);
    setDifficulty(newDifficulty);
    return planetInfo.questions[newDifficulty].pop();
  }

  // smelly code which dose not take into consideration the previous state
  function giveFreeFuel() {
    setResource(() => ({
      minerals: 1000,
      metals: 1000,
      fuel: 500,
      oxygen: 100,
    }));
  }

  return (
    <TradeContext.Provider
      value={{
        resource,
        setResource,
        difficulty,
        adjustDifficulty,
        getPlanetInfo,
        getQuestion,
        giveFreeFuel,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export default TradeContext;
