import { Search, Bot, FileText, ShoppingCart, ArrowRight } from 'lucide-react';

const STEPS = [
  { icon: <Search size={24} />, title: 'Search', desc: 'Find your glass type by application or specification', color: '#3b82f6' },
  { icon: <Bot size={24} />, title: 'AI Match', desc: 'Get smart recommendations from our glass expert AI', color: '#8b5cf6' },
  { icon: <FileText size={24} />, title: 'Estimate', desc: 'Instant pricing with dimensions and vendor comparison', color: '#06b6d4' },
  { icon: <ShoppingCart size={24} />, title: 'Order', desc: 'Place your order with verified vendors', color: '#10b981' },
];

export default function HowItWorks() {
  return (
    <div className="section-sm">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ marginBottom: '8px' }}>How It Works</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 40px' }}>
          From search to order in 4 simple steps
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
        }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div className="glass-card" style={{
                padding: '32px 20px',
                textAlign: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  background: `${step.color}18`,
                  border: `1px solid ${step.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: step.color,
                }}>
                  {step.icon}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: 'white',
                }}>
                  {i + 1}
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
