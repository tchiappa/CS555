import React, { useContext, useEffect } from "react";
import ContainerContext from "../context/ContainerContext.jsx";
import GameContext      from "../context/GameContext.jsx";

  export default function Encounter({ encounter, onChooseOption, onClose }) {
  if (!encounter) return null;

  /* contexts */
  const { setSidebarsActive }           = useContext(ContainerContext);
  const { setPlayerResources, setFuel } = useContext(GameContext);

  /* hide sidebars while overlay is open, restore on unmount */
  useEffect(() => {
    setSidebarsActive(false);
    return () => setSidebarsActive(true);
  }, [setSidebarsActive]);

  /* option handler */
  const handleOption = ({ fuel: fuelΔ, resources: resΔ }) => {
    setFuel(f => Math.max(0, f + fuelΔ));

    setPlayerResources(prev => {
      const updated = { ...prev };
      for (const [key, change] of Object.entries(resΔ)) {
        updated[key] = Math.max(0, (updated[key] || 0) + change);
      }
      return updated;
    });
  };

  /* continue button */
  function handleContinue(e) {
    onClose(e);
    // sidebarsActive re-enabled by cleanup above
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]"
      style={{ background: "url('interstellar.svg')" }}
    >
      <div className="bg-black/75 text-white text-center p-20 rounded-4xl w-lg">
        <h2 className="font-xl font-bold my-2">{encounter.name}</h2>
        <p className="mb-5">{encounter.description}</p>

        {!encounter.resolved ? (
          /* list of choices */
          encounter.options.map(opt => (
            <button
              key={opt.text /* unique key */}
              className="w-full p-2 bg-blue-600 hover:bg-blue-800 mb-2 rounded-lg"
              onClick={() => onChooseOption(opt, handleOption)}
            >
              {opt.text}
            </button>
          ))
        ) : (
          /* resolved view */
          <>
            <h1 className="my-4 italic font-bold text-blue-400">
              {encounter.selection}
            </h1>
            <p className="mt-2 mb-4 font-bold">{encounter.resolved}</p>
            <button
              onClick={handleContinue}
              className="p-2 bg-blue-600 hover:bg-blue-800 rounded-lg"
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export { Encounter };