// backend/server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors'); // Import cors
const socketIO = require('socket.io');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const app = express();
const server = http.createServer(app);

// Allow CORS for the entire server
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Configure Socket.IO to allow CORS
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('New WebSocket connection...');
  // Handle socket events here
});

// Define your API routes
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
