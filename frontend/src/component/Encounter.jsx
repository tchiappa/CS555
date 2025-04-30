import React, {useContext} from "react";
import ContainerContext from "../context/ContainerContext.jsx";
import GameContext from "../context/GameContext.jsx";

export function Encounter({ encounter, onChooseOption, onClose }) {
    if (!encounter) return null;

    const {setSidebarsActive} = useContext(ContainerContext);
    setSidebarsActive(false);

    const {setPlayerResources, setFuel} = useContext(GameContext);
    const handleOption = ({fuel: fuelChange, resources: resChange}) => {
        // Update fuel
        setFuel((f) => Math.max(0, f + fuelChange));

        // Update resources with clamping to zero
        setPlayerResources((prevResources) => {
            const updatedResources = {...prevResources};

            for (const [key, change] of Object.entries(resChange)) {
                const current = updatedResources[key] || 0;
                const newValue = current + change;

                // Prevent values from dropping below 0
                updatedResources[key] = Math.max(0, newValue);
            }

            return updatedResources;
        });
    };

    const handleContinue = (e) => {
        onClose(e);
        setSidebarsActive(true);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" style={{ background: "url('interstellar.svg')" }}>
            <div className="bg-black/75 text-white text-center p-20 rounded-4xl w-lg">
                <h2 className="font-xl font-bold my-2">{encounter.name}</h2>
                <p className="mb-5">{encounter.description}</p>
                {/*<img*/}
                {/*    src={encounter.img}*/}
                {/*    className="rounded-4xl w-full mb-5"*/}
                {/*/>*/}
                {!encounter.resolved ? (
                    <div>
                        {encounter.options.map((opt, idx) => (
                            <button
                                key={idx}
                                className="w-full p-2 bg-blue-600 hover:bg-blue-800 text-white mb-2 rounded-lg"
                                onClick={() => onChooseOption(opt, handleOption)}>
                                {opt.text}
                            </button>
                        ))}
                    </div>
                ) : (
                    <>
                        <h1 className="my-4 italic font-bold text-blue-400">{encounter.selection}</h1>
                        <p className="mt-2 mb-4 font-bold">{encounter.resolved}</p>
                        <button onClick={handleContinue}
                                className="p-2 bg-blue-600 hover:bg-blue-800 text-white mb-2 rounded-lg">Continue
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
