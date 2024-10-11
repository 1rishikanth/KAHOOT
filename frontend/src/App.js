// frontend/src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const createQuiz = (formData) => API.post('/quiz/create', formData);
export const getQuiz = (quizId) => API.get(`/quiz/${quizId}`);
export const createGameSession = (formData) => API.post('/quiz/session', formData);





// frontend/src/App.js
// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import CreateQuiz from './components/CreateQuiz';
import GameLobby from './components/GameLobby';
import QuizGame from './components/QuizGame';
import Leaderboard from './components/Leaderboard';
import NextPageComponent from './components/NextPageComponent'; // Home page with buttons

const App = () => {
  const [user, setUser] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth setUser={setUser} />} />
        <Route path="/home" element={<NextPageComponent />} /> {/* Home page */}
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/lobby" element={<GameLobby user={user} />} />
        <Route path="/game/:id" element={<QuizGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;
