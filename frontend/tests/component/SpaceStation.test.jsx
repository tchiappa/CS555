import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SpaceStation from "../../src/component/SpaceStation.jsx";
import {GameProviderMock} from "../mocks/GameContextMock.jsx";
import {ContainerProviderMock} from "../mocks/ContainerContextMock.jsx";

// Mock the ContainerContext import
vi.mock('../../src/context/GameContext', async () => {
  const actual = await vi.importActual('../mocks/GameContextMock.jsx');
  return {
    ...actual,
    default: actual.default,
  };
});

// Mock the ContainerContext import
vi.mock('../../src/context/ContainerContext', async () => {
  const actual = await vi.importActual('../mocks/ContainerContextMock.jsx');
  return {
    ...actual,
    default: actual.default,
  };
});

describe('SpaceStation', () => {
  it('SpaceStation shows correct station visits', () => {
    render(
        <GameProviderMock mockValues={{stationVisits: 2}}>
          <ContainerProviderMock mockValues={{spaceStationActive: true}}>
            <SpaceStation selectedPlanet="Mars"/>
          </ContainerProviderMock>
        </GameProviderMock>
    );

    expect(screen.getByText('Station Visits Remaining: 1')).toBeInTheDocument();
  });

  it('renders nothing if space station is inactive', () => {
    render(
        <GameProviderMock mockValues={{stationVisits: 0}}>
          <ContainerProviderMock mockValues={{spaceStationActive: false}}>
            <SpaceStation selectedPlanet="Mars"/>
          </ContainerProviderMock>
        </GameProviderMock>
    );

    expect(screen.queryByText(/Space Station/i)).not.toBeInTheDocument();
  });

  it('renders nothing if station visits are 3', () => {
    render(
        <GameProviderMock mockValues={{stationVisits: 3}}>
          <ContainerProviderMock mockValues={{spaceStationActive: true}}>
            <SpaceStation selectedPlanet="Mars"/>
          </ContainerProviderMock>
        </GameProviderMock>
    );

    expect(screen.queryByText(/Space Station/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('space-station-exit-button')).not.toBeInTheDocument();
  });

});
