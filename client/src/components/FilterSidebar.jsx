import { useState } from 'react';
import { X, Filter } from 'lucide-react';

export default function FilterSidebar({ filters, activeFilters, onFilterChange, onClear }) {
  const [expanded, setExpanded] = useState({
    type: true,
    thickness: true,
    application: true,
    price: true,
  });

  if (!filters) return null;

  const toggle = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTypeToggle = (type) => {
    const current = activeFilters.type || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    onFilterChange({ ...activeFilters, type: updated });
  };

  const handleApplicationToggle = (app) => {
    const current = activeFilters.application || [];
    const updated = current.includes(app)
      ? current.filter(a => a !== app)
      : [...current, app];
    onFilterChange({ ...activeFilters, application: updated });
  };

  const activeCount = (activeFilters.type?.length || 0) + (activeFilters.application?.length || 0) + (activeFilters.search ? 1 : 0);

  return (
    <div className="glass-card-static" style={{ padding: '20px', height: 'fit-content' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} style={{ color: 'var(--accent-blue)' }} />
          Filters
          {activeCount > 0 && (
            <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{activeCount}</span>
          )}
        </h3>
        {activeCount > 0 && (
          <button onClick={onClear} style={{ fontSize: '0.8rem', color: 'var(--accent-red)', cursor: 'pointer', background: 'none', border: 'none' }}>
            Clear All
          </button>
        )}
      </div>

      {/* Glass Type */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => toggle('type')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}
        >
          Glass Type
          <span style={{ transform: expanded.type ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
        </button>
        {expanded.type && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            {(filters.types || []).map(type => (
              <label key={type} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                padding: '4px 0',
              }}>
                <input
                  type="checkbox"
                  checked={(activeFilters.type || []).includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  style={{ accentColor: 'var(--accent-blue)' }}
                />
                {type}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Application */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => toggle('application')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}
        >
          Application
          <span style={{ transform: expanded.application ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
        </button>
        {expanded.application && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            {(filters.applications || []).slice(0, 12).map(app => (
              <label key={app} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                padding: '4px 0',
              }}>
                <input
                  type="checkbox"
                  checked={(activeFilters.application || []).includes(app)}
                  onChange={() => handleApplicationToggle(app)}
                  style={{ accentColor: 'var(--accent-blue)' }}
                />
                {app}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort */}
      <div>
        <label style={{
          display: 'block',
          fontWeight: 600,
          fontSize: '0.9rem',
          marginBottom: '8px',
          color: 'var(--text-primary)',
        }}>
          Sort By
        </label>
        <select
          className="select"
          value={activeFilters.sort || ''}
          onChange={(e) => onFilterChange({ ...activeFilters, sort: e.target.value })}
          style={{ fontSize: '0.85rem' }}
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  );
}
