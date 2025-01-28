const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5000',
  },
});
// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your frontend
app.use(express.json());

//Import routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

//Listen for order updates
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', (data) => {
    console.log('Client disconnected', data);
  });
});

//Order update emitter
const emitOrderUpdate = (order) => {
  io.emit('orderUpdated', order);
};
// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { server, emitOrderUpdate };