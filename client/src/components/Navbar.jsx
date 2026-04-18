import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { Menu, X, Diamond, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { path: '/catalog', label: 'Products' },
  { path: '/ai-match', label: 'AI Glass Finder' },
  { path: '/estimate', label: 'Get Estimate' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { role, ROLES, clearRole } = useRole();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(5, 10, 24, 0.95)' : 'rgba(5, 10, 24, 0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${scrolled ? 'var(--glass-border-hover)' : 'var(--glass-border)'}`,
      transition: 'all var(--transition-base)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'var(--gradient-accent)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Diamond size={20} color="white" />
          </div>
          <span style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.3rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
          }}>
            <span style={{ color: 'var(--text-primary)' }}>Amal</span>
            <span style={{
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Gus</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hide-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: location.pathname === link.path ? 'var(--accent-blue)' : 'var(--text-secondary)',
                background: location.pathname === link.path ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => {
                if (location.pathname !== link.path) {
                  e.target.style.color = 'var(--text-primary)';
                  e.target.style.background = 'var(--glass-bg)';
                }
              }}
              onMouseLeave={e => {
                if (location.pathname !== link.path) {
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Role Badge + Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {role && ROLES[role] && (
            <button
              onClick={clearRole}
              className="badge badge-blue"
              style={{ cursor: 'pointer', fontSize: '0.8rem' }}
              title="Click to change role"
            >
              {ROLES[role].icon} {ROLES[role].label}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="btn-ghost"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              padding: '8px',
            }}
            id="mobile-menu-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          padding: '16px 24px 24px',
          borderTop: '1px solid var(--glass-border)',
          animation: 'fadeInDown 0.3s ease-out',
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: 'block',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: location.pathname === link.path ? 'var(--accent-blue)' : 'var(--text-secondary)',
                background: location.pathname === link.path ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          #mobile-menu-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
