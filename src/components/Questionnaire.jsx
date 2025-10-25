import React from "react";
import { questions } from "../data/questions";
import "./Questionnaire.css";

const Questionnaire = ({
  answers,
  onAnswer,
  currentQuestion,
  onNext,
  onPrevious,
  onComplete,
}) => {
  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentAnswer = answers[question.id];

  const handleRatingClick = (rating) => {
    onAnswer(question.id, rating);

    // Automatically advance to next question or complete
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        onNext();
      } else {
        onComplete();
      }
    }, 300); // Small delay for visual feedback
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      onNext();
    } else {
      onComplete();
    }
  };

  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="questionnaire-overlay">
      <div className="questionnaire-modal">
        <button
          className="close-button"
          onClick={() => window.location.reload()}
        >
          ×
        </button>

        <div className="logo">
          <span className="logo-10">10</span>
          <span className="logo-x">X</span>
          <span className="logo-coach">COACH.AI</span>
        </div>

        <h1 className="questionnaire-title">Business Success Scorecard</h1>
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="question-content">
          <span className="category-badge">{question.category}</span>
          <h2 className="question-text">{question.question}</h2>

          <div className="rating-container">
            {[1, 2, 3, 4, 5, 6].map((rating) => (
              <button
                key={rating}
                className={`rating-button ${
                  currentAnswer === rating ? "selected" : ""
                }`}
                onClick={() => handleRatingClick(rating)}
              >
                {rating}
              </button>
            ))}
          </div>

          <div className="rating-labels">
            <span className="label-left">← Very weak</span>
            <span className="label-right">World-class →</span>
          </div>
        </div>

        <div className="navigation-container">
          {currentQuestion > 0 && (
            <button className="back-button" onClick={onPrevious}>
              ← Back
            </button>
          )}
        </div>

        <div className="question-counter">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
