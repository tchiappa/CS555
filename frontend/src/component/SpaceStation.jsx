import "./SpaceStation.css";
import {useState} from "react";
import planetaryResources from "../planetInfo/trade";

function SpaceStation({selectedPlanet}) {
    const [isActive, setIsActive] = useState(false);

    const resources = planetaryResources[selectedPlanet] || planetaryResources["Earth"];

    if (isActive) {
        function handleClick(e) {
            e.stopPropagation();
            setIsActive(false);
        }

        return (
            <div className="space-station">
                <div className="scanline-overlay"></div>

                <div className="station-light top-left"></div>
                <div className="station-light bottom-right"></div>

                <div>
                    <h2>Trade Terminal</h2>
                    <p>Exchange resources for fuel. Prices may vary.</p>

                    <div className="trade-panel">
                        <ul className="resource-list">
                            {resources.map((resource, index) => (
                                <li className="resource" key={index}>
                                    <div className="resource-name">{resource.name}</div>
                                    <div>
                                <span className="fuel-value"
                                      style={{paddingRight: "20px"}}>+{resource.value} Fuel</span>
                                        <button>Trade</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="fuel-display">
                            <p>Current Fuel: <strong>25</strong></p>
                        </div>
                    </div>
                </div>

                <button className="exit-button" onClick={handleClick}>Leave Station</button>
            </div>
        );
    } else {
        function handleClick(e) {
            e.stopPropagation();
            setIsActive(true);
        }

        return (
            <button className="enter-button" onClick={handleClick}>Space Station</button>
        );
    }
}

export default SpaceStation;
