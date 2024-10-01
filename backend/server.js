// backend/server.js
const dotenv = require('dotenv');
const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const { saveCandlestickData } = require('./controllers/dataController');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Set up the WebSocket Server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws, req) => {
  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    // Save candlestick data in the database
    await saveCandlestickData(data);
    ws.send('Data saved successfully');
  });
});

// Create a basic HTTP server
const server = require('http').createServer(app);

// Upgrade HTTP requests to WebSocket
server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

// API route for testing server
app.get('/api/ping', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


  
