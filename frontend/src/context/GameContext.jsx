import { createContext, useState } from "react";
import questions from "../planetInfo/data.js";

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [stationVisits, setStationVisits] = useState(0);
  const [scientificAchievements, setScientificAchievements] = useState(0);
  const [missionsCompleted, setMissionsCompleted] = useState(0);
  const [planetsExplored, setPlanetsExplored] = useState([]);

  const [playerResources, setPlayerResources] = useState({
    "Red Dust": 5,
    "Iron Ore": 2,
    "Water Ice": 1,
  });

  const [fuel, setFuel] = useState(10);
  const [points, setPoints] = useState(0);
  const [end, setEnd] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planetData = [
      { size: 0.1, distance: 1.25, img: "mercury.png", name: "Mercury", speed: 0.02 },
      { size: 0.2, distance: 1.65, img: "venus.png", name: "Venus", speed: 0.015 },
      { size: 0.225, distance: 2.0, img: "earth.png", name: "Earth", speed: 0.01 },
      { size: 0.15, distance: 2.25, img: "mars.png", name: "Mars", speed: 0.008 },
      { size: 0.4, distance: 2.75, img: "jupiter.png", name: "Jupiter", speed: 0.005 },
      { size: 0.35, distance: 3.25, img: "saturn.png", name: "Saturn", speed: 0.004 },
      { size: 0.3, distance: 3.75, img: "uranus.png", name: "Uranus", speed: 0.003 },
      { size: 0.3, distance: 4.25, img: "neptune.png", name: "Neptune", speed: 0.002 }
  ];

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

  const addPlanetExplored = (planet) => {
    if (!planetsExplored.some(p => p.name === planet.name)) {
      setPlanetsExplored(prev => [...prev, planet]);
    }
  };

  const incrementScientificAchievements = () => {
    setScientificAchievements(prev => prev + 1);
  };

  const incrementMissionsCompleted = () => {
    setMissionsCompleted(prev => prev + 1);
  };

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
        end,
        setEnd,
        planetData,
        selectedPlanet,
        setSelectedPlanet,
        scientificAchievements,
        incrementScientificAchievements,
        missionsCompleted,
        incrementMissionsCompleted,
        planetsExplored,
        addPlanetExplored
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
