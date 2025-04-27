import { createContext } from 'react';

const ContainerContext = createContext({});

export const ContainerProviderMock = ({ children, mockValues = {} }) => {
    const defaultValues = {
        sidebarsActive: false,
        setSidebarsActive: vi.fn(),
        tutorialActive: false,
        setTutorialActive: vi.fn(),
        spaceStationActive: false,
        setSpaceStationActive: vi.fn(),
        ...mockValues, // allow overrides
    };

    return (
        <ContainerContext.Provider value={defaultValues}>
            {children}
        </ContainerContext.Provider>
    );
};

export default ContainerContext;
