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
                className="fixed bottom-10 right-10 p-2 px-6 bg-blue-600 hover:bg-blue-800 disabled:bg-zinc-600 text-white disabled:text-zinc-400 mb-2 rounded-lg"
                // className="fixed bottom-10 right-10 rounded-lg border-2 border-teal-300 hover:border-teal-800 px-5 py-2 bg-black hover:bg-teal-200 text-teal-300 hover:text-teal-800"
                data-testid="space-station-enter-button"
                onClick={handleOpen}>
                Space Station (Visits Remaining: {3 - stationVisits})
            </button>
        );
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