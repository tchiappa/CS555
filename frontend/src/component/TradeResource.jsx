export function TradeResource({resource, fuel, setFuel, playerResources, setPlayerResources}) {

    function onTrade(e) {
        e.stopPropagation();

        const currentAmount = playerResources[resource.name] || 0;

        if (currentAmount <= 0) return;

        const updatedPlayerResources = {
            ...playerResources,
            [resource.name]: currentAmount - 1
        };

        // Clean up if count drops to 0
        if (updatedPlayerResources[resource.name] === 0) {
            delete updatedPlayerResources[resource.name];
        }

        setPlayerResources(updatedPlayerResources);
        setFuel(fuel + resource.value);
    }

    return (
        <li className="resource" style={{ opacity: resource.available ? 1 : 0.5 }}>
            <div className="resource-name">{resource?.name}</div>
            <div>
                <span className="fuel-value" data-testid="trade-resource-name">+{resource?.value} Fuel</span>
                <button onClick={onTrade} disabled={!resource.available} data-testid="trade-terminal-trade-button">Trade</button>
            </div>
        </li>
    );
}