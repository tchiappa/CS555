const Welcome = ({handleStart}) => {
    return (
        <div className="bg-zinc-900 h-screen w-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-bold mb-6">Interstellar Voyager</h1>
            <p className="text-lg text-center max-w-2xl">
                Embark on an educational space exploration journey! Choose your starting planet, answer space
                trivia, and collect resources as you travel through the solar system.
            </p>
            <button onClick={handleStart} className="mt-8 p-2 px-6 bg-blue-600 hover:bg-blue-800 disabled:bg-zinc-600 text-lg font-semibold text-white disabled:text-zinc-400 mb-2 rounded-lg transition">Start Exploration</button>
        </div>
    );
};

export default Welcome;