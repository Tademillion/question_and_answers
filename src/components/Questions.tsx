import React, { useState } from "react";

import questions from "../components/initialvalue.json";

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false); // prevent multiple clicks

  const CurrentQuiz = questions.results[currentQuestion];

  const handleNextClick = () => {
    if (!isAnswered) return;
    console.log("Current Question", currentQuestion);
    setIsAnswered(false);
    if (currentQuestion < questions.results.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
    resizeTo();
  };
  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
    resizeTo();
  };
  function resizeTo() {
    setSelectedAnswer(null);
    setAnswerStatus("");
  }
  const HandleSelectedAnswer = (answer: string) => {
    if (isAnswered) return; // Prevent multiple clicks
    if (answer === CurrentQuiz.correct_answer) {
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }
    console.log("current index is", currentQuestion);
    setSelectedAnswer(answer);
    setIsAnswered(true); // Prevent multiple clicks
  };
  return (
    <div>
      <h2>{CurrentQuiz.question}</h2>
      <ol type="A">
        {CurrentQuiz.incorrect_answers
          .concat(CurrentQuiz.correct_answer)
          .map((answer, index) => (
            <li
              key={index}
              className={`answer-list-item ${
                selectedAnswer === answer
                  ? answerStatus === "correct"
                    ? "correct"
                    : "incorrect"
                  : ""
              }
               ${
                 answerStatus === "incorrect" &&
                 CurrentQuiz.correct_answer === answer
                   ? "correct"
                   : ""
               }`}
              onClick={() => {
                HandleSelectedAnswer(answer);
              }}
            >
              {answer}
            </li>
          ))}
      </ol>
      <button
        className="btn-action next"
        onClick={handlePreviousClick}
        disabled={currentQuestion === 0}
      >
        {" "}
        Previous
      </button>
      <button
        className="btn-action next"
        onClick={handleNextClick}
        disabled={currentQuestion === questions.results.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Questions;
