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
import DialogueMockup from "./DialogueMockup.jsx";
import { MissionControl } from "./MissionControl.jsx";

export function Game() {
    const [showTutorial, setShowTutorial] = useState(true);
    const [pendingPlanet, setPendingPlanet] = useState(null);
    const {selectedPlanet, setSelectedPlanet, end, setFuel} = useContext(GameContext);
    const [showDialogue, setShowDialogue] = useState(false);
    const [startFuel, setStartFuel] = useState(null);
    const [missionSummaryData, setMissionSummaryData] = useState({
        fuelUsedPercent: 0,
        resourcesCollected: {},
    });

    const { playerResources, fuel, points } = useContext(GameContext);
    const {currentEncounter, maybeTriggerEncounter, resolveEncounter, clearEncounter} = useEncounter();

    const handleEncounter = (e) => {
        setSelectedPlanet(pendingPlanet);
        setPendingPlanet(null);
        clearEncounter();
    };

    const handlePlanetSelect = (planet) => {
        console.log("🌍 Planet selected in Scene:", planet);

        setStartFuel(fuel);
        setFuel((prev)=> Math.max(0,prev - planet.fuelCoast))

        const encounter = maybeTriggerEncounter();
        if (encounter) {
            setPendingPlanet(planet);
        } else {
            setSelectedPlanet(planet);
        }
    };

    const handleMissionComplete = () => {
        const fuelSpent = startFuel - fuel;
        const fuelUsedPercent = startFuel > 0 ? Math.round((fuel / startFuel) * 100) : 0;
        const totalResources = Object.values(playerResources).reduce((a, b) => a + b, 0);
        console.log("📦 playerResources at mission complete:", playerResources);

        setMissionSummaryData({
            fuelUsedPercent,
            resourcesCollectedDetail: playerResources,
            resourcesCollected: totalResources,
        });
       
    };

    return (
        <ContainerProvider>
            <SolarSystem />

            {showTutorial && (
                <TutorialOverlay onFinish={() => setShowTutorial(false)} />
            )}

            <Encounter
                encounter={currentEncounter}
                onChooseOption={(opt, handleOpt) => resolveEncounter(opt, handleOpt)}
                onClose={handleEncounter}
            />

            {!end && (
                <>
                    <RightPanel>
                        <FuelStatus />
                        <ScoreStatus />
                        <InventoryStatus />
                        <AICopilot />
                        <MissionControl onClick={() => setShowDialogue(true)} />
                        <EndGame />
                       
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
                        <SpaceStation selectedPlanet={selectedPlanet}
                        onMissionComplete={handleMissionComplete} />
                    )}
                </>
            )}

            {showDialogue && (
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2000,
                        pointerEvents: "auto",
                        minWidth: "400px",
                        maxWidth: "90vw",
                    }}
                >
                    <DialogueMockup
                        onClose={() => setShowDialogue(false)}
                        fuelUsedPercent={fuel}
                        pointsEarned={points}
                        resourcesCollected={playerResources}
                        currentFuel={fuel}
                    />
                </div>
            )}

            {end && <GameOver />}
        </ContainerProvider>
    );
}


