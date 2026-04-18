import { Link } from 'react-router-dom';
import { Diamond, Mail, ArrowRight } from 'lucide-react';

const GLASS_TYPES = ['Clear Float', 'Toughened', 'Laminated', 'DGU / IGU', 'Frosted', 'Reflective', 'Low-E', 'Back-Painted'];
const ALLIED = ['Hardware & Fittings', 'Silicones & Sealants', 'Doors & Windows', 'Shower Hardware', 'Railing Systems'];
const CUSTOMERS = ['Homeowners', 'Architects', 'Builders', 'Dealers', 'Installers'];

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(5, 10, 24, 0.98)',
      borderTop: '1px solid var(--glass-border)',
      padding: '60px 0 30px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'var(--gradient-accent)',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Diamond size={18} color="white" />
              </div>
              <span style={{
                fontFamily: 'Outfit',
                fontSize: '1.2rem',
                fontWeight: 800,
              }}>
                AmalGus
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '260px' }}>
              World's First B2B2C Glass & Allied Products Niche Marketplace. Connecting the entire glass ecosystem.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Mail size={14} />
              preetam@amalgus.com
            </div>
          </div>

          {/* Glass Types */}
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Glass Types</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {GLASS_TYPES.map(type => (
                <li key={type}>
                  <Link to={`/catalog?type=${encodeURIComponent(type)}`} style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent-blue)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Allied Products */}
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Allied Products</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ALLIED.map(item => (
                <li key={item} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Types */}
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>For</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CUSTOMERS.map(c => (
                <li key={c} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © 2026 AmalGus Technology. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Built with ♦ for the Glass Industry
          </p>
        </div>
      </div>
    </footer>
  );
}
