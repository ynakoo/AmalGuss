const express = require('express');
const router = express.Router();
const vendors = require('../data/vendors.json');
const products = require('../data/glassProducts.json');

// GET /api/vendors - List all vendors
router.get('/', (req, res) => {
  try {
    const vendorList = vendors.map(v => ({
      id: v.id,
      name: v.name,
      location: v.location,
      rating: v.rating,
      reviewCount: v.reviewCount,
      specialty: v.specialty,
      verified: v.verified,
      badge: v.badge,
      certifications: v.certifications,
      established: v.established
    }));

    res.json({ vendors: vendorList });
  } catch (error) {
    next(error);
  }
});

// GET /api/vendors/compare?productId=2 - Compare vendors for a product
router.get('/compare', (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({ error: true, message: 'productId is required' });
    }

    const product = products.find(p => p.id === Number(productId));
    if (!product) {
      return res.status(404).json({ error: true, message: 'Product not found' });
    }

    const comparison = vendors.map(v => {
      const pricing = v.productPricing[String(productId)];
      return {
        id: v.id,
        name: v.name,
        location: v.location,
        rating: v.rating,
        reviewCount: v.reviewCount,
        verified: v.verified,
        badge: v.badge,
        price: pricing?.price || null,
        delivery: pricing?.delivery || null,
        inStock: pricing?.inStock || false,
        moq: pricing?.moq || null
      };
    }).filter(v => v.price !== null);

    res.json({
      product: product.name,
      productId: product.id,
      vendors: comparison
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
