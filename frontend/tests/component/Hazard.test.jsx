import { render, screen, fireEvent } from '@testing-library/react';
import { Hazard } from '../../src/component/Hazard'; // Adjust the import path as necessary

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

    it('renders correctly when hazard is provided', () => {
        render(<Hazard hazard={hazard} onChooseOption={mockOnChooseOption} onClose={mockOnClose} />);

        expect(screen.getByText('Asteroid Field')).toBeInTheDocument();
        expect(screen.getByText('A dense asteroid field is ahead. Choose your approach.')).toBeInTheDocument();
        expect(screen.getByText('Go around')).toBeInTheDocument();
        expect(screen.getByText('Go through')).toBeInTheDocument();
    });

    it('calls onChooseOption when an option is selected', () => {
        render(<Hazard hazard={hazard} onChooseOption={mockOnChooseOption} onClose={mockOnClose} />);

        const goAroundButton = screen.getByText('Go around');
        fireEvent.click(goAroundButton);

        expect(mockOnChooseOption).toHaveBeenCalledWith(hazard.options[0]);
    });

    it('displays outcome and continue button when hazard is resolved', () => {
        const resolvedHazard = { ...hazard, resolved: 'You lost 10 fuel' };

        render(<Hazard hazard={resolvedHazard} onChooseOption={mockOnChooseOption} onClose={mockOnClose} />);

        expect(screen.getByText('You lost 10 fuel')).toBeInTheDocument();
        expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('calls onClose when continue button is clicked', () => {
        const resolvedHazard = { ...hazard, resolved: 'You lost 10 fuel' };

        render(<Hazard hazard={resolvedHazard} onChooseOption={mockOnChooseOption} onClose={mockOnClose} />);

        const continueButton = screen.getByText('Continue');
        fireEvent.click(continueButton);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('renders nothing if no hazard is provided', () => {
        render(<Hazard hazard={null} onChooseOption={mockOnChooseOption} onClose={mockOnClose} />);

        expect(screen.queryByText('Asteroid Field')).not.toBeInTheDocument();
    });
});