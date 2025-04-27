import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { useContext } from 'react';
import ContainerContext, { ContainerProvider } from '../../src/context/ContainerContext';

// Helper consumer component to *read* and *interact* with context
function TestComponent() {
    const {
        sidebarsActive,
        setSidebarsActive,
        tutorialActive,
        setTutorialActive,
        spaceStationActive,
        setSpaceStationActive
    } = useContext(ContainerContext);

    return (
        <div>
            <div data-testid="sidebarsActive">{sidebarsActive.toString()}</div>
            <div data-testid="tutorialActive">{tutorialActive.toString()}</div>
            <div data-testid="spaceStationActive">{spaceStationActive.toString()}</div>

            <button onClick={() => setSidebarsActive(false)}>Disable Sidebar</button>
            <button onClick={() => setTutorialActive(true)}>Start Tutorial</button>
            <button onClick={() => setSpaceStationActive(true)}>Open Space Station</button>
        </div>
    );
}

describe('ContainerContext', () => {
    it('provides default values correctly', () => {
        render(
            <ContainerProvider>
                <TestComponent />
            </ContainerProvider>
        );

        expect(screen.getByTestId('sidebarsActive')).toHaveTextContent('true');
        expect(screen.getByTestId('tutorialActive')).toHaveTextContent('false');
        expect(screen.getByTestId('spaceStationActive')).toHaveTextContent('false');
    });

    it('updates sidebarsActive when setSidebarsActive is called', async () => {
        render(
            <ContainerProvider>
                <TestComponent />
            </ContainerProvider>
        );

        await userEvent.click(screen.getByText('Disable Sidebar'));
        expect(screen.getByTestId('sidebarsActive')).toHaveTextContent('false');
    });

    it('updates tutorialActive when setTutorialActive is called', async () => {
        render(
            <ContainerProvider>
                <TestComponent />
            </ContainerProvider>
        );

        await userEvent.click(screen.getByText('Start Tutorial'));
        expect(screen.getByTestId('tutorialActive')).toHaveTextContent('true');
    });

    it('updates spaceStationActive when setSpaceStationActive is called', async () => {
        render(
            <ContainerProvider>
                <TestComponent />
            </ContainerProvider>
        );

        await userEvent.click(screen.getByText('Open Space Station'));
        expect(screen.getByTestId('spaceStationActive')).toHaveTextContent('true');
    });
});