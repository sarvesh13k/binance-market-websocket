// backend/controllers/dataController.js

const Candlestick = require('../models/candlestickModel');

const saveCandlestickData = async (data) => {
  try {
    const candlestick = new Candlestick({
      symbol: data.symbol,
      interval: data.interval,
      open: data.k.o,
      close: data.k.c,
      high: data.k.h,
      low: data.k.l,
      volume: data.k.v,
      timestamp: new Date(data.k.t),
    });
    await candlestick.save();
  } catch (error) {
    console.error('Error saving candlestick data:', error);
  }
};

module.exports = { saveCandlestickData };
