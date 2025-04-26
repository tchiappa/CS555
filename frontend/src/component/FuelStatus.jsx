// src/components/FuelStatus.jsx
import React, {useContext} from "react";
import GameContext from "../context/GameContext.jsx";

export default function FuelStatus() {
    const {fuel} = useContext(GameContext);
    return (
        <div className="mt-15 mb-4 bg-linear-to-br from-blue-900 to-blue-950 text-white px-6 py-6 rounded-xl w-3/4">
            <p>
                🚀 Current Fuel: <strong>{fuel}</strong>
            </p>
        </div>
    );
}