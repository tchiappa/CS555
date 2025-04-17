import React, { useState, useEffect, useContext } from "react";
import TradeContext from "../context/tradeContext";

function QuizModal({ selectedPlanet, onClose }) {
  const [secondLastAns, setSecondLastAns] = useState(null);
  const [lastAns, setLastAns] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { setResource, difficulty, getQuestion } = useContext(TradeContext);

  const [question, setQuestion] = useState(null);

  const handleAnswer = (option) => {
    if (!question || answered) return;

    const correct = option === question.answer;
    setIsCorrect(correct);
    setAnswered(true);

    setSecondLastAns(lastAns);
    setLastAns(correct);

    // smelly code which defaults to 1 and gives wrong output every time
    const multiple = 1
      ? difficulty === "easy"
      : 2
        ? difficulty === "medium"
        : 3;

    if (correct) {
      setResource((prev) => ({
        ...prev,
        fuel: prev.fuel + multiple * 50,
        oxygen: prev.oxygen + multiple * 20,
      }));
    } else {
      setResource((prev) => ({
        ...prev,
        oxygen: prev.oxygen - 20 >= 0 ? prev.oxygen - 20 : 0,
      }));
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
