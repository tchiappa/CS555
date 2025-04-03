// src/components/QuizModal.jsx
import React, { useState, useEffect } from "react";
import quizData from "../planetInfo/data.js"; // ✅ Correct path


function QuizModal({ selectedPlanet, onClose, onCorrect }) {
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const planetEntry = quizData.planets.find(
      (p) => p.name.toLowerCase() === selectedPlanet.name.toLowerCase()
    );

    if (planetEntry && planetEntry.questions?.easy?.length > 0) {
      const randomIndex = Math.floor(Math.random() * planetEntry.questions.easy.length);
      setQuestion(planetEntry.questions.easy[randomIndex]);
    }
  }, [selectedPlanet]);

  const handleAnswer = (option) => {
    if (!question || answered) return;

    const correct = option === question.answer;
    setIsCorrect(correct);
    setAnswered(true);

    if (correct && onCorrect) {
      onCorrect(); // e.g., reward points
    }
  };

  return (
    <div style={modalStyle}>
      <h2>Quiz: {selectedPlanet.name}</h2>
      {question ? (
        <>
          <p>{question.question}</p>
          <div>
            {question.options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(opt)}
                disabled={answered}
                style={{ margin: "5px" }}
              >
                {opt}
              </button>
            ))}
          </div>
          {answered && (
            <div style={{ marginTop: "10px" }}>
              {isCorrect ? (
                <p style={{ color: "green" }}>✅ Correct!</p>
              ) : (
                <p style={{ color: "red" }}>❌ Incorrect. The answer is: {question.answer}</p>
              )}
              <button onClick={onClose}>Close</button>
            </div>
          )}
        </>
      ) : (
        <p>No questions available for this planet.</p>
      )}
    </div>
  );
}

const modalStyle = {
  position: "fixed",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -30%)",
  backgroundColor: "white",
  padding: "20px",
  border: "2px solid #000",
  borderRadius: "10px",
  zIndex: 1000,
  textAlign: "center",
};

export default QuizModal;
