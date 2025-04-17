import {useContext} from "react";
import {TradeResource} from "./TradeResource.jsx";
import TradeContext from "../context/tradeContext.jsx";

export function TradeTerminal({selectedPlanet}) {
    const {fuel, playerResources, planetaryResources} =
        useContext(TradeContext);

    const baseResources =
        planetaryResources[selectedPlanet?.name] || planetaryResources["Earth"];

    // Enrich trade offers with availability info
    const resources = baseResources.map((resource, index) => ({
        name: resource.name,
        value: resource.value,
        available: playerResources[resource.name] || 0,
    }));

    return (
        <div>
            <h2>Trade Terminal</h2>
            <p>Exchange resources for fuel. Prices may vary.</p>

            <div className="trade-panel">
                <ul className="resource-list">
                    {resources.map((resource, index) => (
                        <TradeResource
                            key={index}
                            resource={resource}
                        />
                    ))}
                </ul>

                <div className="fuel-display">
                    <p>
                        Current Fuel: <strong>{fuel}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
