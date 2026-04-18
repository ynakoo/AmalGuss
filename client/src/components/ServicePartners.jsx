import { Star, MapPin, CheckCircle, Shield, Briefcase } from 'lucide-react';

const PARTNERS = [
  { id: 1, name: 'Krishna Glass Solutions', service: 'Installation', location: 'Mumbai', rating: 4.7, verified: true, experience: '12 years', emoji: '🔧' },
  { id: 2, name: 'Precision Measures Co.', service: 'Site Measurement', location: 'Bangalore', rating: 4.9, verified: true, experience: '8 years', emoji: '📐' },
  { id: 3, name: 'SafeMount Installations', service: 'Installation', location: 'Delhi NCR', rating: 4.5, verified: true, experience: '15 years', emoji: '🏗️' },
  { id: 4, name: 'GlassFit Experts', service: 'Installation + AMC', location: 'Pune', rating: 4.8, verified: true, experience: '10 years', emoji: '⚙️' },
  { id: 5, name: 'ClearView Consultants', service: 'Design Consultation', location: 'Hyderabad', rating: 4.6, verified: false, experience: '6 years', emoji: '💡' },
  { id: 6, name: 'ProGlass Installers', service: 'Installation', location: 'Chennai', rating: 4.4, verified: true, experience: '9 years', emoji: '🛠️' },
];

export default function ServicePartners({ limit = 6 }) {
  const partners = PARTNERS.slice(0, limit);

  return (
    <div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Briefcase size={20} style={{ color: 'var(--accent-emerald)' }} />
        Trusted Installation Partners
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
        Verified professionals for measurement, installation, and maintenance
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {partners.map(partner => (
          <div
            key={partner.id}
            className="glass-card"
            style={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{
                  fontSize: '1.8rem',
                  width: '44px',
                  height: '44px',
                  background: 'var(--glass-bg)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {partner.emoji}
                </span>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{partner.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{partner.service}</span>
                </div>
              </div>
              {partner.verified && (
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                  <CheckCircle size={10} /> Verified
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={13} fill="#f59e0b" color="#f59e0b" /> {partner.rating}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} /> {partner.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={13} /> {partner.experience}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
