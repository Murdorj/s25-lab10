import React, { useState, useEffect } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';

const Quiz: React.FC = () => {
  const [quizCore, setQuizCore] = useState<QuizCore | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  useEffect(() => {
    const newQuizCore = new QuizCore();
    setQuizCore(newQuizCore);
  }, []);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (quizCore) {
      // Record the user's answer
      quizCore.answerQuestion(selectedAnswer || '');

      // Update score after answering the question
      setScore(quizCore.getScore());

      // Move to the next question
      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
      } else {
        setQuizCompleted(true); // Finish the quiz if no next question
      }

      // Reset the selected answer for the next question
      setSelectedAnswer(null);
    }
  };

  if (quizCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore?.getTotalQuestions()}</p>
      </div>
    );
  }

  const currentQuestion = quizCore?.getCurrentQuestion();

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      <h2>Quiz Question {quizCore.currentQuestionIndex + 1}:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;
