import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import VendorComparison from '../components/VendorComparison';
import AlliedProducts from '../components/AlliedProducts';
import { ArrowLeft, FileText, Shield, Zap, Star, CheckCircle } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productAPI.getById(id)
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="section" style={{ paddingTop: '32px' }}>
        <div className="container">
          <div className="shimmer" style={{ height: '500px', borderRadius: 'var(--radius-lg)' }} />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="section" style={{ paddingTop: '32px', textAlign: 'center' }}>
        <div className="container">
          <h2>Product not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/catalog')} style={{ marginTop: '16px' }}>
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const { product, vendors, alliedProducts: allied, todayRate } = data;

  return (
    <div className="section" style={{ paddingTop: '24px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            to="/catalog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent-blue)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
          >
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>

        {/* Product Header */}
        <div className="glass-card-static" style={{ padding: '32px', marginBottom: '24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '32px',
            alignItems: 'start',
          }}>
            {/* Icon */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--gradient-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3.5rem',
              border: '1px solid var(--glass-border)',
              overflow: 'hidden',
            }}>
              {product.imageUrl && !product.imageUrl.includes('IMAGE_PLACEHOLDER') ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                product.glassType.includes('Smart') ? '⚡' : 
                product.glassType.includes('Curved') ? '🌊' :
                product.glassType.includes('Frosted') ? '❄️' :
                product.glassType.includes('Toughened') ? '🛡️' :
                product.glassType.includes('Laminated') ? '🔒' :
                product.glassType.includes('DGU') ? '🏢' :
                product.glassType.includes('Low-E') ? '♻️' :
                product.glassType.includes('Reflective') ? '🪞' :
                product.glassType.includes('Back-Painted') ? '🎨' :
                product.glassType.includes('Ceramic') ? '🖼️' :
                product.glassType.includes('Acoustic') ? '🔇' :
                '💎'
              )}
            </div>

            {/* Details */}
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-blue">{product.thickness}</span>
                <span className="badge badge-purple">{product.process}</span>
                {product.popular && <span className="badge badge-amber">⭐ Popular</span>}
              </div>

              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Outfit', marginBottom: '8px' }}>
                {product.name}
              </h1>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px', maxWidth: '600px' }}>
                {product.description}
              </p>

              {/* Price + CTA */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap',
              }}>
                <div>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    ₹{product.minRate} – ₹{product.maxRate}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> per sq.ft</span>
                  {todayRate && (
                    <div style={{ fontSize: '0.8rem', color: todayRate.change > 0 ? 'var(--accent-emerald)' : 'var(--accent-red)', marginTop: '4px' }}>
                      Today's rate: ₹{todayRate.rate} ({todayRate.change > 0 ? '+' : ''}{todayRate.change}%)
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate(`/estimate?product=${product.id}`)}
                >
                  <FileText size={18} />
                  Get Estimate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}>
          {/* Features */}
          <div className="glass-card-static" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} style={{ color: 'var(--accent-blue)' }} /> Features
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {product.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div className="glass-card-static" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={18} style={{ color: 'var(--accent-amber)' }} /> Applications
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.applications.map((app, i) => (
                <span key={i} className="badge" style={{
                  background: 'var(--glass-bg)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--glass-border)',
                  padding: '6px 12px',
                }}>
                  {app}
                </span>
              ))}
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '20px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} style={{ color: 'var(--accent-red)' }} /> Safety Notes
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'rgba(239, 68, 68, 0.05)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
              {product.safetyNotes}
            </p>
          </div>
        </div>

        {/* Vendor Comparison */}
        {vendors && vendors.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <VendorComparison vendors={vendors} productName={product.name} />
          </div>
        )}

        {/* Allied Products */}
        <div style={{ marginBottom: '32px' }}>
          <AlliedProducts glassType={product.glassType} application={product.application} />
        </div>
      </div>
    </div>
  );
}
