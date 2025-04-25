import {TradeProvider} from "./context/tradeContext";
import React, {useEffect, useRef, useState} from "react";
import backgroundMusic from "./assets/background.mp3";
import {Game} from "./component/Game.jsx";
import Welcome from "./component/Welcome.jsx";

function App() {
    const [start, setStart] = useState(false);
    const audioRef = useRef(null);

    const handleStart = () => {
        setStart(true); // Show the Scene when button is clicked

        // Play background music on start
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.loop = true;
            audioRef.current.play().catch((err) => {
                console.warn('Autoplay prevented:', err);
            });
        }
    };

    // Stop music when unmounted
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    return (
        <TradeProvider>
            <audio ref={audioRef} src={backgroundMusic}/>
            {start ? (
                <Game/>
            ) : (
                <Welcome handleStart={handleStart}/>
            )}
        </TradeProvider>
    );
}

export default App;
