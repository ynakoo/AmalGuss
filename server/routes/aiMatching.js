const express = require('express');
const router = express.Router();
const { matchGlass } = require('../services/groqService');
const { matchFallback } = require('../services/matchingFallback');
const products = require('../data/glassProducts.json');
const alliedProducts = require('../data/alliedProducts.json');

// POST /api/ai/match - Smart glass matching
router.post('/match', async (req, res, next) => {
  try {
    const { query, role } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: true, message: 'Query is required' });
    }

    let recommendation;

    try {
      // Try Groq AI first
      recommendation = await matchGlass(query, role || 'homeowner');
    } catch (aiError) {
      console.warn('Groq AI failed, using fallback:', aiError.message);
      // Fall back to rule-based matching
      recommendation = matchFallback(query, role || 'homeowner');
    }

    // Cross-reference with actual products
    const matchedProducts = products.filter(p => {
      const typeMatch = p.glassType.toLowerCase().includes(recommendation.glassType?.toLowerCase() || '');
      const processMatch = p.process.toLowerCase().includes(recommendation.process?.toLowerCase() || '');
      return typeMatch || processMatch;
    }).slice(0, 3);

    // Get allied product suggestions
    const alliedSuggestions = alliedProducts.filter(ap => {
      return matchedProducts.some(mp =>
        ap.relatedGlassTypes.some(rgt => mp.glassType.includes(rgt)) ||
        ap.relatedApplications.some(ra => mp.applications.some(a => a.includes(ra)))
      );
    }).slice(0, 4);

    res.json({
      recommendation,
      matchedProducts,
      alliedSuggestions
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
