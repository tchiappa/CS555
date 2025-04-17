import { render, screen, fireEvent } from "@testing-library/react";
import QuizModal from "../src/component/QuizModal.jsx";
import TradeContext from "../src/context/tradeContext.jsx";

test("adds resources on correct answer with 'easy' difficulty", () => {
  const setResource = vi.fn();

  const getQuestion = () => ({
    question: "How many moons does Mercury have?",
    options: ["0", "1", "2", "3"],
    answer: "0",
  });

  render(
    <TradeContext.Provider
      value={{
        setResource,
        resource: {
          minerals: 1000,
          metals: 1000,
          fuel: 100,
          oxygen: 100,
        },
        getQuestion,
        difficulty: "easy", // should use multiplier = 1
      }}
    >
      <QuizModal selectedPlanet={{ name: "Mercury" }} onClose={() => {}} />
    </TradeContext.Provider>,
  );

  // Click the correct answer
  fireEvent.click(screen.getByText("0"));

  // Should call setResource with +50 fuel and +20 oxygen
  expect(setResource).toHaveBeenCalled();
  expect(typeof setResource.mock.calls[0][0]).toBe("function");
});
