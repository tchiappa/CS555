import {useContext} from "react";
import TradeContext from "../context/tradeContext";

export function TradeInventory() {
    const {playerResources} = useContext(TradeContext);
    const inventory = Object.entries(playerResources).filter(
        ([_, count]) => count > 0,
    );
    return (
        <div>
            <h2>Trade Inventory</h2>
            <p>Inventory of items to trade for fuel.</p>

            <div className="trade-panel">
                <ul className="resource-list">
                    {inventory.map(([name, count]) => (
                        <li className="resource">
                            <div className="resource-name">{name}</div>
                            <div style={{paddingLeft: "50px"}}>{count}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
