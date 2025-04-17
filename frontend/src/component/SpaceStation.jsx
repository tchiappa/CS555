import "./SpaceStation.css";
import {useContext, useState} from "react";
import {TradeTerminal} from "./TradeTerminal.jsx";
import {TradeInventory} from "./TradeInventory.jsx";
import TradeContext from "../context/tradeContext.jsx";

function SpaceStation({selectedPlanet}) {
    const [isActive, setIsActive] = useState(false);

    const {stationVisits, setStationVisits} =
        useContext(TradeContext);

    function handleOpen(e) {
        e.stopPropagation();
        setStationVisits(stationVisits+1);
        setIsActive(true);
    }

    function handleClose(e) {
        e.stopPropagation();
        setIsActive(false);
    }

    if (!isActive) {
        // Display the button to open the "SpaceStation" popup at the bottom right of the page.
        if (stationVisits >= 3) {
            return null;
        }

        return (
            <button
                className="enter-button"
                data-testid="space-station-enter-button"
                onClick={handleOpen}
            >
                Space Station (Visits Remaining: {3 - stationVisits})
            </button>
        );
    }

    // Display the "SpaceStation" popup.
    return (
        <div className="space-station">
            <div className="scanline-overlay"></div>

            <div className="station-light top-left"></div>
            <div className="station-light bottom-right"></div>

            <h1>Space Station</h1>
            <div>Station Visits Remaining: {3 - stationVisits}</div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    columnGap: "100px",
                }}
            >
                <TradeInventory/>
                <TradeTerminal selectedPlanet={selectedPlanet}/>
            </div>
            <button
                className="exit-button"
                data-testid="space-station-exit-button"
                onClick={handleClose}
            >
                Leave Station
            </button>
        </div>
    );
}

export default SpaceStation;
