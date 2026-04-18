const alliedProducts = require('../data/alliedProducts.json');

/**
 * Convert mm² to sq.ft
 * 1 sq.ft = 92,903.04 mm²
 */
function calculateArea(widthMm, heightMm) {
  const sqMm = widthMm * heightMm;
  const sqFt = sqMm / 92903.04;
  return Math.round(sqFt * 100) / 100;
}

/**
 * Get allied product suggestions based on glass type and application
 */
function getAlliedSuggestions(product) {
  return alliedProducts.filter(ap =>
    ap.relatedGlassTypes.some(rgt => product.glassType.includes(rgt)) ||
    ap.relatedApplications.some(ra => product.applications.some(a => a.includes(ra)))
  ).slice(0, 5).map(ap => ({
    id: ap.id,
    name: ap.name,
    category: ap.category,
    price: ap.price,
    unit: ap.unit,
    brand: ap.brand,
    recommended: true
  }));
}

/**
 * Calculate full estimate
 */
function calculateEstimate(product, width, height, quantity, vendor = null) {
  const areaPerPanel = calculateArea(width, height);
  const totalArea = Math.round(areaPerPanel * quantity * 100) / 100;

  // Use vendor-specific price or average of min/max
  let rate;
  let vendorInfo = null;

  if (vendor) {
    const vendorPricing = vendor.productPricing[String(product.id)];
    rate = vendorPricing?.price || (product.minRate + product.maxRate) / 2;
    vendorInfo = {
      name: vendor.name,
      location: vendor.location,
      rating: vendor.rating,
      delivery: vendorPricing?.delivery || '5-7 days',
      inStock: vendorPricing?.inStock || false
    };
  } else {
    rate = Math.round((product.minRate + product.maxRate) / 2);
  }

  const glassCost = Math.round(totalArea * rate);
  const alliedSuggestions = getAlliedSuggestions(product);
  const alliedTotal = alliedSuggestions.reduce((sum, ap) => sum + ap.price, 0);

  // Generate valid-until date (next day)
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 1);

  return {
    product: {
      id: product.id,
      name: product.name,
      glassType: product.glassType,
      thickness: product.thickness,
      process: product.process
    },
    dimensions: {
      width,
      height,
      unit: 'mm'
    },
    areaPerPanel,
    totalPanels: quantity,
    totalArea,
    areaUnit: 'sq.ft',
    ratePerSqFt: rate,
    glassCost,
    vendor: vendorInfo,
    alliedProducts: alliedSuggestions,
    alliedTotal,
    totalWithAllied: glassCost + alliedTotal,
    currency: 'INR',
    validUntil: validUntil.toISOString().split('T')[0],
    disclaimer: 'Estimate based on today\'s market rates. Final price may vary based on actual measurements, glass availability, and processing requirements. Custom sizes may have additional cutting charges.'
  };
}

module.exports = { calculateArea, calculateEstimate, getAlliedSuggestions };
