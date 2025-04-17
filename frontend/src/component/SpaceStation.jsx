import "./SpaceStation.css";
import {useState} from "react";
import {planetaryResources} from "../planetInfo/planetaryResources.js";
import {TradeTerminal} from "./TradeTerminal.jsx";
import {TradeInventory} from "./TradeInventory.jsx";

function SpaceStation({selectedPlanet, fuel, setFuel, playerResources, setPlayerResources}) {
    const [isActive, setIsActive] = useState(false);

    const baseResources = planetaryResources[selectedPlanet?.name] || planetaryResources["Earth"];

    // Enrich trade offers with availability info
    const resources = baseResources.map((resource, index) => ({
        name: resource.name,
        value: resource.value,
        available: playerResources[resource.name] || 0
    }));

    const inventory = Object.entries(playerResources).filter(([_, count]) => count > 0);

    function handleOpen(e) {
        e.stopPropagation();
        setIsActive(true);
    }

    function handleClose(e) {
        e.stopPropagation();
        setIsActive(false);
    }

    if (!isActive) {
        // Display the button to open the "SpaceStation" popup at the bottom right of the page.
        return (
            <button className="enter-button" data-testid="space-station-enter-button" onClick={handleOpen}>Space
                Station</button>
        );
    }

    // Display the "SpaceStation" popup.
    return (
        <div className="space-station">
            <div className="scanline-overlay"></div>

            <div className="station-light top-left"></div>
            <div className="station-light bottom-right"></div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                columnGap: "100px"
            }}>
                <TradeInventory inventory={inventory} />
                <TradeTerminal resources={resources}
                               fuel={fuel}
                               setFuel={setFuel}
                               playerResources={playerResources}
                               setPlayerResources={setPlayerResources}/>
            </div>
            <button className="exit-button" data-testid="space-station-exit-button" onClick={handleClose}>Leave
                Station
            </button>
        </div>
    );
}

export default SpaceStation;
