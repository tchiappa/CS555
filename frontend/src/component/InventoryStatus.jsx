// src/components/FuelStatus.jsx
import React, {useContext} from "react";
import TradeContext from "../context/tradeContext";

export default function InventoryStatus() {
    const {playerResources} = useContext(TradeContext);
    const inventory = Object.entries(playerResources).filter(
        ([_, count]) => count > 0,
    );

    return (
        <div className="my-4 bg-linear-to-br from-emerald-900 to-emerald-950 text-white px-6 py-6 rounded-xl w-3/4">
            <p className="font-bold mb-4">
                ⚖️ Inventory
            </p>
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