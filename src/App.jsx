import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import LeadCaptureForm from './components/LeadCaptureForm';
import ResultsReport from './components/ResultsReport';
import './App.css';

function App() {
  // Application state
  const [stage, setStage] = useState('questionnaire'); // 'questionnaire', 'leadCapture', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userData, setUserData] = useState(null);

  // Handle answer selection
  const handleAnswer = (questionId, rating) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  // Navigate to next question
  const handleNext = () => {
    setCurrentQuestion(prev => prev + 1);
  };

  // Navigate to previous question
  const handlePrevious = () => {
    setCurrentQuestion(prev => prev - 1);
  };

  // Complete questionnaire and show lead capture form
  const handleComplete = () => {
    setStage('leadCapture');
  };

  // Submit lead form and show results
  const handleLeadSubmit = (formData) => {
    setUserData(formData);
    setStage('results');
  };

  // Go back from lead capture to questionnaire
  const handleBackToQuestions = () => {
    setStage('questionnaire');
  };

  return (
    <div className="app">
      {stage === 'questionnaire' && (
        <Questionnaire
          answers={answers}
          onAnswer={handleAnswer}
          currentQuestion={currentQuestion}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onComplete={handleComplete}
        />
      )}

      {stage === 'leadCapture' && (
        <LeadCaptureForm
          onSubmit={handleLeadSubmit}
          onBack={handleBackToQuestions}
        />
      )}

      {stage === 'results' && (
        <ResultsReport
          userData={userData}
          answers={answers}
        />
      )}
    </div>
  );
}

export default App;
