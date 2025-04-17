import React, { useState, useEffect, useContext } from "react";
import TradeContext from "../context/tradeContext";

function QuizModal({ selectedPlanet, onClose }) {
  const [secondLastAns, setSecondLastAns] = useState(null);
  const [lastAns, setLastAns] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const {
    setPlayerResources,
    planetaryResources,
    setPoints,
    difficulty,
    getQuestion,
    playerResources,
  } = useContext(TradeContext);

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
    <div style={modalStyle}>
      <h2>Quiz: {selectedPlanet.name}</h2>
      {!question ? (
        <p>No questions available for this planet.</p>
      ) : (
        <>
          <p>{question.question}</p>
          <div style={{ marginBottom: "10px" }}>
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                disabled={answered}
                style={{ margin: "5px" }}
              >
                {opt}
              </button>
            ))}
          </div>

          {answered && (
            <div>
              {isCorrect ? (
                <p style={{ color: "green" }}>✅ Correct!</p>
              ) : (
                <p style={{ color: "red" }}>
                  ❌ Incorrect. The answer is: {question.answer}
                </p>
              )}
              <button onClick={handleNext} style={{ marginRight: "8px" }}>
                Next
              </button>
            </div>
          )}
        </>
      )}

      <button onClick={onClose} style={{ marginTop: "10px" }}>
        Go Back
      </button>
    </div>
  );
}

const modalStyle = {
  position: "fixed",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -30%)",
  backgroundColor: "white",
  color: "black",
  padding: "20px",
  border: "2px solid #000",
  borderRadius: "10px",
  zIndex: 1000,
  textAlign: "center",
};

export default QuizModal;
