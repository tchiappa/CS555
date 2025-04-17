export function TradeInventory({inventory}) {
    return <div>
        <h2>Trade Inventory</h2>
        <p>Inventory of items to trade for fuel.</p>

        <div className="trade-panel">
            <ul className="resource-list">
                {inventory.map(([name, count]) => (
                    <li className="resource">
                        <div className="resource-name">{name}</div>
                        <div>{count}</div>
                    </li>
                ))}
            </ul>
        </div>
    </div>;
}