import { useRole } from '../context/RoleContext';

export default function RoleSelector() {
  const { role, setRole, ROLES } = useRole();

  if (role) return null;

  return (
    <div className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ marginBottom: '8px' }}>I am a...</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>
          Select your role for personalized glass recommendations
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          maxWidth: '960px',
          margin: '0 auto',
        }}>
          {Object.entries(ROLES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setRole(key)}
              className="glass-card"
              style={{
                padding: '28px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                border: '1px solid var(--glass-border)',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{val.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>{val.label}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{val.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
