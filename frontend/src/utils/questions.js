import questions from "../planetInfo/data.js";

export const getPlanetInfo = (planet) =>
  questions.planets.find(
    (planets) => planets.name.toLowerCase() === planet.toLowerCase(),
  );
