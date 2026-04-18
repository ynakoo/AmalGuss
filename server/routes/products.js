const express = require('express');
const router = express.Router();
const products = require('../data/glassProducts.json');
const alliedProducts = require('../data/alliedProducts.json');
const vendors = require('../data/vendors.json');
const dailyRates = require('../data/dailyRates.json');

// GET /api/products - List all products with filtering
router.get('/', (req, res) => {
  try {
    const { type, thickness, process: processType, application, minPrice, maxPrice, search, sort } = req.query;
    let filtered = [...products];

    // Filter by glass type
    if (type) {
      const types = type.split(',').map(t => t.trim().toLowerCase());
      filtered = filtered.filter(p => types.some(t => p.glassType.toLowerCase().includes(t)));
    }

    // Filter by thickness
    if (thickness) {
      const thicknesses = thickness.split(',').map(t => t.trim().toLowerCase());
      filtered = filtered.filter(p => thicknesses.some(t => p.thickness.toLowerCase().includes(t)));
    }

    // Filter by process
    if (processType) {
      filtered = filtered.filter(p => p.process.toLowerCase().includes(processType.toLowerCase()));
    }

    // Filter by application
    if (application) {
      const apps = application.split(',').map(a => a.trim().toLowerCase());
      filtered = filtered.filter(p =>
        p.applications.some(a => apps.some(app => a.toLowerCase().includes(app)))
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(p => p.maxRate >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.minRate <= Number(maxPrice));
    }

    // Search (name, description, tags)
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.glassType.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        p.applications.some(a => a.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sort === 'price_asc') {
      filtered.sort((a, b) => a.minRate - b.minRate);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.maxRate - a.maxRate);
    } else if (sort === 'popular') {
      filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    // Get available filter values
    const filters = {
      types: [...new Set(products.map(p => p.glassType))],
      thicknesses: [...new Set(products.map(p => p.thickness))],
      processes: [...new Set(products.map(p => p.process))],
      applications: [...new Set(products.flatMap(p => p.applications))],
      priceRange: {
        min: Math.min(...products.map(p => p.minRate)),
        max: Math.max(...products.map(p => p.maxRate))
      }
    };

    res.json({ products: filtered, total: filtered.length, filters });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id - Single product with vendors and allied
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === Number(req.params.id));
    if (!product) {
      return res.status(404).json({ error: true, message: 'Product not found' });
    }

    // Get vendor pricing for this product
    const vendorPricing = vendors.map(v => {
      const pricing = v.productPricing[String(product.id)];
      return {
        id: v.id,
        name: v.name,
        location: v.location,
        rating: v.rating,
        reviewCount: v.reviewCount,
        verified: v.verified,
        badge: v.badge,
        certifications: v.certifications,
        price: pricing?.price || null,
        delivery: pricing?.delivery || null,
        inStock: pricing?.inStock || false,
        moq: pricing?.moq || null
      };
    }).filter(v => v.price !== null);

    // Get related allied products
    const related = alliedProducts.filter(ap =>
      ap.relatedGlassTypes.some(rgt => product.glassType.includes(rgt)) ||
      ap.relatedApplications.some(ra => product.applications.some(a => a.includes(ra)))
    );

    // Get today's rate
    const rateData = dailyRates.find(r => r.glassType === product.glassType);
    const todayRate = rateData?.rates[0] || null;

    res.json({
      product,
      vendors: vendorPricing,
      alliedProducts: related,
      todayRate
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
