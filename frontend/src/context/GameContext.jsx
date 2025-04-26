import { createContext, useState } from "react";
import questions from "../planetInfo/data.js";

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [stationVisits, setStationVisits] = useState(0);

  const [playerResources, setPlayerResources] = useState({
    "Red Dust": 5,
    "Iron Ore": 2,
    "Water Ice": 1,
  });

  const [fuel, setFuel] = useState(10);
  const [points, setPoints] = useState(0);

  const [planetaryResources, setPlanetaryResources] = useState({
    Mercury: [
      { name: "Solar-Baked Regolith", value: 1 },
      { name: "Sulfur Crystals", value: 2 },
      { name: "Iron Ore", value: 3 },
      { name: "Metal Silicates", value: 4 },
      { name: "Mercury Isotopes", value: 5 },
    ],
    Venus: [
      { name: "Carbon-Rich Sediment", value: 1 },
      { name: "Sulfuric Acid Vapors", value: 2 },
      { name: "Basalt Rock", value: 3 },
      { name: "Acidic Fog Condensate", value: 4 },
      { name: "Pressurized Carbonite", value: 5 },
    ],
    Earth: [
      { name: "Water Ice", value: 1 },
      { name: "Iron Ore", value: 2 },
      { name: "Coal Dust", value: 1 },
      { name: "Uranium Pellets", value: 4 },
      { name: "Refined Hydrogen", value: 5 },
    ],
    Mars: [
      { name: "Red Dust", value: 1 },
      { name: "Iron Oxide Crystals", value: 2 },
      { name: "Subsurface Ice", value: 3 },
      { name: "Basalt Fragments", value: 2 },
      { name: "Fossil Gas Pockets", value: 5 },
    ],
    Jupiter: [
      { name: "Sulfur Geyser Dust (Io)", value: 2 },
      { name: "Radiated Ice Shards (Europa)", value: 3 },
      { name: "Helium-Rich Gas (Jupiter)", value: 1 },
      { name: "Sodium Vapors (Io)", value: 4 },
      { name: "Subsurface Brine (Europa)", value: 5 },
    ],
    Saturn: [
      { name: "Methane Ice (Titan)", value: 2 },
      { name: "Ethane Liquid (Titan)", value: 3 },
      { name: "Cryovolcanic Sludge (Titan)", value: 4 },
      { name: "Hydrocarbon Crystals (Titan)", value: 5 },
      { name: "Ammonia Ice (Enceladus)", value: 1 },
    ],
    Uranus: [
      { name: "Methane Clouds", value: 1 },
      { name: "Icy Ammonia Crust (Miranda)", value: 2 },
      { name: "Crystalline Hydrogen", value: 3 },
      { name: "Carbon Ice (Oberon)", value: 4 },
      { name: "Supercooled Helium", value: 5 },
    ],
    Neptune: [
      { name: "Frozen Methane", value: 1 },
      { name: "Ice Crystals (Triton)", value: 2 },
      { name: "Compressed Ammonia Gas", value: 3 },
      { name: "Nitrogen Plumes (Triton)", value: 4 },
      { name: "Exotic Ices", value: 5 },
    ],
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

  return (
    <GameContext.Provider
      value={{
        stationVisits,
        setStationVisits,
        playerResources,
        setPlayerResources,
        difficulty,
        adjustDifficulty,
        getPlanetInfo,
        getQuestion,
        planetaryResources,
        setPlanetaryResources,
        fuel,
        setFuel,
        points,
        setPoints,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
