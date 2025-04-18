import questions from "../planetInfo/data.js";

export const getPlanetInfo = (planet) =>
  questions.planets.find(
    (planets) => planets.name.toLowerCase() === planet.toLowerCase(),
  );

export const adjustDifficult = (previousLevel, secondLastAns, lastAns) => {
  // Ans are boolean
  if (secondLastAns !== lastAns) return previousLevel;
  if (lastAns) {
    if (previousLevel === "easy") return "medium";
    if (previousLevel === "medium") return "hard";
  } else {
    if (previousLevel === "hard") return "medium";
    if (previousLevel === "medium") return "easy";
  }
  return previousLevel;
};

export const getQuestion = (planet, previousLevel, secondLastAns, lastAns) => {
  const planetInfo = getPlanetInfo(planet);
  const difficulty = adjustDifficult(previousLevel, secondLastAns, lastAns);

  return planetInfo.questions[difficulty].pop();
};
