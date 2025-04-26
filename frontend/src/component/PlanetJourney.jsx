import React, {useEffect, useRef, useState} from "react";
import QuizModal from "./QuizModal";
import travelSoundFile from "../assets/spaceship-fly.mp3";
import {planetDetails} from "../planetInfo/planetDetails";
import PlanetSummary from "./PlanetSummary.jsx";
import SpaceStationButton from "./SpaceStationButton.jsx";

export function PlanetJourney({selectedPlanet, onExit}) {
    const [fade, setFade] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showSummary, setShowSummary] = useState(true);
    const [showAbout, setShowAbout] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const travelSoundRef = useRef(null);

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

            <h2 className="text-3xl text-blue-400 font-bold mb-5">Welcome to {selectedPlanet.name}!</h2>
            <img
                src={selectedPlanet.image}
                alt={selectedPlanet.name}
                className="w-[450px] h-[250px] rounded-[10%] mx-auto"
            />

            {showSummary && (
                <div>
                    <PlanetSummary selectedPlanet={selectedPlanet} />
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
                    <div className="mt-10">
                        <SpaceStationButton />
                    </div>
                    <div>
                        <button
                            className="mt-10 p-2 px-6 bg-orange-600 hover:bg-orange-800 mb-2 rounded-lg"
                            onClick={onExit}>
                            Leave Orbit
                        </button>
                    </div>
                </div>
            )}

            {showAbout && (
                <div className="mt-6">
                    <h3 className="mb-2 text-xl font-bold">🧭 About {selectedPlanet.name}</h3>
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
                        //onExit();
                    }}
                />
            )}
        </div>
    );
}
