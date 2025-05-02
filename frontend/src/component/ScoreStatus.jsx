import React, {useContext} from "react";
import GameContext from "../context/GameContext.jsx";

export default function ScoreStatus() {
    const {points} = useContext(GameContext);
    return (
        <div className="my-4 bg-linear-to-br from-sky-900 to-sky-950 text-white px-6 py-6 rounded-xl w-3/4">
            <p>
                🏅 Points Earned: <strong>{points}</strong>
            </p>
        </div>
    );
}