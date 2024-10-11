import React, { useState, useEffect } from 'react';
import socket from '../Socket';

const GameLobby = ({ history, user }) => {
  const [gameCode, setGameCode] = useState('');
  const [players, setPlayers] = useState([]);
  const [gameId, setGameId] = useState('');

  useEffect(() => {
    socket.on('playerJoined', (username) => {
      setPlayers((prevPlayers) => [...prevPlayers, username]);
    });
    
    socket.on('startQuiz', () => {
      history.push(`/game/${gameId}`);
    });

    return () => {
      socket.off('playerJoined');
      socket.off('startQuiz');
    };
  }, [gameId, history]);

  const handleCreateGame = () => {
    const generatedGameCode = Math.random().toString(36).substring(7);
    setGameCode(generatedGameCode);
    setGameId(generatedGameCode);
    socket.emit('joinGame', { gameId: generatedGameCode, username: user });
  };

  const handleStartGame = () => {
    socket.emit('startGame', gameId);
  };

  return (
    <div>
      <h2>Game Lobby</h2>
      {gameCode ? (
        <>
          <p>Game Code: {gameCode}</p>
          <button onClick={handleStartGame}>Start Game</button>
          <h3>Players:</h3>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={handleCreateGame}>Create Game</button>
      )}
    </div>
  );
};

export default GameLobby;
