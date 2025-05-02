import {createContext, useState, useCallback} from "react";

const ContainerContext = createContext({});

export const ContainerProvider = ({ children }) => {
    const [sidebarsActive, setSidebarsActive] = useState(true);
    const [tutorialActive, setTutorialActive] = useState(false);
    const [spaceStationActive, setSpaceStationActive] = useState(false);

    // Memoize the state setters to prevent unnecessary re-renders
    const toggleSidebars = useCallback((value) => {
        setSidebarsActive(value);
    }, []);

    const toggleTutorial = useCallback((value) => {
        setTutorialActive(value);
    }, []);

    const toggleSpaceStation = useCallback((value) => {
        setSpaceStationActive(value);
    }, []);

    return (
        <ContainerContext.Provider
            value={{
                sidebarsActive,
                setSidebarsActive: toggleSidebars,
                tutorialActive,
                setTutorialActive: toggleTutorial,
                spaceStationActive,
                setSpaceStationActive: toggleSpaceStation
            }}>
            {children}
        </ContainerContext.Provider>
    );
}

export default ContainerContext;
