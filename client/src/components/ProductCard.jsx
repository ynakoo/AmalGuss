import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

const TYPE_COLORS = {
  'Clear Float': 'linear-gradient(135deg, rgba(147, 197, 253, 0.2), rgba(147, 197, 253, 0.05))',
  'Toughened': 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))',
  'Laminated': 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))',
  'DGU / IGU': 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))',
  'Frosted': 'linear-gradient(135deg, rgba(203, 213, 225, 0.2), rgba(203, 213, 225, 0.05))',
  'Reflective': 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.05))',
  'Low-E Glass': 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.05))',
  'Back-Painted': 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(244, 114, 182, 0.05))',
  'Acoustic Laminated': 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.05))',
  'Switchable Smart': 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.05))',
  'Ceramic Printed': 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(251, 146, 60, 0.05))',
  'Bent/Curved': 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(56, 189, 248, 0.05))',
};

const TYPE_ACCENT = {
  'Clear Float': '#93c5fd',
  'Toughened': '#10b981',
  'Laminated': '#f59e0b',
  'DGU / IGU': '#8b5cf6',
  'Frosted': '#cbd5e1',
  'Reflective': '#06b6d4',
  'Low-E Glass': '#22c55e',
  'Back-Painted': '#f472b6',
  'Acoustic Laminated': '#6366f1',
  'Switchable Smart': '#a855f7',
  'Ceramic Printed': '#fb923c',
  'Bent/Curved': '#38bdf8',
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const gradient = TYPE_COLORS[product.glassType] || TYPE_COLORS['Clear Float'];
  const accent = TYPE_ACCENT[product.glassType] || '#3b82f6';

  return (
    <div
      className="glass-card"
      style={{
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Color Band */}
      <div style={{
        height: '120px',
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {product.imageUrl && !product.imageUrl.includes('IMAGE_PLACEHOLDER') ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <>
            <div style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              background: `radial-gradient(circle, ${accent}22, transparent 70%)`,
              borderRadius: '50%',
            }} />
            <span style={{
              fontSize: '2.5rem',
              filter: 'saturate(1.2)',
              position: 'relative',
              zIndex: 1,
            }}>
              {product.glassType.includes('Smart') ? '⚡' : 
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
               '💎'}
            </span>
          </>
        )}
        {product.popular && (
          <span className="badge badge-blue" style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '0.7rem',
          }}>
            Popular
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          marginBottom: '6px',
          color: 'var(--text-primary)',
        }}>
          {product.name}
        </h3>

        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}>
          <span className="badge" style={{
            background: `${accent}15`,
            color: accent,
          }}>
            {product.thickness}
          </span>
          <span className="badge" style={{
            background: 'var(--glass-bg)',
            color: 'var(--text-secondary)',
          }}>
            {product.process}
          </span>
        </div>

        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          marginBottom: '12px',
          lineHeight: 1.5,
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.application}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '12px',
          marginTop: 'auto',
        }}>
          <div>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: accent }}>
              ₹{product.minRate} – ₹{product.maxRate}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
              /sq.ft
            </span>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/estimate?product=${product.id}`);
            }}
            style={{ fontSize: '0.78rem', padding: '6px 14px' }}
          >
            Get Quote <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
