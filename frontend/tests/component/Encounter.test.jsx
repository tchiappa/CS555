import { render, screen } from '@testing-library/react';
import { Encounter } from '../../src/component/Encounter.jsx'; // Adjust the import path as necessary
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

describe('Encounter', () => {
    const mockOnChooseOption = vi.fn();
    const mockOnClose = vi.fn();

    const encounter = {
        name: 'Asteroid Field',
        description: 'A dense asteroid field is ahead. Choose your approach.',
        options: [
            { text: 'Go around', effect: 'Lose 10 fuel' },
            { text: 'Go through', effect: 'Lose 30 fuel' },
        ],
        resolved: null,
    };

    function renderEncounter(customEncounter = encounter) {
        render(
            <GameProviderMock>
                <ContainerProviderMock>
                    <Encounter encounter={customEncounter} onChooseOption={mockOnChooseOption} onClose={mockOnClose} />
                </ContainerProviderMock>
            </GameProviderMock>
        );
    }

    it('renders correctly when encounter is provided', () => {
        renderEncounter();

        expect(screen.getByText('Asteroid Field')).toBeInTheDocument();
        expect(screen.getByText('A dense asteroid field is ahead. Choose your approach.')).toBeInTheDocument();
        expect(screen.getByText('Go around')).toBeInTheDocument();
        expect(screen.getByText('Go through')).toBeInTheDocument();
    });

    it('calls onChooseOption when an option is selected', async () => {
        renderEncounter();

        const goAroundButton = screen.getByText('Go around');
        await userEvent.click(goAroundButton);

        expect(mockOnChooseOption).toHaveBeenCalled();
    });

    it('displays outcome when encounter is resolved', () => {
        const resolvedEncounter = { ...encounter, resolved: 'You lost 10 fuel' };
        renderEncounter(resolvedEncounter);

        expect(screen.getByText('You lost 10 fuel')).toBeInTheDocument();
    });

    it('renders nothing if no encounter is provided', () => {
        renderEncounter(null);

        expect(screen.queryByText('Asteroid Field')).not.toBeInTheDocument();
    });
});