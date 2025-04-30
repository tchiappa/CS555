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

export function Game() {
    const [showTutorial, setShowTutorial] = useState(true);
    // const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [pendingPlanet, setPendingPlanet] = useState(null);

    const {selectedPlanet, setSelectedPlanet,  setPlayerResources,  setFuel, end} = useContext(GameContext);
    // ENCOUNTERS
    const {currentEncounter, maybeTriggerEncounter, resolveEncounter, clearEncounter} = useEncounter();

    const handleEncounter = (e) => {
        setSelectedPlanet(pendingPlanet);
        setPendingPlanet(null);
        clearEncounter();
    };

    const handlePlanetSelect = (planet) => {
        console.log("🌍 Planet selected in Scene:", planet);
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
