import React, {useRef, useState} from "react";
import {getPlanetInfo} from "../planetInfo/getPlanetInfo.js";

export default function PlanetSummary({selectedPlanet}) {
    const [selectedFact, setSelectedFact] = useState(null);

    const synthRef = useRef(window.speechSynthesis);

    const {information, funFacts} = getPlanetInfo(selectedPlanet.name);

    const handleFactClick = (fact) => {
        setSelectedFact(fact);
        const utterance = new SpeechSynthesisUtterance(fact);
        synthRef.current.cancel();
        synthRef.current.speak(utterance);
    };

    return (
        <>
            <h3 className="mt-6 mb-2 text-xl font-bold">🌍 Planet Summary</h3>
            <p>{information}</p>
            <h3 className="mt-4 mb-2 text-xl font-bold">🪐 Fun Planet Facts</h3>
            <div className="grid grid-cols-2 gap-4 justify-items-center mt-4">
                {funFacts?.map((fact, index) => {
                    const isSelected = selectedFact === fact;
                    const isThreeFactsMiddle = funFacts.length === 3 && index === 2;
                    return (
                        <div
                            key={index}
                            onClick={() => handleFactClick(fact)}
                            className={`${
                                isThreeFactsMiddle ? 'col-span-2' : ''
                            } max-w-[300px] px-6 py-4 rounded-2xl text-center text-base font-medium leading-snug cursor-pointer transform transition-all duration-300 shadow-md ${
                                isSelected
                                    ? 'bg-linear-to-br from-blue-600 to-blue-900 text-white scale-105'
                                    : 'bg-linear-to-br from-gray-800 to-gray-900 text-gray-200 hover:scale-105'
                            }`}
                        >
                            {fact}
                        </div>
                    );
                })}
            </div>
        </>
    );
}