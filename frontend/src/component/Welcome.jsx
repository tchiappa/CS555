const Welcome = ({handleStart}) => {
    return (
        <div className="bg-zinc-900 h-screen w-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-bold mb-6">Interstellar Voyager</h1>
            <p className="text-lg text-center max-w-2xl">
                Embark on an educational space exploration journey! Choose your starting planet, answer space
                trivia, and collect resources as you travel through the solar system.
            </p>
            <button onClick={handleStart} className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white text-lg font-semibold rounded-2xl shadow-lg transition duration-300">Start Exploration</button>
        </div>
    );
};

export default Welcome;