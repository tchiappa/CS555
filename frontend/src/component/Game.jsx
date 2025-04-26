import React, {useEffect, useState, useContext} from "react";
import {ChoosePlanet} from "./ChoosePlanet.jsx";
import {PlanetJourney} from "./PlanetJourney.jsx";
import FuelStatus from "./FuelStatus.jsx";
import {useHazard} from "../hooks/useHazard.js";
import {Hazard} from "./Hazard.jsx";
import TradeContext from "../context/tradeContext.jsx";
import TutorialOverlay from "./TutorialOverlay.jsx";
import SolarSystem from "./SolarSystem.jsx";
import LeftPanel from "./LeftPanel.jsx";
import RightPanel from "./RightPanel.jsx";
import ScoreStatus from "./ScoreStatus.jsx";
import InventoryStatus from "./InventoryStatus.jsx";
import {ContainerProvider} from "../context/ContainerContext.jsx";
import SpaceStation from "./SpaceStation.jsx";
import AICopilot from "./AICopilot.jsx";

export function Game() {
    const [showTutorial, setShowTutorial] = useState(true);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [pendingPlanet, setPendingPlanet] = useState(null);

    const {playerResources, setPlayerResources, fuel, setFuel} = useContext(TradeContext);

    // HAZARDS
    const {currentHazard, maybeTriggerHazard, resolveHazard, clearHazard} = useHazard();
    const updateStats = ({fuel: fuelChange, resources: resChange}) => {
        // Update fuel
        setFuel((f) => Math.max(0, f + fuelChange));

        // Update resources with clamping to zero
        setPlayerResources((prevResources) => {
            const updatedResources = {...prevResources};

            for (const [key, change] of Object.entries(resChange)) {
                const current = updatedResources[key] || 0;
                const newValue = current + change;

                // Prevent values from dropping below 0
                updatedResources[key] = Math.max(0, newValue);
            }

            return updatedResources;
        });
    };

    const handleHazard = (e) => {
        setSelectedPlanet(pendingPlanet);
        setPendingPlanet(null);
        clearHazard();
    };

    const handlePlanetSelect = (planet) => {
        console.log("🌍 Planet selected in Scene:", planet);

        const hazard = maybeTriggerHazard();

        if (hazard) {
            // Store selected planet for later, wait for hazard resolution
            setPendingPlanet(planet);
        } else {
            // No hazard, travel immediately
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

            <Hazard
                hazard={currentHazard}
                onChooseOption={(opt) => resolveHazard(opt, updateStats)}
                onClose={handleHazard}
            />

            {/* Right now the RightPanel has to come before the LeftPanel for the SpaceStation to show correctly.
            This is not exactly an ideal situation. */}
            <RightPanel>
                <FuelStatus />
                <ScoreStatus />
                <InventoryStatus />
                <AICopilot />
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
        </ContainerProvider>
    );
}
