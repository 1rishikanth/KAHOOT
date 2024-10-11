
// frontend/src/socket.js
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000'); // Point this to your backend

export default socket;