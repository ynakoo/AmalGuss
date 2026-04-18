const RULES = [
  {
    keywords: ['shower', 'bathroom', 'wet area', 'bath'],
    match: {
      glassType: 'Toughened',
      thickness: '8mm',
      process: 'Tempered',
      reasoning: 'Toughened (tempered) glass is mandatory for shower enclosures and bathroom applications. It is 4-5x stronger than regular glass and breaks into small, blunt granules instead of sharp shards, meeting IS 2553 safety standards for wet areas.',
      safetyNotes: 'Toughened glass is mandatory for all shower and bathroom glazing per Indian safety standards. Minimum 8mm thickness required.',
      priceRange: '₹120 – ₹160 per sq.ft',
      alternatives: [
        { glassType: 'Frosted Toughened', reason: 'If privacy is needed in the shower/bathroom area' }
      ]
    }
  },
  {
    keywords: ['soundproof', 'acoustic', 'noise', 'sound insulation', 'quiet'],
    match: {
      glassType: 'Acoustic Laminated',
      thickness: '10.76mm',
      process: 'PVB Acoustic',
      reasoning: 'Acoustic laminated glass with a special PVB interlayer provides up to 42dB noise reduction. For office cabins and spaces requiring sound insulation, this is the most effective single-pane solution.',
      safetyNotes: 'For maximum acoustic performance, consider using in a DGU configuration with asymmetric glass thicknesses to avoid resonance.',
      priceRange: '₹220 – ₹320 per sq.ft',
      alternatives: [
        { glassType: 'DGU with Acoustic Laminated', reason: 'For extreme noise environments (highways, airports)' },
        { glassType: 'Laminated Glass', reason: 'Budget-friendly option with moderate sound reduction' }
      ]
    }
  },
  {
    keywords: ['railing', 'balcony', 'staircase', 'balustrade', 'terrace', 'handrail'],
    match: {
      glassType: 'Toughened + Laminated',
      thickness: '12mm',
      process: 'Tempered + PVB Laminated',
      reasoning: 'For railings, especially at height, toughened laminated glass is the safest choice. The toughened layer provides strength while the laminated interlayer ensures the glass stays in place even if broken, preventing fall-through accidents.',
      safetyNotes: 'CRITICAL SAFETY: Railings above ground floor MUST use toughened + laminated combination. Single toughened glass is NOT acceptable for railing applications at height.',
      priceRange: '₹280 – ₹400 per sq.ft',
      alternatives: [
        { glassType: 'Laminated Glass', reason: 'For ground-floor railings where impact risk is lower' }
      ]
    }
  },
  {
    keywords: ['energy', 'efficient', 'insulation', 'thermal', 'heat control', 'south facing', 'solar'],
    match: {
      glassType: 'Low-E DGU',
      thickness: '6+12+6mm',
      process: 'Low-E Soft Coat + Insulated',
      reasoning: 'Low-E glass in a DGU configuration provides the best energy efficiency. The Low-E coating reflects infrared heat while the insulated air gap prevents thermal transfer, reducing HVAC costs by 30-40%.',
      safetyNotes: 'Low-E coating must face the sealed DGU cavity. Ensure certified DGU manufacturer for seal integrity. LEED and GRIHA compliant.',
      priceRange: '₹400 – ₹600 per sq.ft',
      alternatives: [
        { glassType: 'Reflective Glass', reason: 'Budget option for solar heat control without insulation' }
      ]
    }
  },
  {
    keywords: ['kitchen', 'backsplash', 'decorative', 'color', 'coloured', 'lacquered'],
    match: {
      glassType: 'Back-Painted',
      thickness: '8mm',
      process: 'Lacquered',
      reasoning: 'Back-painted lacquered glass is the ideal choice for kitchen backsplashes and decorative surfaces. Available in unlimited RAL colors, it provides a sleek, hygienic surface that is easy to clean with no grout lines.',
      safetyNotes: 'Must use toughened glass as base for kitchen applications due to heat proximity. Use proper silicone adhesive for wall mounting, not regular mirror adhesive.',
      priceRange: '₹150 – ₹220 per sq.ft',
      alternatives: [
        { glassType: 'Ceramic Printed Glass', reason: 'For custom designs, patterns, or image printing on glass' }
      ]
    }
  },
  {
    keywords: ['privacy', 'conference', 'partition', 'frosted', 'office divider', 'cabin'],
    match: {
      glassType: 'Frosted',
      thickness: '6mm',
      process: 'Acid Etched',
      reasoning: 'Frosted (acid etched) glass provides an elegant translucent finish that allows light transmission while ensuring privacy. Perfect for conference rooms, office partitions, and any space where visual privacy is needed without blocking natural light.',
      safetyNotes: 'For partition and door applications, use frosted toughened glass for safety compliance. Standard frosted glass is not safety rated.',
      priceRange: '₹85 – ₹110 per sq.ft',
      alternatives: [
        { glassType: 'Switchable Smart Glass', reason: 'For instant privacy switching — transparent to opaque on demand' }
      ]
    }
  },
  {
    keywords: ['facade', 'curtain wall', 'exterior', 'building', 'high rise', 'commercial building'],
    match: {
      glassType: 'DGU / IGU',
      thickness: '6+12+6mm',
      process: 'Insulated',
      reasoning: 'Double Glazed Units (DGU) are the industry standard for commercial facades and curtain walls. They provide thermal insulation, acoustic dampening, and prevent condensation — essential for modern high-performance buildings.',
      safetyNotes: 'All glass in facades above 4 floors must be toughened or heat-strengthened. DGU seals must be manufactured by certified facilities. Consider wind load calculations for high-rise applications.',
      priceRange: '₹350 – ₹500 per sq.ft',
      alternatives: [
        { glassType: 'Low-E DGU', reason: 'For energy-efficient green buildings with solar heat control' },
        { glassType: 'Reflective Glass', reason: 'For aesthetic mirror-finish exteriors with solar control' }
      ]
    }
  },
  {
    keywords: ['mirror', 'reflective', 'one way'],
    match: {
      glassType: 'Reflective',
      thickness: '6mm',
      process: 'Coated',
      reasoning: 'Reflective glass with metallic oxide coating provides a mirror-like appearance from outside while maintaining visibility from inside. Excellent for commercial buildings requiring daytime privacy and solar heat rejection.',
      safetyNotes: 'Ensure correct coating orientation during installation. Check local building codes — some areas restrict high-reflectivity glass due to heat island effect.',
      priceRange: '₹100 – ₹140 per sq.ft',
      alternatives: [
        { glassType: 'DGU / IGU', reason: 'For better thermal performance combined with reflective outer pane' }
      ]
    }
  },
  {
    keywords: ['smart', 'switchable', 'electrochromic', 'electric', 'pdlc'],
    match: {
      glassType: 'Switchable Smart',
      thickness: '8mm',
      process: 'PDLC Film',
      reasoning: 'Switchable smart glass uses PDLC technology to change from opaque to transparent with an electrical signal. Ideal for premium conference rooms, hospital ICUs, and luxury residences where instant privacy control is needed.',
      safetyNotes: 'Requires electrical connection (48V AC). Must be installed by certified smart glass technicians. Include UPS backup for privacy-critical applications.',
      priceRange: '₹800 – ₹1200 per sq.ft',
      alternatives: [
        { glassType: 'Frosted Glass', reason: 'Budget alternative for fixed privacy — no switching capability' }
      ]
    }
  },
  {
    keywords: ['window', 'residential', 'home window', 'basic'],
    match: {
      glassType: 'Clear Float',
      thickness: '5mm',
      process: 'Plain',
      reasoning: 'Clear float glass is the standard choice for residential windows. It offers high optical clarity at an affordable price. For most window applications, 5mm thickness provides adequate strength and common availability.',
      safetyNotes: 'Not safety glass — not suitable for doors, bathrooms, or low-level glazing (below 800mm from floor). Consider toughened for large windows or areas with risk of human impact.',
      priceRange: '₹45 – ₹60 per sq.ft',
      alternatives: [
        { glassType: 'DGU / IGU', reason: 'For noise reduction and thermal insulation in premium homes' },
        { glassType: 'Toughened', reason: 'For large windows or safety-critical locations' }
      ]
    }
  },
  {
    keywords: ['skylight', 'overhead', 'canopy', 'roof', 'atrium'],
    match: {
      glassType: 'Laminated',
      thickness: '10mm',
      process: 'PVB Laminated',
      reasoning: 'Laminated glass is mandatory for all overhead/skylight applications. The PVB interlayer ensures that if the glass breaks, fragments remain bonded together and do not fall, protecting people below.',
      safetyNotes: 'CRITICAL: Only laminated glass is permitted for overhead/skylight use. Single toughened glass is NOT acceptable — toughened pieces can fall when broken overhead.',
      priceRange: '₹180 – ₹250 per sq.ft',
      alternatives: [
        { glassType: 'Laminated + Low-E', reason: 'For skylights requiring heat control and UV protection' }
      ]
    }
  },
  {
    keywords: ['door', 'glass door', 'entrance', 'entry'],
    match: {
      glassType: 'Toughened',
      thickness: '12mm',
      process: 'Tempered',
      reasoning: 'Glass doors require toughened glass for safety — minimum 10mm for internal doors and 12mm for entrance doors. Tempered glass handles the stress of daily use, wind loads, and accidental impact.',
      safetyNotes: 'All frameless glass doors must use toughened glass. Door hardware (floor springs, patch fittings) must be rated for the glass weight. Minimum 12mm for entrance doors.',
      priceRange: '₹120 – ₹160 per sq.ft',
      alternatives: [
        { glassType: 'Frosted Toughened', reason: 'For internal doors requiring privacy' }
      ]
    }
  }
];

function matchFallback(query, role = 'homeowner') {
  const queryLower = query.toLowerCase();
  
  // Score each rule based on keyword matches
  let bestMatch = null;
  let bestScore = 0;

  for (const rule of RULES) {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (queryLower.includes(keyword)) {
        score += keyword.split(' ').length; // Multi-word keywords score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule.match;
    }
  }

  // Default recommendation if no match
  if (!bestMatch) {
    bestMatch = {
      glassType: 'Clear Float',
      thickness: '5mm',
      process: 'Plain',
      reasoning: 'Based on your description, clear float glass is a versatile starting point. Please provide more details about your specific application (bathroom, window, facade, etc.) for a more precise recommendation.',
      safetyNotes: 'For safety-critical applications (doors, showers, railings), toughened or laminated glass is required.',
      priceRange: '₹45 – ₹60 per sq.ft',
      alternatives: [
        { glassType: 'Toughened', reason: 'For safety-critical applications' },
        { glassType: 'Laminated', reason: 'For security and overhead applications' }
      ]
    };
  }

  return bestMatch;
}

module.exports = { matchFallback };
