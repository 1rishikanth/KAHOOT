// backend/socket.js
const GameSession = require('./models/GameSession');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New socket connection...');

    socket.on('joinGame', async ({ gameId, username }) => {
      const gameSession = await GameSession.findById(gameId);
      gameSession.players.push(username);
      await gameSession.save();
      io.to(gameId).emit('playerJoined', username);
    });

    socket.on('startGame', async (gameId) => {
      const gameSession = await GameSession.findById(gameId).populate('quizId');
      io.to(gameId).emit('startQuiz', gameSession.quizId.questions);
    });

    socket.on('submitAnswer', async ({ gameId, username, score }) => {
      const gameSession = await GameSession.findById(gameId);
      const playerIndex = gameSession.scores.findIndex(
        (p) => p.player === username
      );
      if (playerIndex > -1) {
        gameSession.scores[playerIndex].score += score;
      } else {
        gameSession.scores.push({ player: username, score });
      }
      await gameSession.save();
      io.to(gameId).emit('updateLeaderboard', gameSession.scores);
    });
  });
};
