import React, {useEffect, useState, useContext} from "react";
import {ChoosePlanet} from "./ChoosePlanet.jsx";
import {PlanetJourney} from "./PlanetJourney.jsx";
import FuelStatus from "./FuelStatus.jsx";
import SpaceStation from "./SpaceStation.jsx";
import {useHazard} from "../hooks/useHazard.js";
import {Hazard} from "./Hazard.jsx";
import TradeContext from "../context/tradeContext.jsx";
import TutorialOverlay from "./TutorialOverlay.jsx";
import SolarSystem from "./SolarSystem.jsx";

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

    useEffect(() => {
        if (currentHazard && currentHazard.resolved && pendingPlanet) {
            const timeout = setTimeout(() => {
                setSelectedPlanet(pendingPlanet);
                setPendingPlanet(null);
                clearHazard();
            }, 2000); // or however long you want the result to show

            return () => clearTimeout(timeout);
        }
    }, [currentHazard, pendingPlanet]);

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
        <>
            <SolarSystem />

            {showTutorial && (
                <TutorialOverlay
                    onFinish={() => setShowTutorial(false)}
                />
            )}

            <FuelStatus fuel={fuel}/>

            <Hazard
                hazard={currentHazard}
                onChooseOption={(opt) => resolveHazard(opt, updateStats)}
                onClose={clearHazard}
            />

            <div className="flex items-center justify-center h-screen w-1/4 bg-zinc-900/75 text-white">
                {/* Show ChoosePlanet only when there's no selected planet */}
                {!selectedPlanet && (
                    <ChoosePlanet onPlanetSelect={handlePlanetSelect}/>
                )}

                {/* Always show the planet journey/info panel if a planet is selected */}
                {selectedPlanet && (
                    <>
                        <SpaceStation
                            selectedPlanet={selectedPlanet}
                            fuel={fuel}
                            setFuel={setFuel}
                            playerResources={playerResources}
                            setPlayerResources={setPlayerResources}
                        />

                        <PlanetJourney
                            selectedPlanet={selectedPlanet}
                            onExit={() => {
                                setSelectedPlanet(null);
                            }}
                        />
                    </>
                )}
            </div>
        </>
    );
}
