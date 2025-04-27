import {createContext, useState} from "react";

const ContainerContext = createContext({});

export const ContainerProvider = ({ children }) => {
    const [sidebarsActive, setSidebarsActive] = useState(true);
    const [tutorialActive, setTutorialActive] = useState(false);
    const [spaceStationActive, setSpaceStationActive] = useState(false);

    return (
        <ContainerContext.Provider
            value={{
                sidebarsActive,
                setSidebarsActive,
                tutorialActive,
                setTutorialActive,
                spaceStationActive,
                setSpaceStationActive
            }}>
            {children}
        </ContainerContext.Provider>
    );
}

export default ContainerContext;
