import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import SpaceStation from "../../src/component/SpaceStation.jsx";
import { TradeTerminal } from "../../src/component/TradeTerminal.jsx";
import { TradeResource } from "../../src/component/TradeResource.jsx";
import { TradeProvider } from "../../src/context/tradeContext.jsx";

vi.mock("../../src/planetInfo/planetaryResources", () => ({
  planetaryResources: {
    Earth: [{ name: "Water Ice", value: 1 }],
    Mars: [{ name: "Red Dust", value: 2 }],
  },
}));

describe("SpaceStation", () => {
  it("renders the button to open the station popup", () => {
    render(
      <TradeProvider>
        <SpaceStation selectedPlanet={{ name: "Earth" }} />
      </TradeProvider>,
    );
    expect(
      screen.getByTestId("space-station-enter-button"),
    ).toBeInTheDocument();
  });

  it("shows the station popup when the button is clicked", async () => {
    render(
      <TradeProvider>
        <SpaceStation selectedPlanet={{ name: "Earth" }} />
      </TradeProvider>,
    );

    await userEvent.click(screen.getByTestId("space-station-enter-button"));

    expect(screen.getByText(/trade terminal/i)).toBeInTheDocument();
    expect(
      screen.getByText(/exchange resources for fuel/i),
    ).toBeInTheDocument();
  });

  it("displays the correct resources for the selected planet (Earth)", async () => {
    render(
      <TradeProvider>
        <SpaceStation selectedPlanet={{ name: "Earth" }} />
      </TradeProvider>,
    );

    await userEvent.click(screen.getByTestId("space-station-enter-button"));

    expect(screen.getAllByText("Water Ice")).toBeDefined();
  });

  it("displays the correct resources for the selected planet (Mars)", async () => {
    render(
      <TradeProvider>
        <SpaceStation selectedPlanet={{ name: "Mars" }} />
      </TradeProvider>,
    );

    await userEvent.click(screen.getByTestId("space-station-enter-button"));

    expect(screen.getAllByText("Red Dust")).toBeDefined();
  });

  it("falls back to Earth resources if the selected planet is unknown", async () => {
    render(
      <TradeProvider>
        <SpaceStation />
      </TradeProvider>,
    );

    await userEvent.click(screen.getByTestId("space-station-enter-button"));
  });

  it("can exit the space station and return to the inactive button", async () => {
    render(
      <TradeProvider>
        <SpaceStation selectedPlanet={{ name: "Mars" }} />
      </TradeProvider>,
    );

    await userEvent.click(screen.getByTestId("space-station-enter-button"));
    expect(screen.getByText("Trade Terminal")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("space-station-exit-button"));
    expect(
      screen.getByTestId("space-station-enter-button"),
    ).toBeInTheDocument();
  });
});
