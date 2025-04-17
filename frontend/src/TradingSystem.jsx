import { useContext, useEffect } from "react";
import TradeContext from "./context/tradeContext";

const MINERALS = 50;
const FUEL = 20;
const METALS = 30;
const OXYGEN = 15;

export const TradingSystem = () => {
  const { resource, setResource, difficulty } = useContext(TradeContext);
  const tradeMinerals = () => {
    if (resource.minerals < MINERALS) return;
    setResource((prev) => ({
      ...prev,
      minerals: prev.minerals - MINERALS,
      fuel: prev.fuel + FUEL,
    }));
  };

  const tradeMetals = () => {
    if (resource.metals < METALS) return;
    setResource((prev) => ({
      ...prev,
      metals: prev.metals - METALS,
      oxygen: prev.oxygen + OXYGEN,
    }));
  };

  return (
    <div>
      <h2>Space Station Trading System</h2>

      <h3>Difficulty - {difficulty}</h3>
      <div>
        <h3>Your Resources</h3>
        <div>
          <div>minerals - {resource.minerals}</div>
          <div>metals - {resource.metals}</div>
        </div>
      </div>

      <div>
        <h3>Available Trades</h3>
        <div>
          <div>
            <span>
              {MINERALS} Minerals → {FUEL} Fuel
            </span>
            <button onClick={tradeMinerals}>Trade</button>
          </div>
          <div>
            <span>
              {METALS} Metals → {OXYGEN} Oxygen
            </span>
            <button onClick={tradeMetals}>Trade</button>
          </div>
        </div>
      </div>

      <div>
        <h3>Your fuel and oxygen</h3>
        <div>
          <div>Fuel - {resource.fuel}</div>
          <div>Oxygen - {resource.oxygen}</div>
        </div>
      </div>
    </div>
  );
};
