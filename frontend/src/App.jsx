import {GameProvider} from "./context/GameContext.jsx";
import React, {useEffect, useRef, useState} from "react";
import backgroundMusic from "./assets/background.mp3";
import {Game} from "./component/Game.jsx";
import Welcome from "./component/Welcome.jsx";
import Leaderboard from "./component/Leaderboard.jsx";
import Login from "./component/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
    const [start, setStart] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const audioRef = useRef(null);

    const handleStart = () => {
        setStart(true);
        setShowLeaderboard(false);
        setShowLogin(false);

        // Play background music on start
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.loop = true;
            audioRef.current.play().catch((err) => {
                console.warn('Autoplay prevented:', err);
            });
        }
    };

    const handleShowLeaderboard = () => {
        setShowLeaderboard(true);
        setStart(false);
        setShowLogin(false);
    };

    const handleLogin = () => {
        setShowLogin(false);
        setStart(false);
        setShowLeaderboard(false);
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
        <AuthProvider>
            <GameProvider>
                <audio ref={audioRef} src={backgroundMusic}/>
                {showLogin ? (
                    <Login onLogin={handleLogin} />
                ) : start ? (
                    <Game onShowLeaderboard={handleShowLeaderboard}/>
                ) : showLeaderboard ? (
                    <Leaderboard onBack={() => setShowLeaderboard(false)}/>
                ) : (
                    <Welcome handleStart={handleStart} onShowLeaderboard={handleShowLeaderboard}/>
                )}
            </GameProvider>
        </AuthProvider>
    );
}

export default App;
