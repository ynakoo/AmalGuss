import { useState, useEffect } from 'react';
import { rateAPI } from '../services/api';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function DailyRateTicker() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    rateAPI.getToday()
      .then(res => setRates(res.data.rates))
      .catch(() => {
        // Fallback static rates
        setRates([
          { glassType: 'Clear Float', thickness: '5mm', rate: 52, change: 1.2 },
          { glassType: 'Toughened', thickness: '8mm', rate: 140, change: 2.5 },
          { glassType: 'Laminated', thickness: '10mm', rate: 210, change: 3.0 },
          { glassType: 'DGU / IGU', thickness: '6+12+6mm', rate: 420, change: 5.0 },
          { glassType: 'Frosted', thickness: '6mm', rate: 95, change: 1.0 },
          { glassType: 'Reflective', thickness: '6mm', rate: 120, change: 1.5 },
          { glassType: 'Low-E Glass', thickness: '6mm', rate: 255, change: 3.0 },
          { glassType: 'Back-Painted', thickness: '8mm', rate: 180, change: 2.0 },
        ]);
      });
  }, []);

  if (rates.length === 0) return null;

  // Duplicate for seamless scrolling
  const items = [...rates, ...rates];

  return (
    <div className="ticker-container">
      <div className="ticker-track">
        {items.map((rate, i) => (
          <div key={i} className="ticker-item">
            <span className="glass-name">{rate.glassType} {rate.thickness}</span>
            <span className="glass-rate">₹{rate.rate}/sq.ft</span>
            <span className={rate.change > 0 ? 'rate-up' : rate.change < 0 ? 'rate-down' : ''} style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.8rem' }}>
              {rate.change > 0 ? <TrendingUp size={12} /> : rate.change < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
              {rate.change > 0 ? '+' : ''}{rate.change}%
            </span>
            <span style={{ color: 'var(--glass-border)', margin: '0 8px' }}>│</span>
          </div>
        ))}
      </div>
    </div>
  );
}
