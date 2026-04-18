import { Star, MapPin, CheckCircle, Clock, Award, Package } from 'lucide-react';

export default function VendorComparison({ vendors, productName }) {
  if (!vendors || vendors.length === 0) return null;

  const BADGE_STYLES = {
    'Best Price': { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', icon: '💰' },
    'Fastest Delivery': { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', icon: '⚡' },
    'Specialty Expert': { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', icon: '🏆' },
  };

  return (
    <div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Package size={20} style={{ color: 'var(--accent-blue)' }} />
        Compare Vendors {productName && `for ${productName}`}
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
      }}>
        {vendors.map(vendor => {
          const badgeStyle = BADGE_STYLES[vendor.badge] || {};
          return (
            <div
              key={vendor.id}
              className="glass-card"
              style={{ padding: '24px', position: 'relative' }}
            >
              {vendor.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-1px',
                  left: '20px',
                  right: '20px',
                  height: '3px',
                  background: badgeStyle.color || 'var(--accent-blue)',
                  borderRadius: '0 0 4px 4px',
                }} />
              )}

              {vendor.badge && (
                <span className="badge" style={{
                  background: badgeStyle.bg,
                  color: badgeStyle.color,
                  marginBottom: '12px',
                  display: 'inline-flex',
                }}>
                  {badgeStyle.icon} {vendor.badge}
                </span>
              )}

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
                {vendor.name}
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <MapPin size={14} />
                {vendor.location}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px', color: 'var(--accent-amber)', fontSize: '0.85rem' }}>
                <Star size={14} fill="currentColor" />
                {vendor.rating}
                <span style={{ color: 'var(--text-muted)', marginLeft: '2px' }}>
                  ({vendor.reviewCount} reviews)
                </span>
              </div>

              {vendor.price && (
                <div style={{
                  background: 'var(--glass-bg)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  marginBottom: '12px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Price</span>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-emerald)' }}>
                      ₹{vendor.price}/sq.ft
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Delivery</span>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {vendor.delivery}
                    </span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  color: vendor.inStock ? 'var(--accent-emerald)' : 'var(--accent-red)',
                }}>
                  <CheckCircle size={12} />
                  {vendor.inStock ? 'In Stock' : 'Made to Order'}
                </span>

                {vendor.verified && (
                  <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
