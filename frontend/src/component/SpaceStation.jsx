import {useContext} from "react";
import {TradeTerminal} from "./TradeTerminal.jsx";
import {TradeInventory} from "./TradeInventory.jsx";
import GameContext from "../context/GameContext.jsx";
import ContainerContext from "../context/ContainerContext.jsx";

function SpaceStation({selectedPlanet}) {
    const {setSidebarsActive, spaceStationActive, setSpaceStationActive} = useContext(ContainerContext);
    const {stationVisits} = useContext(GameContext);

    function handleClose(e) {
        e.stopPropagation();
        setSidebarsActive(true);
        setSpaceStationActive(false);
    }

    if (!spaceStationActive) {
        return null;
    }

    if (stationVisits >= 3) {
        return null;
    }

    // Display the "SpaceStation" popup.
    return (
        <div className="fixed inset-0 z-[9999] p-10 gap-8 bg-black/90 text-teal-300 flex flex-col items-center justify-start overflow-hidden">
            <h1 className="text-xl font-bold">Space Station</h1>
            <div>Station Visits Remaining: {3 - stationVisits}</div>

            <div className="flex gap-5 w-full">
                <TradeInventory/>
                <TradeTerminal selectedPlanet={selectedPlanet}/>
            </div>
            <button
                className="mt-auto rounded-lg border-2 border-teal-300 hover:border-teal-800 px-5 py-2 bg-black hover:bg-teal-200 text-teal-300 hover:text-teal-800"
                data-testid="space-station-exit-button"
                onClick={handleClose}>
                Leave Station
            </button>
        </div>
    );
}

export default SpaceStation;