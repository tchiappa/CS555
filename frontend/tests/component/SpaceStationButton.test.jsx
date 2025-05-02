import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import SpaceStationButton from "../../src/component/SpaceStationButton.jsx";
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

describe("SpaceStationButton", () => {
    it('renders the button if station visits are less than 3', () => {
        render(
            <GameProviderMock mockValues={{ stationVisits: 1 }}>
                <ContainerProviderMock>
                    <SpaceStationButton />
                </ContainerProviderMock>
            </GameProviderMock>
        );

        expect(screen.getByTestId('space-station-enter-button')).toBeInTheDocument();
        expect(screen.getByText(/Visits Remaining: 2/i)).toBeInTheDocument();
    });

    it('does not render the button if station visits are 3 or more', () => {
        render(
            <GameProviderMock mockValues={{ stationVisits: 3 }}>
                <ContainerProviderMock>
                    <SpaceStationButton />
                </ContainerProviderMock>
            </GameProviderMock>
        );

        expect(screen.queryByTestId('space-station-enter-button')).not.toBeInTheDocument();
    });

    it('clicking the button increments station visits and opens space station', async () => {
        const mockSetStationVisits = vi.fn();
        const mockSetSidebarsActive = vi.fn();
        const mockSetSpaceStationActive = vi.fn();

        render(
            <GameProviderMock mockValues={{ stationVisits: 1, setStationVisits: mockSetStationVisits }}>
                <ContainerProviderMock mockValues={{
                    setSidebarsActive: mockSetSidebarsActive,
                    setSpaceStationActive: mockSetSpaceStationActive,
                }}>
                    <SpaceStationButton />
                </ContainerProviderMock>
            </GameProviderMock>
        );

        const button = screen.getByTestId('space-station-enter-button');
        await userEvent.click(button);

        expect(mockSetStationVisits).toHaveBeenCalledWith(2);
        expect(mockSetSidebarsActive).toHaveBeenCalledWith(false);
        expect(mockSetSpaceStationActive).toHaveBeenCalledWith(true);
    });
});
