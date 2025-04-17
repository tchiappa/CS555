import {TradeResource} from "./TradeResource.jsx";

export function TradeTerminal({resources, fuel, setFuel, playerResources, setPlayerResources}) {
    return <div>
        <h2>Trade Terminal</h2>
        <p>Exchange resources for fuel. Prices may vary.</p>

        <div className="trade-panel">
            <ul className="resource-list">
                {resources.map((resource, index) => (
                    <TradeResource key={index}
                                   resource={resource}
                                   fuel={fuel}
                                   setFuel={setFuel}
                                   playerResources={playerResources}
                                   setPlayerResources={setPlayerResources} />
                ))}
            </ul>

            <div className="fuel-display">
                <p>Current Fuel: <strong>{fuel}</strong></p>
            </div>
        </div>
    </div>;
}