import {useContext} from "react";
import TradeContext from "../context/tradeContext";

export function TradeInventory() {
    const {playerResources} = useContext(TradeContext);
    const inventory = Object.entries(playerResources).filter(
        ([_, count]) => count > 0,
    );
    return (
        <div className="flex-none bg-white/5 border border-teal-400 rounded-lg p-4 w-2/5 overflow-y-auto">
            <div className="text-center space-y-2 mb-5">
                <h2 className="text-2xl font-bold">Trade Inventory</h2>
                <p className="text-sm">Inventory of items to trade for fuel.</p>
            </div>
            <ul className="space-y-2">
                {inventory.map(([name, count]) => (
                    <li className="flex justify-between border-b border-white/10 pb-1">
                        <span>{name}</span>
                        <span>{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
