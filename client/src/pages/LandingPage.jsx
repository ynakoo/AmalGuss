import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import HeroSection from '../components/HeroSection';
import RoleSelector from '../components/RoleSelector';
import ProductCard from '../components/ProductCard';
import HowItWorks from '../components/HowItWorks';
import AlliedProducts from '../components/AlliedProducts';
import StatsSection from '../components/StatsSection';
import ServicePartners from '../components/ServicePartners';
import { Sparkles, ArrowRight, Search } from 'lucide-react';

export default function LandingPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [aiQuery, setAiQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    productAPI.getAll({ sort: 'popular' })
      .then(res => setFeaturedProducts(res.data.products.slice(0, 4)))
      .catch(() => {});
  }, []);

  const handleAiSearch = (e) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      navigate(`/ai-match?q=${encodeURIComponent(aiQuery)}`);
    }
  };

  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Role Selector */}
      <RoleSelector />

      {/* Featured Products */}
      <div className="section-sm">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 className="section-title" style={{ fontSize: '1.6rem' }}>Popular Glass Types</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Most ordered glass products on AmalGus</p>
            </div>
            <button className="btn btn-secondary" onClick={() => navigate('/catalog')}>
              View All Products <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '20px',
          }}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* AI Match CTA */}
      <div className="section-sm">
        <div className="container">
          <div className="glass-card-static" style={{
            padding: '48px 40px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderColor: 'rgba(139, 92, 246, 0.2)',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'rgba(139, 92, 246, 0.15)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--accent-purple)',
            }}>
              <Sparkles size={28} />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Outfit', marginBottom: '8px' }}>
              Not sure which glass to choose?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px' }}>
              Describe your project in plain English — our AI Glass Expert will recommend the right glass type, thickness, and process.
            </p>

            <form onSubmit={handleAiSearch} style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '560px',
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <input
                type="text"
                className="input"
                placeholder='Try: "Glass for my bathroom shower" or "Soundproof glass for office"'
                value={aiQuery}
                onChange={e => setAiQuery(e.target.value)}
                style={{ flex: 1, minWidth: '280px' }}
              />
              <button type="submit" className="btn btn-primary">
                <Sparkles size={16} /> Ask AI
              </button>
            </form>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
              {['Shower glass', 'Balcony railing', 'Office partition', 'Kitchen backsplash'].map(q => (
                <button
                  key={q}
                  className="badge"
                  style={{
                    background: 'var(--glass-bg)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    border: '1px solid var(--glass-border)',
                    padding: '6px 12px',
                    fontSize: '0.78rem',
                    transition: 'all var(--transition-fast)',
                  }}
                  onClick={() => navigate(`/ai-match?q=${encodeURIComponent(q)}`)}
                  onMouseEnter={e => {
                    e.target.style.borderColor = 'var(--accent-purple)';
                    e.target.style.color = 'var(--accent-purple)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.borderColor = 'var(--glass-border)';
                    e.target.style.color = 'var(--text-secondary)';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <HowItWorks />

      {/* Allied Products */}
      <div className="section-sm">
        <div className="container">
          <AlliedProducts />
        </div>
      </div>

      {/* Stats */}
      <StatsSection />

      {/* Service Partners */}
      <div className="section-sm">
        <div className="container">
          <ServicePartners limit={3} />
        </div>
      </div>
    </div>
  );
}
