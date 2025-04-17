import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { describe, it, expect } from "vitest";
import TradeContext, { TradeProvider } from "../src/context/tradeContext";

function TestComponent() {
  const { resource, giveFreeFuel } = useContext(TradeContext);

  return (
    <div>
      <p data-testid="fuel">{resource.fuel}</p>
      <button onClick={giveFreeFuel}>Give Fuel</button>
    </div>
  );
}

describe("TradeProvider with smelly bug", () => {
  it("gives fuel but resets other values", () => {
    render(
      <TradeProvider>
        <TestComponent />
      </TradeProvider>,
    );

    expect(screen.getByTestId("fuel").textContent).toBe("100");

    screen.getByText("Give Fuel").click();

    setTimeout(() => {
      expect(screen.getByTestId("fuel").textContent).toBe("500");
    }, 1000);
  });
});
