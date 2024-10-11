// backend/controllers/quizController.js
const Quiz = require('../models/Quiz');
const GameSession = require('../models/GameSession');

exports.createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  const newQuiz = new Quiz({ title, questions });
  await newQuiz.save();
  res.status(201).json(newQuiz);
};

exports.fetchQuiz = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.status(200).json(quiz);
};

exports.createGameSession = async (req, res) => {
  const { quizId, players } = req.body;
  const newGameSession = new GameSession({ quizId, players, scores: [] });
  await newGameSession.save();
  res.status(201).json(newGameSession);
};
