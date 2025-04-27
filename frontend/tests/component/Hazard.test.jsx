import { render, screen } from '@testing-library/react';
import { Hazard } from '../../src/component/Hazard'; // Adjust the import path as necessary
import {GameProviderMock} from "../mocks/GameContextMock.jsx";
import {ContainerProviderMock} from "../mocks/ContainerContextMock.jsx";
import userEvent from "@testing-library/user-event";

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

describe('Hazard', () => {
    const mockOnChooseOption = vi.fn();
    const mockOnClose = vi.fn();

    const hazard = {
        name: 'Asteroid Field',
        description: 'A dense asteroid field is ahead. Choose your approach.',
        options: [
            { text: 'Go around', effect: 'Lose 10 fuel' },
            { text: 'Go through', effect: 'Lose 30 fuel' },
        ],
        resolved: null,
    };

    function renderHazard(customHazard = hazard) {
        render(
            <GameProviderMock>
                <ContainerProviderMock>
                    <Hazard hazard={customHazard} onChooseOption={mockOnChooseOption} onClose={mockOnClose} />
                </ContainerProviderMock>
            </GameProviderMock>
        );
    }

    it('renders correctly when hazard is provided', () => {
        renderHazard();

        expect(screen.getByText('Asteroid Field')).toBeInTheDocument();
        expect(screen.getByText('A dense asteroid field is ahead. Choose your approach.')).toBeInTheDocument();
        expect(screen.getByText('Go around')).toBeInTheDocument();
        expect(screen.getByText('Go through')).toBeInTheDocument();
    });

    it('calls onChooseOption when an option is selected', async () => {
        renderHazard();

        const goAroundButton = screen.getByText('Go around');
        await userEvent.click(goAroundButton);

        expect(mockOnChooseOption).toHaveBeenCalledWith(hazard.options[0]);
    });

    it('displays outcome when hazard is resolved', () => {
        const resolvedHazard = { ...hazard, resolved: 'You lost 10 fuel' };
        renderHazard(resolvedHazard);

        expect(screen.getByText('You lost 10 fuel')).toBeInTheDocument();
    });

    it('renders nothing if no hazard is provided', () => {
        renderHazard(null);

        expect(screen.queryByText('Asteroid Field')).not.toBeInTheDocument();
    });
});