// backend/routes/quizRoutes.js
const express = require('express');
const { createQuiz, fetchQuiz, createGameSession } = require('../controllers/quizController');
const router = express.Router();

router.post('/create', createQuiz);
router.get('/:id', fetchQuiz);
router.post('/session', createGameSession);

module.exports = router;
