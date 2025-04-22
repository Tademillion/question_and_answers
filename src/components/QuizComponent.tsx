import React, { useState } from "react";
import questions from "../components/initialvalue.json";

const QuizComponent: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false); // prevent multiple clicks
  const [answerStatus, setAnswerStatus] = useState<string>("");

  const handleAnswerClick = (answer: string) => {
    // Specify type here
    if (isAnswered) return; // Prevent multiple clicks
    setSelectedAnswer(answer);
    if (answer === questions.results[currentQuestion].correct_answer) {
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    resetState();
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
    resetState();
  };

  const resetState = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAnswerStatus("");
  };

  const currentQuiz = questions.results[currentQuestion];
  return (
    <div>
      <h1>{currentQuiz.category}</h1>
      <p>{currentQuiz.question}</p>
      <ol type="A">
        {currentQuiz.incorrect_answers
          .concat(currentQuiz.correct_answer)
          .map((answer, index) => (
            <li
              key={index}
              className={`answer-list-item ${
                selectedAnswer === answer ? answerStatus : ""
              }`}
              onClick={() => handleAnswerClick(answer)}
              style={{
                backgroundColor:
                  selectedAnswer === answer
                    ? answerStatus === "correct"
                      ? "lightgreen"
                      : "lightcoral"
                    : "",
              }}
            >
              {answer}
            </li>
          ))}
      </ol>
      <div>
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={
            currentQuestion === questions.results.length - 1 || !isAnswered
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
