import React, { useState } from "react";

import questions from "../components/initialvalue.json";

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false); // prevent multiple clicks

  const CurrentQuiz = questions.results[currentQuestion];

  const handleNextClick = () => {
    if (!isAnswered) {
      return alert("Please select an answer before proceeding.");
    }
    if (currentQuestion < questions.results.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const HandleSelectedAnswer = (answer: string) => {
    if (isAnswered) return; // Prevent multiple clicks
    if (answer === CurrentQuiz.correct_answer) {
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }
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
                console.log("selected answer is", answer);
              }}
            >
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
