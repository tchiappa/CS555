export function Hazard({ hazard, onChooseOption }) {
    if (!hazard) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
            <div className="bg-black text-white text-center p-4 rounded-lg w-md">
                <h2 className="font-xl font-bold my-2">{hazard.name}</h2>
                <p className="mb-4">{hazard.description}</p>

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
                        <p className="mt-2 font-bold">{hazard.resolved}</p>
                        <p className="mt-2">Traveling...</p>
                    </>
                )}
            </div>
        </div>
    );
}