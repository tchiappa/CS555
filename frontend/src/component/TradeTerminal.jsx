import {useContext} from "react";
import {TradeResource} from "./TradeResource.jsx";
import GameContext from "../context/GameContext.jsx";

export function TradeTerminal({selectedPlanet}) {
    const {fuel, playerResources, planetaryResources} =
        useContext(GameContext);

    const baseResources =
        planetaryResources[selectedPlanet?.name] || planetaryResources["Earth"];

    // Enrich trade offers with availability info
    const resources = baseResources.map((resource, index) => ({
        name: resource.name,
        value: resource.value,
        available: playerResources[resource.name] || 0,
    }));

    return (
        <div className="flex-auto bg-white/5 border border-green-400 text-green-300 rounded-lg p-4 overflow-y-auto">
            <div className="text-center space-y-2 mb-5">
                <h2 className="text-2xl font-bold">Trade Terminal</h2>
                <p className="text-sm">Exchange resources for fuel. Prices may vary.</p>
            </div>

            <ul className="space-y-2">
                {resources.map((resource, index) => (
                    <TradeResource
                        key={index}
                        resource={resource}
                    />
                ))}
            </ul>

            <div className="mt-4 text-center text-lg font-mono text-shadow-sm">
                Current Fuel: <strong>{fuel}</strong>
            </div>
        </div>
    );
}
