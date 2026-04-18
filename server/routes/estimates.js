const express = require('express');
const router = express.Router();
const { calculateEstimate } = require('../services/pricingService');
const products = require('../data/glassProducts.json');
const vendors = require('../data/vendors.json');

// POST /api/estimates/calculate
router.post('/calculate', (req, res, next) => {
  try {
    const { productId, width, height, quantity, vendorId } = req.body;

    // Validation
    if (!productId || !width || !height || !quantity) {
      return res.status(400).json({
        error: true,
        message: 'productId, width (mm), height (mm), and quantity are required'
      });
    }

    if (width <= 0 || height <= 0 || quantity <= 0) {
      return res.status(400).json({
        error: true,
        message: 'Width, height, and quantity must be positive numbers'
      });
    }

    const product = products.find(p => p.id === Number(productId));
    if (!product) {
      return res.status(404).json({ error: true, message: 'Product not found' });
    }

    let vendor = null;
    if (vendorId) {
      vendor = vendors.find(v => v.id === Number(vendorId));
    }

    const estimate = calculateEstimate(product, Number(width), Number(height), Number(quantity), vendor);

    res.json({ estimate });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
