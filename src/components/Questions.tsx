import React, { useState } from "react";

import questions from "../components/initialvalue.json";

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const CurrentQuiz = questions.results[currentQuestion];

  const handleNextClick = () => {
    if (currentQuestion < questions.results.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  return (
    <div>
      <h2>{CurrentQuiz.question}</h2>
      <ol type="A">
        {CurrentQuiz.incorrect_answers
          .concat(CurrentQuiz.correct_answer)
          .map((answer, index) => (
            <li key={index} className="answer-list-item">
              {answer}
            </li>
          ))}
      </ol>
      <button className="btn-action next" onClick={handlePreviousClick}>
        {" "}
        Previous
      </button>
      <button className="btn-action next" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default Questions;
