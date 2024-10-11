// frontend/src/components/NextPageComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NextPageComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome to the Quiz Application</h2>
      <div className="d-flex justify-content-center">
        <div className="btn-group-vertical" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={() => navigate('/create-quiz')}
          >
            Create Quiz
          </button>
          <button
            type="button"
            className="btn btn-success mb-2"
            onClick={() => navigate('/lobby')}
          >
            Lobby
          </button>
          <button
            type="button"
            className="btn btn-warning mb-2"
            onClick={() => navigate('/game/1')} // Replace '1' with dynamic quiz/game ID
          >
            Game Board
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => navigate('/leaderboard')}
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextPageComponent;
