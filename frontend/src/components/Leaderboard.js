import React, { useState, useEffect } from 'react';
import socket from '../Socket';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    socket.on('updateLeaderboard', (newScores) => {
      setScores(newScores);
    });

    return () => {
      socket.off('updateLeaderboard');
    };
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
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

export default Leaderboard;
