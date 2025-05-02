import React, {useEffect, useState, useContext} from "react";
import {ChoosePlanet} from "./ChoosePlanet.jsx";
import {PlanetJourney} from "./PlanetJourney.jsx";
import FuelStatus from "./FuelStatus.jsx";
import {useEncounter} from "../hooks/useEncounter.js";
import {Encounter} from "./Encounter.jsx";
import GameContext from "../context/GameContext.jsx";
import TutorialOverlay from "./TutorialOverlay.jsx";
import SolarSystem from "./SolarSystem.jsx";
import LeftPanel from "./LeftPanel.jsx";
import RightPanel from "./RightPanel.jsx";
import ScoreStatus from "./ScoreStatus.jsx";
import InventoryStatus from "./InventoryStatus.jsx";
import {ContainerProvider} from "../context/ContainerContext.jsx";
import SpaceStation from "./SpaceStation.jsx";
import AICopilot from "./AICopilot.jsx";
import { EndGame } from "./EndGame.jsx";
import GameOver from "./GameOver.jsx";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// Add axios base URL configuration
axios.defaults.baseURL = 'http://localhost:4000';

export function Game({ onShowLeaderboard }) {
    const [showTutorial, setShowTutorial] = useState(true);
    // const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [pendingPlanet, setPendingPlanet] = useState(null);
    const { user } = useAuth();
    const {selectedPlanet, setSelectedPlanet, end, setFuel, points, fuel, scientificAchievements, missionsCompleted, planetsExplored} = useContext(GameContext);

    // ENCOUNTERS
    const {currentEncounter, maybeTriggerEncounter, resolveEncounter, clearEncounter} = useEncounter();

    useEffect(() => {
        if (end) {
            updateLeaderboard();
        }
    }, [end]);

    const updateLeaderboard = async () => {
        try {
            const fuelEfficiency = (fuel / 100) * 100; // Calculate fuel efficiency percentage
            await axios.post('/api/leaderboard/update', {
                playerId: user.id,
                playerName: user.name,
                score: points,
                fuelEfficiency,
                scientificAchievements,
                missionsCompleted,
                planetsExplored: planetsExplored.map(p => p.name)
            });
        } catch (error) {
            console.error('Error updating leaderboard:', error);
        }
    };

    const handleEncounter = (e) => {
        setSelectedPlanet(pendingPlanet);
        setPendingPlanet(null);
        clearEncounter();
    };

    const handlePlanetSelect = (planet) => {
        console.log("🌍 Planet selected in Scene:", planet);
        setFuel((prev)=> Math.max(0,prev - planet.fuelCoast))
        const encounter = maybeTriggerEncounter();
        if (encounter) {
            // Store selected planet for later, wait for encounter resolution
            setPendingPlanet(planet);
        } else {
            // No encounter, travel immediately
            setSelectedPlanet(planet);
        }
    };

    return (
        <ContainerProvider>
            <SolarSystem />

            {showTutorial && (
                <TutorialOverlay
                    onFinish={() => setShowTutorial(false)}
                />
            )}

            <Encounter
                encounter={currentEncounter}
                onChooseOption={(opt, handleOpt) => resolveEncounter(opt, handleOpt)}
                onClose={handleEncounter}
            />

            {/* Right now the RightPanel has to come before the LeftPanel for the SpaceStation to show correctly.
            This is not exactly an ideal situation. */}
            {!end &&
            <>
                <RightPanel>
                    <FuelStatus />
                    <ScoreStatus />
                    <InventoryStatus />
                    <AICopilot />
                    <EndGame/>
                    <button 
                        onClick={onShowLeaderboard}
                        className="mt-4 p-2 px-4 bg-green-600 hover:bg-green-800 text-white rounded-lg transition"
                    >
                        View Leaderboard
                    </button>
                </RightPanel>

                <LeftPanel>
                    {selectedPlanet ? (
                        <PlanetJourney
                            selectedPlanet={selectedPlanet}
                            onExit={() => setSelectedPlanet(null)}
                        />
                    ) : (
                        <ChoosePlanet onPlanetSelect={handlePlanetSelect} />
                    )}
                </LeftPanel>
                {selectedPlanet && (
                    <SpaceStation selectedPlanet={selectedPlanet} />
                )}
            </>
            }
            {end && <GameOver/> }
        </ContainerProvider>
    );
}
