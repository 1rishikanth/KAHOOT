// frontend/src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const createQuiz = (formData) => API.post('/quiz/create', formData);
export const getQuiz = (quizId) => API.get(`/quiz/${quizId}`);
export const createGameSession = (formData) => API.post('/quiz/session', formData);
