const express = require('express');
const router = express.Router();
const dailyRates = require('../data/dailyRates.json');

// GET /api/rates/today - Today's rates for all glass types
router.get('/today', (req, res) => {
  try {
    const today = dailyRates.map(r => {
      const latest = r.rates[0];
      const previous = r.rates[1];
      const changePercent = previous ? ((latest.rate - previous.rate) / previous.rate * 100).toFixed(1) : 0;

      return {
        glassType: r.glassType,
        thickness: r.thickness,
        rate: latest.rate,
        change: latest.change,
        changePercent: Number(changePercent),
        factory: latest.factory,
        date: latest.date
      };
    });

    res.json({
      date: today[0]?.date || new Date().toISOString().split('T')[0],
      rates: today
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/rates/history - Rate history for a glass type
router.get('/history', (req, res) => {
  try {
    const { type, days } = req.query;

    if (!type) {
      return res.status(400).json({ error: true, message: 'Glass type is required' });
    }

    const rateData = dailyRates.find(r =>
      r.glassType.toLowerCase() === type.toLowerCase()
    );

    if (!rateData) {
      return res.status(404).json({ error: true, message: 'Rate data not found for this glass type' });
    }

    const limit = Math.min(Number(days) || 7, rateData.rates.length);

    res.json({
      glassType: rateData.glassType,
      thickness: rateData.thickness,
      rates: rateData.rates.slice(0, limit)
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
