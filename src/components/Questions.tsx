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

  const distinctDifficulty = [
    ...new Set(questions.results.map((question) => question.difficulty)),
  ];
  const distinctCategory = [
    ...new Set(questions.results.map((question) => question.category)),
  ];
  return (
    <div>
      <div className="quiz-header">
        <h2>Take Full Quiz</h2>
        <p className="second-header">
          select question based on following criteria
        </p>
        <button type="button" className="refresh">
          {" "}
          refresh
        </button>
        <div className="filter_bysection">
          <select className="quiz-select">
            {distinctCategory.map((question, index) => (
              <>
                <option value=""> Category</option>
                <option key={index} value={index} className="quiz-option">
                  {question}
                </option>
              </>
            ))}
          </select>

          <select id="difficulty" className="quiz-select">
            <option value="">Difficulty</option>
            {distinctDifficulty.map((question, index) => (
              <>
                <option key={index} value={index} className="quiz-option">
                  {question}
                </option>
              </>
            ))}
          </select>

          <select id="difficulty" className="quiz-select">
            <option value="">Type</option>
            <option value="easy">Multiple</option>
            <option value="medium">True/False</option>
          </select>
        </div>
      </div>
      <h2>{CurrentQuiz.question}</h2>
      <ol type="A">
        {[...CurrentQuiz.incorrect_answers, CurrentQuiz.correct_answer]
          .sort(() => Math.random() - 0.5) // randomize the order of answers
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
