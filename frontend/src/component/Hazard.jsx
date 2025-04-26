import React, {useContext} from "react";
import ContainerContext from "../context/ContainerContext.jsx";

export function Hazard({ hazard, onChooseOption, onClose }) {
    if (!hazard) return null;

    const {setSidebarsActive} = useContext(ContainerContext);
    setSidebarsActive(false);

    const handleContinue = (e) => {
        onClose(e);
        setSidebarsActive(true);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
            <div className="bg-black/75 text-white text-center p-20 rounded-4xl w-lg">
                <h2 className="font-xl font-bold my-2">{hazard.name}</h2>
                <p className="mb-5">{hazard.description}</p>
                <img
                    src={hazard.img}
                    className="rounded-4xl w-full mb-5"
                />
                {!hazard.resolved ? (
                    <div>
                        {hazard.options.map((opt, idx) => (
                            <button
                                key={idx}
                                className="w-full p-2 bg-blue-600 hover:bg-blue-800 text-white mb-2 rounded-lg"
                                onClick={() => onChooseOption(opt)}>
                                {opt.text}
                            </button>
                        ))}
                    </div>
                ) : (
                    <>
                        <p className="mt-2 mb-4 font-bold">{hazard.resolved}</p>
                        <button onClick={handleContinue} className="p-2 bg-blue-600 hover:bg-blue-800 text-white mb-2 rounded-lg">Continue</button>
                    </>
                )}
            </div>
        </div>
    );
}