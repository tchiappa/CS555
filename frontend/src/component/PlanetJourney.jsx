import React, {useContext, useState, useRef, useEffect} from "react";
import QuizModal from "./QuizModal";
import TradeContext from "../context/tradeContext";
import {getPlanetInfo} from "../planetInfo/getPlanetInfo";
import travelSoundFile from "../assets/spaceship-fly.mp3";
import {planetDetails} from "../planetInfo/planetDetails";


export function PlanetJourney({selectedPlanet, onExit}) {
    const [fade, setFade] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showSummary, setShowSummary] = useState(true);
    const [showAbout, setShowAbout] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [selectedFact, setSelectedFact] = useState(null);

    const travelSoundRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    useEffect(() => {
        setTimeout(() => setFade(true), 2000);
        if (travelSoundRef.current) {
            travelSoundRef.current.volume = volume;
            travelSoundRef.current.play().catch((e) => console.log("Autoplay blocked", e));
        }
        return () => {
            travelSoundRef.current?.pause();
        };
    }, [volume]);

    const {information, funFacts} = getPlanetInfo(selectedPlanet.name);

    const handleFactClick = (fact) => {
        setSelectedFact(fact);
        const utterance = new SpeechSynthesisUtterance(fact);
        synthRef.current.cancel();
        synthRef.current.speak(utterance);
    };

    const handleAboutClick = () => {
        setShowAbout(true);
        setShowSummary(false);
    };

    const handleReturnClick = () => {
        setShowAbout(false);
        setShowSummary(true);
    };

    return (
        <div id="planet-journey" className={`text-center p-5 transition-opacity duration-2000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <audio ref={travelSoundRef} src={travelSoundFile}/>

            {/*<h2>🚀 Traveling...</h2>*/}
            <h2 className="text-lg font-bold mb-4">Welcome to {selectedPlanet.name}!</h2>
            <img
                src={selectedPlanet.image}
                alt={selectedPlanet.name}
                className="w-[450px] h-[250px] rounded-[10%] mx-auto"
            />

            {showSummary && (
                <div>
                    <h3 className="mt-6 text-xl font-semibold">🌍 Planet Summary</h3>
                    <p>{information}</p>
                    <h3 className="mt-4 text-xl font-semibold">🪐 Fun Planet Facts</h3>
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
                                            ? 'bg-gradient-to-br from-blue-600 to-blue-900 text-white scale-105'
                                            : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 hover:scale-105'
                                    }`}
                                >
                                    {fact}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={() => setShowQuiz(true)}
                            className="p-2 px-6 bg-blue-600 hover:bg-blue-800 disabled:bg-zinc-600 text-base text-white disabled:text-zinc-400 mb-2 rounded-lg transition">
                            Start Quiz
                        </button>
                        <button
                            onClick={handleAboutClick}
                            className="p-2 px-6 bg-blue-600 hover:bg-blue-800 disabled:bg-zinc-600 text-base text-white disabled:text-zinc-400 mb-2 rounded-lg transition">
                            Explore More
                        </button>
                    </div>
                </div>
            )}

            {showAbout && (
                <div className="mt-5">
                    <h3 className="text-xl font-semibold">🧭 About {selectedPlanet.name}</h3>
                    <p><strong>Terrain:</strong> {planetDetails[selectedPlanet.name]?.terrain}</p>
                    <p><strong>Atmosphere:</strong> {planetDetails[selectedPlanet.name]?.atmosphere}</p>
                    <p><strong>Did You Know?</strong> {planetDetails[selectedPlanet.name]?.interestingFact}</p>
                    <button
                        onClick={handleReturnClick}
                        className="mt-5 p-2 px-6 bg-blue-600 hover:bg-blue-800 disabled:bg-zinc-600 text-base text-white disabled:text-zinc-400 mb-2 rounded-lg transition">
                        Return
                    </button>
                </div>
            )}

            {showQuiz && selectedPlanet && (
                <QuizModal
                    selectedPlanet={selectedPlanet}
                    onClose={() => {
                        setShowQuiz(false);
                        onExit();
                    }}
                />
            )}
        </div>
    );
}
