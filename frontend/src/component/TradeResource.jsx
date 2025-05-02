import {useContext} from "react";
import GameContext from "../context/GameContext.jsx";

export function TradeResource({resource}) {
    const {playerResources, setPlayerResources, fuel, setFuel} =
        useContext(GameContext);

    function onTrade(e) {
        e.stopPropagation();

        const currentAmount = playerResources[resource.name] || 0;

        if (currentAmount <= 0) return;

        const updatedPlayerResources = {
            ...playerResources,
            [resource.name]: currentAmount - 1,
        };

        // Clean up if count drops to 0
        if (updatedPlayerResources[resource.name] === 0) {
            delete updatedPlayerResources[resource.name];
        }

        setPlayerResources(updatedPlayerResources);
        setFuel(fuel + resource.value);
    }

    return (
        <li className="flex justify-between items-center bg-white/10 text-green-300 text-base font-mono px-4 py-2 rounded-md">
            <div>{resource?.name}</div>
            <div className="flex items-center gap-4">
                <span className="pr-5">+{resource?.value} Fuel</span>
                <button onClick={onTrade}
                        disabled={!resource.available}
                        data-testid="trade-terminal-trade-button"
                        className="bg-teal-300 text-black font-bold px-3 py-1 rounded hover:bg-green-400 disabled:bg-neutral-700 disabled:text-gray-400 disabled:cursor-not-allowed">
                    Trade
                </button>
            </div>
        </li>
    );
}
