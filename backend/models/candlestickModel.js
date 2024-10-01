// backend/models/candlestickModel.js

const mongoose = require('mongoose');

const candlestickSchema = new mongoose.Schema({
  symbol: String,
  interval: String,
  open: Number,
  close: Number,
  high: Number,
  low: Number,
  volume: Number,
  timestamp: Date,
});

const Candlestick = mongoose.model('Candlestick', candlestickSchema);

module.exports = Candlestick;


