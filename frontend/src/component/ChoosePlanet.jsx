import React, {useContext, useState} from "react";
import TradeContext from "../context/tradeContext";

// You can move this to a shared data file if you want reuse
let planets = [
    {name: "Mercury", image: "./giphy.gif", fuelCoast: 2},
    {name: "Venus", image: "./vgiphy.gif", fuelCoast: 4},
    {name: "Earth", image: "./egiphy.gif", fuelCoast: 6},
    {name: "Mars", image: "./mgiphy.gif", fuelCoast: 8},
    {name: "Jupiter", image: "./jgiphy.gif", fuelCoast: 10},
    {name: "Saturn", image: "./sgiphy.gif", fuelCoast: 12},
    {name: "Uranus", image: "./ugiphy.gif", fuelCoast: 14},
    {name: "Neptune", image: "./ngiphy.gif", fuelCoast: 16}
];

export function ChoosePlanet({onPlanetSelect}) {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const {fuel} = useContext(TradeContext);

    const handleSelection = (e) => {
        const planetName = e.target.value;
        if (!planetName) return;

        const found = planets.find((p) => p.name === planetName);
        planets = planets.filter((p) => p != found);
        if (found) {
            setSelectedPlanet(found); // for preview
            onPlanetSelect(found); // for triggering game logic
        }
    };

    return (
        <div id="choose-planet" className="text-center p-5">
            {planets.length > 0 && (
                <>
                    <h2 className="m-4">Select a Planet:</h2>
                    <select
                        onChange={handleSelection}
                        className="bg-blue-900 rounded-xl p-2 px-6 text-lg text-white">
                        <option value="">Choose a planet</option>
                        {planets.map(
                            (planet) =>
                                (
                                    <option key={planet.name} value={planet.name} disabled={fuel < planet.fuelCoast}>
                                        {planet.name} - Required Fuel: {planet.fuelCoast}
                                    </option>
                                )
                        )}
                    </select>
                </>
            )}
            {planets.length == 0 && (
                <h2>game over</h2>
            )}

            {/* Optional Preview */}
            {selectedPlanet && planets.length > 0 && (
                <div>
                    <img
                        src={selectedPlanet.image}
                        alt={selectedPlanet.name}
                        width="150"
                        className="rounded-lg mb-4"
                    />
                </div>
            )}
        </div>
    );
}
