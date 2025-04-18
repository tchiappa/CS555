import React, { useState, useEffect } from "react";
import { getQuestion, adjustDifficult } from "../utils/questions"; // make sure path is correct
import { giveQuizReward } from "../utils/rewardUtils";


function QuizModal({ selectedPlanet, onClose, onCorrect }) {
  const [difficulty, setDifficulty] = useState("easy");
  const [secondLastAns, setSecondLastAns] = useState(null);
  const [lastAns, setLastAns] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (selectedPlanet?.name) {
      const q = getQuestion(
        selectedPlanet.name,
        difficulty,
        secondLastAns,
        lastAns
      );
      if (q) {
        setQuestion(q);
      } else {
        onClose(); // No questions left
      }
    }
  }, [selectedPlanet, difficulty, secondLastAns, lastAns]);

  const handleAnswer = (option) => {
    if (!question || answered) return;

    const correct = option === question.answer;
    setIsCorrect(correct);
    setAnswered(true);

    setSecondLastAns(lastAns);
    setLastAns(correct);

    if (correct && onCorrect) {
      onCorrect();
    }
  };

  const handleNext = () => {
    setAnswered(false);
    setIsCorrect(false);

    const newDifficulty = adjustDifficult(difficulty, secondLastAns, lastAns);
    setDifficulty(newDifficulty);

    const nextQ = getQuestion(
      selectedPlanet.name,
      newDifficulty,
      secondLastAns,
      lastAns
    );

    if (nextQ) {
      setQuestion(nextQ);
    } else {
      onClose();
    }
  };

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
