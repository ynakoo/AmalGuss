import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    type: searchParams.get('type') ? [searchParams.get('type')] : [],
    application: [],
    search: searchParams.get('search') || '',
    sort: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [activeFilters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (activeFilters.type?.length > 0) params.type = activeFilters.type.join(',');
      if (activeFilters.application?.length > 0) params.application = activeFilters.application.join(',');
      if (activeFilters.search) params.search = activeFilters.search;
      if (activeFilters.sort) params.sort = activeFilters.sort;

      const res = await productAPI.getAll(params);
      setProducts(res.data.products);
      setFilters(res.data.filters);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
    setLoading(false);
  };

  const clearFilters = () => {
    setActiveFilters({ type: [], application: [], search: '', sort: '' });
    setSearchParams({});
  };

  const activeCount = (activeFilters.type?.length || 0) + (activeFilters.application?.length || 0);

  return (
    <div className="section" style={{ paddingTop: '32px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit', marginBottom: '6px' }}>
            Glass Product Catalog
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Browse {products.length} glass products with industry-grade specifications
          </p>
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }} />
            <input
              className="input"
              type="text"
              placeholder="Search glass by type, application, or features..."
              value={activeFilters.search}
              onChange={e => setActiveFilters(prev => ({ ...prev, search: e.target.value }))}
              style={{ paddingLeft: '42px' }}
            />
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            style={{ display: 'none' }}
            id="mobile-filter-btn"
          >
            <SlidersHorizontal size={16} />
            Filters {activeCount > 0 && `(${activeCount})`}
          </button>
        </div>

        {/* Active Filter Chips */}
        {activeCount > 0 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Active:</span>
            {activeFilters.type?.map(t => (
              <span key={t} className="badge badge-blue" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                onClick={() => setActiveFilters(prev => ({ ...prev, type: prev.type.filter(x => x !== t) }))}>
                {t} <X size={12} />
              </span>
            ))}
            {activeFilters.application?.map(a => (
              <span key={a} className="badge badge-emerald" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                onClick={() => setActiveFilters(prev => ({ ...prev, application: prev.application.filter(x => x !== a) }))}>
                {a} <X size={12} />
              </span>
            ))}
            <button onClick={clearFilters} style={{ fontSize: '0.8rem', color: 'var(--accent-red)', cursor: 'pointer', background: 'none', border: 'none' }}>
              Clear all
            </button>
          </div>
        )}

        {/* Main Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '24px',
          alignItems: 'start',
        }}>
          {/* Sidebar */}
          <div className="hide-mobile">
            <FilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              onClear={clearFilters}
            />
          </div>

          {/* Mobile Filter Overlay */}
          {showMobileFilter && (
            <div style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              justifyContent: 'flex-end',
            }} onClick={() => setShowMobileFilter(false)}>
              <div style={{
                width: '85%',
                maxWidth: '320px',
                background: 'var(--bg-secondary)',
                padding: '20px',
                overflowY: 'auto',
              }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 700 }}>Filters</h3>
                  <button onClick={() => setShowMobileFilter(false)}>
                    <X size={20} color="var(--text-secondary)" />
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  activeFilters={activeFilters}
                  onFilterChange={setActiveFilters}
                  onClear={clearFilters}
                />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div>
            {loading ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: '20px',
              }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="shimmer" style={{ height: '320px' }} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="glass-card-static" style={{ padding: '60px 40px', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🔍</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>No products found</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Try adjusting your filters or search query</p>
                <button className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: '20px',
              }}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #mobile-filter-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
