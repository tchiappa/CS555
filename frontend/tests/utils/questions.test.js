import { expect } from "vitest";
import {
  adjustDifficult,
  getPlanetInfo,
  getQuestion,
} from "../../src/utils/questions";

describe("Get planet info", () => {
  it("based on name of the planet passed in the argument", () => {
    expect(getPlanetInfo("earth")).toBeInstanceOf(Object);
    expect(getPlanetInfo("Mercury")).toBeInstanceOf(Object);
  });
});

describe("Adjust difficulty", () => {
  it("based on previous answers and current difficulty", () => {
    expect(adjustDifficult("easy", true, true)).toBe("medium");
    expect(adjustDifficult("medium", true, true)).toBe("hard");
    expect(adjustDifficult("hard", true, true)).toBe("hard");
    expect(adjustDifficult("easy", false, true)).toBe("easy");
    expect(adjustDifficult("hard", false, false)).toBe("medium");
    expect(adjustDifficult("medium", false, false)).toBe("easy");
    expect(adjustDifficult("easy", false, false)).toBe("easy");
  });
});

describe("Get question", () => {
  it("based on name of the planet passed and current difficulty and previous answers", () => {
    let result = getPlanetInfo("earth").questions["medium"].slice(-1)[0];
    expect(getQuestion("earth", "easy", true, true)).toBe(result);
    result = getPlanetInfo("Mercury").questions["medium"].slice(-1)[0];
    expect(getQuestion("Mercury", "hard", false, false)).toBe(result);
  });
});
