import { createContext } from 'react';

const GameContext = createContext({});

// Simple mock provider
export const GameProviderMock = ({ children, mockValues = {} }) => {
    const defaultValues = {
        stationVisits: 0,
        setStationVisits: vi.fn(),
        playerResources: {
            "Red Dust": 5,
            "Iron Ore": 2,
            "Water Ice": 1,
        },
        setPlayerResources: vi.fn(),
        fuel: 10,
        setFuel: vi.fn(),
        points: 0,
        setPoints: vi.fn(),
        difficulty: "easy",
        adjustDifficulty: () => "easy",
        getPlanetInfo: () => ({}),
        getQuestion: () => ({}),
        planetaryResources: {
            Earth: [{ name: "Water Ice", value: 1 }],
            Mars: [{ name: "Red Dust", value: 2 }]
        },
        setPlanetaryResources: vi.fn(),
        ...mockValues, // allow override
    };

    return (
        <GameContext.Provider value={defaultValues}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
