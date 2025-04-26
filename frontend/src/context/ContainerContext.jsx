import {createContext, useContext, useState} from "react";

const ContainerContext = createContext({});

export const ContainerProvider = ({ children }) => {
    const [sidebarsActive, setSidebarsActive] = useState(true);
    const {tutorialActive, setTutorialActive} = useContext(ContainerContext);
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
