import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import SpaceStation from '../../src/component/SpaceStation.jsx';
import {TradeTerminal} from "../../src/component/TradeTerminal.jsx";
import {TradeResource} from "../../src/component/TradeResource.jsx";

vi.mock('../../src/planetInfo/PlanetaryResources', () => ({
    planetaryResources: {
        Earth: [
            { name: 'Water Ice', value: 1 }
        ],
        Mars: [
            { name: 'Red Dust', value: 2 }
        ]
    }
}));

describe('SpaceStation', () => {
    it('renders the button to open the station popup', () => {
        render(<SpaceStation selectedPlanet={{name: "Earth"}} playerResources={{
            "Iron Ore": 2,
            "Water Ice": 1
        }} />);

        expect(screen.getByTestId('space-station-enter-button')).toBeInTheDocument();
    });

    it('shows the station popup when the button is clicked', async () => {
        render(<SpaceStation selectedPlanet={{name: "Earth"}} playerResources={{
            "Iron Ore": 2,
            "Water Ice": 1
        }} />);

        await userEvent.click(screen.getByTestId('space-station-enter-button'));

        expect(screen.getByText(/trade terminal/i)).toBeInTheDocument();
        expect(screen.getByText(/exchange resources for fuel/i)).toBeInTheDocument();
    });

    it('displays the correct resources for the selected planet (Earth)', async () => {
        render(<SpaceStation selectedPlanet={{name: "Earth"}} playerResources={{
            "Iron Ore": 2,
            "Water Ice": 1
        }} />);

        await userEvent.click(screen.getByTestId('space-station-enter-button'));

        expect(screen.getByTestId('trade-resource-name')).toBeInTheDocument();
    });

    it('displays the correct resources for the selected planet (Mars)', async () => {
        render(<SpaceStation selectedPlanet={{name: "Mars"}} playerResources={{
            "Iron Ore": 2,
            "Water Ice": 1
        }} />);

        await userEvent.click(screen.getByTestId('space-station-enter-button'));

        expect(screen.getByTestId('trade-resource-name')).toBeInTheDocument();
    });

    it('falls back to Earth resources if the selected planet is unknown', async () => {
        render(<SpaceStation playerResources={{
            "Iron Ore": 2,
            "Water Ice": 1
        }} />);

        await userEvent.click(screen.getByTestId('space-station-enter-button'));
    });

    it('can exit the space station and return to the inactive button', async () => {
        render(<SpaceStation selectedPlanet={{name: "Mars"}} playerResources={{
            "Iron Ore": 2,
            "Water Ice": 1
        }} />);

        await userEvent.click(screen.getByTestId('space-station-enter-button'));
        expect(screen.getByText('Trade Terminal')).toBeInTheDocument();

        await userEvent.click(screen.getByTestId('space-station-exit-button'));
        expect(screen.getByTestId('space-station-enter-button')).toBeInTheDocument();
    });
});

describe('TradeTerminal', () => {
    it('renders the resources passed to it', () => {
        render(<TradeTerminal resources={[
            { name: 'Water Ice', value: 1 }
        ]} />);

       expect(screen.getByText('Water Ice')).toBeInTheDocument();
    });
});

describe('TradeResource', () => {
    it('renders the resource passed to it', () => {

        render(<TradeResource resource={{ name: 'Water Ice', value: 1 }} />);

        expect(screen.getByText('Water Ice')).toBeInTheDocument();
    });

    it('calls setFuel with updated value when trade button is clicked', async () => {
        const mockSetFuel = vi.fn();
        const mockSetPlayerResources = vi.fn();
        const resource = { name: 'Water Ice', value: 2, available: 1 };
        const fuel = 10;

        render(<TradeResource resource={resource} fuel={fuel} setFuel={mockSetFuel} playerResources={{
            "Iron Ore": 2,
            "Water Ice": 1
        }} setPlayerResources={mockSetPlayerResources} />);

        const tradeButton = screen.getByTestId('trade-terminal-trade-button');
        await userEvent.click(tradeButton);

        expect(mockSetFuel).toHaveBeenCalledWith(12);
    });

    it('calls setPlayerResources with updated value when trade button is clicked', async () => {
        const mockSetFuel = vi.fn();
        const mockSetPlayerResources = vi.fn();
        const resource = {name: 'Water Ice', value: 2, available: 1};
        const fuel = 10;

        render(<TradeResource resource={resource} fuel={fuel} setFuel={mockSetFuel} playerResources={{
            "Iron Ore": 2,
            "Water Ice": 1
        }} setPlayerResources={mockSetPlayerResources}/>);

        const tradeButton = screen.getByTestId('trade-terminal-trade-button');
        await userEvent.click(tradeButton);

        expect(mockSetPlayerResources).toHaveBeenCalledWith({
            "Iron Ore": 2
        });
    });
});
