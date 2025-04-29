import React, {useState, useEffect, useContext} from "react";
import GameContext from "../context/GameContext.jsx";

function QuizModal({selectedPlanet, onClose}) {
    const [secondLastAns, setSecondLastAns] = useState(null);
    const [lastAns, setLastAns] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [rewards, setRewards] = useState({});
    const {
        setPlayerResources,
        planetaryResources,
        setPoints,
        difficulty,
        getQuestion,
        playerResources,
    } = useContext(GameContext);

    const [question, setQuestion] = useState(null);

    const handleAnswer = (option) => {
        if (!question || answered) return;

        const correct = option === question.answer;
        setIsCorrect(correct);
        setAnswered(true);

        setSecondLastAns(lastAns);
        setLastAns(correct);

        // readable code which has the correct logic
        const difficultyMap = {
            easy: 1,
            medium: 2,
            hard: 3,
        };
        const multiple = difficultyMap[difficulty] || 1;

        if (correct) {
            setPoints((prev) => prev + multiple * 5);
            if (difficulty === "hard") {
                const index = Math.floor(Math.random() * 5);
                const name =
                    planetaryResources[selectedPlanet.name][index].name.toString();
                const value = planetaryResources[selectedPlanet.name][index].value;
                const prevValue = playerResources[name];

                setPlayerResources((prev) => {
                    prev[name] = (prevValue || 0) + value;
                    return prev;
                });

                // Track session-specific rewards
                setRewards((prev) => ({
                    ...prev,
                    [name]: (prev[name] || 0) + value,
                }));
            }
        } else {
            setPoints((prev) => prev - 5);
        }
    };

    const handleNext = () => {
        setAnswered(false);
        setIsCorrect(false);

        setQuestion(
            getQuestion({
                planet: selectedPlanet.name,
                secondLastAns,
                lastAns,
            }),
        );
    };

    useEffect(() => {
        setQuestion(
            getQuestion({
                planet: selectedPlanet.name,
                secondLastAns: false,
                lastAns: false,
            }),
        );
    }, []);

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-br from-gray-800/95 to-gray-900/95 text-white p-10 rounded-lg z-[1000] text-center max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Quiz: {selectedPlanet.name}</h2>
              <button onClick={onClose} className="p-1 px-6 bg-red-600 hover:bg-red-800 text-white rounded-lg transition">
                Quit
              </button>
            </div>

            {!question ? (
                <div className="w-96">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Quiz Complete!</h3>
                    <p className="mb-2 font-bold">You earned:</p>
                    <ul className="mb-4">
                        {Object.entries(rewards).length === 0 ? (
                            <li>No additional resources earned.</li>
                        ) : (
                            Object.entries(rewards).map(([name, value]) => (
                                <li key={name}>
                                    +{value} {name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            ) : (
                <>
                    <p className="mb-4 text-xl font-bold">{question.question}</p>
                    <div className="mb-4">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                disabled={answered}
                                className="m-2 p-2 px-6 bg-blue-600 hover:bg-blue-800 disabled:bg-zinc-600 text-white disabled:text-zinc-400 mb-2 rounded-lg transition">
                                {option}
                            </button>
                        ))}
                    </div>

                    {answered && (
                        <div className="mb-4">
                            {isCorrect ? (
                                <p className="text-green-600 mb-4">✅ Correct!</p>
                            ) : (
                                <p className="text-red-600 mb-4">
                                    ❌ Incorrect. The answer is: {question.answer}
                                </p>
                            )}
                            <button onClick={handleNext} className="p-2 px-6 bg-blue-600 hover:bg-blue-800 text-white rounded-lg transition">
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default QuizModal;
