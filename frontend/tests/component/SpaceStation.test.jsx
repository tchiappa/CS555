import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import SpaceStation from "../../src/component/SpaceStation.jsx";
import { TradeTerminal } from "../../src/component/TradeTerminal.jsx";
import { TradeResource } from "../../src/component/TradeResource.jsx";
import TradeContext, { TradeProvider } from "../../src/context/tradeContext.jsx";
import {useState} from "react";

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

  it("does not render the button after 3 station visits", () => {
    // Custom provider to control stationVisits value
    const MockProvider = ({ children }) => {
      const [stationVisits, setStationVisits] = useState(3); // limit reached

      return (
          <TradeContext.Provider value={{ stationVisits, setStationVisits }}>
            {children}
          </TradeContext.Provider>
      );
    };

    render(
        <MockProvider>
          <SpaceStation selectedPlanet={{ name: "Earth" }} />
        </MockProvider>
    );

    // The button should not be in the document
    expect(
        screen.queryByTestId("space-station-enter-button")
    ).not.toBeInTheDocument();
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
