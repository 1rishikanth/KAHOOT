// backend/models/GameSession.js
const mongoose = require('mongoose');

const GameSessionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  players: [String], // List of players
  scores: [{ player: String, score: Number }],
});

module.exports = mongoose.model('GameSession', GameSessionSchema);
