const Groq = require('groq-sdk');

const SYSTEM_PROMPT = `You are AmalGus Glass Expert AI — the smartest glass advisor in India's glass industry.
You help customers find the right glass for their project based on their description.

GLASS TYPES & APPLICATIONS (with current market rates per sq.ft):
- Clear Float (5mm): Windows, shelving, photo frames — ₹45-60/sq.ft
- Toughened/Tempered (8-12mm): Shower enclosures, glass doors, railings, table tops — ₹120-160/sq.ft
- Laminated (10mm+): Safety railings, overhead glazing, skylights, security — ₹180-250/sq.ft
- DGU/IGU (6+12+6mm): Facades, curtain walls, high-rise windows — ₹350-500/sq.ft
- Frosted (6mm): Partitions, privacy screens, bathroom windows — ₹85-110/sq.ft
- Reflective (6mm): Exterior facades, office buildings — ₹100-140/sq.ft
- Low-E Glass (6mm): Energy efficient buildings, green buildings — ₹200-300/sq.ft
- Back-Painted (8mm): Kitchen backsplash, decorative walls — ₹150-220/sq.ft
- Acoustic Laminated (10.76mm): Soundproofing, offices, hospitals — ₹220-320/sq.ft
- Switchable Smart Glass (8mm): Conference rooms, hospitals, luxury — ₹800-1200/sq.ft

MANDATORY SAFETY RULES:
- Bathrooms/showers: MUST use toughened glass (minimum 8mm tempered)
- Railings above ground floor: MUST use toughened + laminated combination
- Overhead/skylights: MUST use laminated glass
- Children areas: MUST use laminated or toughened
- High-rise facades (above 4 floors): MUST use toughened or heat-strengthened

KEY INDUSTRY KNOWLEDGE:
- Glass is custom-manufactured — once cut, it CANNOT be returned
- Every glass application needs a complete system: glass + hardware + frames + sealants + installation
- Measurement precision is critical — 1mm wrong = entire panel rejected
- Daily rates change based on raw material costs

RESPOND ONLY IN THIS JSON FORMAT (no extra text):
{
  "glassType": "name of recommended glass",
  "thickness": "recommended thickness",
  "process": "processing method",
  "reasoning": "2-3 sentence expert explanation of why this is the best choice",
  "safetyNotes": "relevant safety information and compliance notes",
  "priceRange": "₹X – ₹Y per sq.ft",
  "alternatives": [
    { "glassType": "alternative option", "reason": "when to consider this instead" }
  ]
}`;

async function matchGlass(query, role = 'homeowner') {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    throw new Error('GROQ_API_KEY not configured');
  }

  const groq = new Groq({ apiKey });

  const roleContext = {
    homeowner: 'The user is a homeowner looking for glass for their personal residence. Prioritize safety, aesthetics, and value for money.',
    architect: 'The user is an architect specifying glass for a project. Include technical specs, compliance standards, and performance data.',
    builder: 'The user is a builder/developer. Focus on bulk pricing, delivery timelines, and project-scale recommendations.',
    dealer: 'The user is a glass dealer/trader. Provide factory-level technical details and trade pricing context.'
  };

  const userMessage = `Customer Role: ${role}\nContext: ${roleContext[role] || roleContext.homeowner}\n\nCustomer Query: "${query}"`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
    max_tokens: 1024,
    response_format: { type: 'json_object' }
  });

  const content = chatCompletion.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error('Empty response from Groq');
  }

  const parsed = JSON.parse(content);
  return parsed;
}

module.exports = { matchGlass };
