import React, { useState } from "react";
import questions from "../components/initialvalue.json";
interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
}
const QDisplay = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };
  return (
    <div>
      {questions.results.map((question, index) => (
        <div key={index} className="question-card">
          <h2>{question.question}</h2>
          <ol className="answers-list" type="A">
            <li
              className={`answer-list-item ${
                selectedAnswer === 0 ? "selected" : ""
              }`}
              onClick={() => handleAnswerClick(0)}
            >
              {question.correct_answer}
            </li>
            {question.incorrect_answers.map((answer, i) => (
              <li
                key={i}
                className={`answer-list-item ${
                  selectedAnswer === i ? "selected" : ""
                }`}
                onClick={() => handleAnswerClick(i)}
              >
                {answer}
              </li>
            ))}
          </ol>

          <button type="submit" className="next-btn">
            {" "}
            Next
          </button>
        </div>
      ))}
    </div>
  );
};

export default QDisplay;
