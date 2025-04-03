import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ExampleComponent', () => {
    it('renders the button with provided text', () => {
        function ExampleComponent({ text }) {
            return (
                <button data-testid="example-button">{text}</button>
            );
        }

        render(<ExampleComponent text="Click Me" />);

        // Check if the button exists and has the correct text
        const button = screen.getByTestId('example-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Click Me');
    });

    it('triggers an event when clicked', async () => {
        const user = userEvent.setup();
        const mockFn = vi.fn();

        function ClickableComponent({onClick}) {
            return (
                <button data-testid="click-button" onClick={onClick}>Click</button>
            );
        }

        render(<ClickableComponent onClick={mockFn()}/>);

        const button = screen.getByTestId('click-button');
        await user.click(button);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});