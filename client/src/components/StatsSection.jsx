import { useEffect, useState, useRef } from 'react';
import { TrendingUp, Users, Layers, Store } from 'lucide-react';

const STATS = [
  { value: 150, suffix: 'B+', label: 'Global Glass Market', icon: <TrendingUp size={22} />, prefix: '$', color: '#3b82f6' },
  { value: 52, suffix: '+', label: 'Customer Types', icon: <Users size={22} />, prefix: '', color: '#10b981' },
  { value: 15, suffix: '+', label: 'Glass Types', icon: <Layers size={22} />, prefix: '', color: '#8b5cf6' },
  { value: 3, suffix: '+', label: 'Verified Vendors', icon: <Store size={22} />, prefix: '', color: '#f59e0b' },
];

function AnimatedCounter({ value, suffix, prefix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, value, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <div className="section-sm">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
        }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: '28px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: `${stat.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                color: stat.color,
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                fontFamily: 'Outfit',
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}aa)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '4px',
              }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
