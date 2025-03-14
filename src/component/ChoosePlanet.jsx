import { useState } from "react";
import "./ChoosePlanet.css";

export const ChoosePlanet = ({ planets }) => {
  const [planet, setPlanet] = planets;
  console.log(planets);

  return (
    <div className="popup">
      {console.log(planet)}
      {planet.map((p, i) => (
        <div key={i}>{p.name}</div>
      ))}
    </div>
  );
};
