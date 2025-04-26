import React, {useContext, useState} from "react";
import GameContext from "../context/GameContext.jsx";

// You can move this to a shared data file if you want reuse
let planets = [
    {name: "Mercury", symbol: "263F", image: "./giphy.gif", fuelCoast: 2, traveled: false},
    {name: "Venus", symbol: "2640", image: "./vgiphy.gif", fuelCoast: 4, traveled: false},
    {name: "Earth", symbol: "2641", image: "./egiphy.gif", fuelCoast: 6, traveled: false},
    {name: "Mars", symbol: "2642", image: "./mgiphy.gif", fuelCoast: 8, traveled: false},
    {name: "Jupiter", symbol: "2643", image: "./jgiphy.gif", fuelCoast: 10, traveled: false},
    {name: "Saturn", symbol: "2644", image: "./sgiphy.gif", fuelCoast: 12, traveled: false},
    {name: "Uranus", symbol: "26E2", image: "./ugiphy.gif", fuelCoast: 14, traveled: false},
    {name: "Neptune", symbol: "2646", image: "./ngiphy.gif", fuelCoast: 16, traveled: false}
];

export function ChoosePlanet({onPlanetSelect}) {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const {fuel} = useContext(GameContext);

    const handleSelection = (planetName) => {
        const found = planets.find((p) => p.name === planetName);
        if (found) {
            const updatedPlanets = planets.map((p) =>
                p.name === planetName ? {...p, traveled: true} : p
            );
            planets = updatedPlanets; // Update the planets array

            setSelectedPlanet(found); // for preview
            onPlanetSelect(found); // for triggering game logic
        }
    };

    return (
        <div id="choose-planet" className="w-full h-full p-5 pb-20 flex flex-col items-stretch justify-start">
            <h2 className="m-4 text-center font-bold">Visit a Planet</h2>
            <div className="grow h-full flex flex-col items-center justify-between">
                {planets.map((planet) => (
                    <div
                        key={planet.name}
                        onClick={
                            !planet.traveled && fuel >= planet.fuelCoast
                                ? () => handleSelection(planet.name)
                                : undefined
                        }
                        className={`w-3/4 px-6 py-4 rounded-2xl text-center shadow-md transform transition-all duration-300
                                    ${planet.traveled
                            ? 'bg-linear-to-br from-zinc-700/50 to-zinc-800/50 text-gray-400/50'
                            : fuel < planet.fuelCoast
                                ? 'bg-linear-to-br from-red-900 to-red-950 text-red-500'
                                : 'bg-linear-to-br from-indigo-800 to-indigo-900 hover:from-indigo-900 hover:to-indigo-950 text-white hover:scale-105 cursor-pointer'
                        }`}
                    >
                        <div className="font-bold">{String.fromCharCode(parseInt(planet.symbol,16))} {planet.name}</div>
                        <div className="text-sm">
                            {planet.traveled
                                ? '(Already Visited)'
                                : `Required Fuel: ${planet.fuelCoast}`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
