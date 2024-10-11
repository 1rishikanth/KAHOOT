// frontend/src/components/QuizGame.js
import React, { useState, useEffect } from 'react';
import socket from '../Socket';

const QuizGame = ({ match }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    socket.on('startQuiz', (quizQuestions) => {
      setQuestions(quizQuestions);
    });

    socket.on('updateLeaderboard', (newScores) => {
      setScores(newScores);
    });

    return () => {
      socket.off('startQuiz');
      socket.off('updateLeaderboard');
    };
  }, []);

  const handleAnswerSubmit = () => {
    const gameId = match.params.id;
    socket.emit('submitAnswer', { gameId, answer: selectedAnswer });
    setSelectedAnswer('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (!questions.length) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>Quiz Game</h2>
      <h3>{currentQuestion.questionText}</h3>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index} onClick={() => setSelectedAnswer(option)}>
            {option}
          </li>
        ))}
      </ul>
      <button onClick={handleAnswerSubmit}>Submit Answer</button>

      <h3>Leaderboard</h3>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.player}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizGame;
