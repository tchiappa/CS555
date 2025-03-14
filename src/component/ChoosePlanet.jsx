import { useState } from "react";
import "./ChoosePlanet.css";

export const ChoosePlanet = ({ planets }) => {
  const [planet, setPlanet] = planets;
  
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2 className="popup-title">Choose a Planet</h2>
        <div className="planet-list">
          {planet.map((p, i) => (
            <div key={i} className="planet-item">
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

