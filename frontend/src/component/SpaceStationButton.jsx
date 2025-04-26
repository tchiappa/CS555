import {useContext} from "react";
import GameContext from "../context/GameContext.jsx";
import ContainerContext from "../context/ContainerContext.jsx";

export default function SpaceStationButton() {
    const {setSidebarsActive, setSpaceStationActive} = useContext(ContainerContext);
    const {stationVisits, setStationVisits} = useContext(GameContext);

    function handleOpen(e) {
        e.stopPropagation();
        setStationVisits(stationVisits + 1);
        setSidebarsActive(false);
        setSpaceStationActive(true);
    }

    // Display the button to open the "SpaceStation" popup at the bottom right of the page.
    if (stationVisits >= 3) {
        return null;
    }

    return (
        <button
            className="p-2 px-6 bg-blue-600 hover:bg-blue-800 disabled:bg-zinc-600 text-white disabled:text-zinc-400 mb-2 rounded-lg"
            data-testid="space-station-enter-button"
            onClick={handleOpen}>
            Space Station (Visits Remaining: {3 - stationVisits})
        </button>
    );
}