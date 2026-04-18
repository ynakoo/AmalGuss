import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section style={{
      position: 'relative',
      minHeight: '520px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      padding: '60px 0 40px',
    }}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--gradient-hero)',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          right: '30%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 12s ease-in-out infinite',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '700px' }}>
          <div className="animate-fade-in-up stagger-1" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            color: 'var(--accent-blue)',
            fontWeight: 600,
            marginBottom: '20px',
          }}>
            <Sparkles size={14} />
            India's First B2B2C Glass Marketplace
          </div>

          <h1 className="animate-fade-in-up stagger-2" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '20px',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.03em',
          }}>
            The Smartest Way to
            <br />
            <span style={{
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}> Buy Glass</span>
          </h1>

          <p className="animate-fade-in-up stagger-3" style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '32px',
            maxWidth: '540px',
          }}>
            Compare prices from verified vendors, get AI-powered recommendations, 
            and generate instant estimates — all in one platform built for the glass industry.
          </p>

          <div className="animate-fade-in-up stagger-4" style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/catalog')}
            >
              <Search size={18} />
              Browse Catalog
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/ai-match')}
              style={{
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              <Sparkles size={18} style={{ color: 'var(--accent-purple)' }} />
              AI Glass Finder
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
