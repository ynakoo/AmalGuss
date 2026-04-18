import { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function AlliedProducts({ glassType, application }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product detail to get allied products
    // For simplicity, load all products and find allied
    productAPI.getAll()
      .then(res => {
        // Use the products endpoint - allied products come from detail
      })
      .catch(() => {});
  }, [glassType, application]);

  // Static allied products for display
  const ALLIED = [
    { id: 1, name: 'Patch Fitting Set', category: 'Hardware', price: 3500, brand: 'Dorma', emoji: '🔩' },
    { id: 2, name: 'Structural Silicone', category: 'Sealants', price: 850, brand: 'Dow Corning', emoji: '🧴' },
    { id: 3, name: 'Shower Hinge Set', category: 'Shower Hardware', price: 2800, brand: 'Hafele', emoji: '🚿' },
    { id: 4, name: 'Glass Clamp Set', category: 'Hardware', price: 1200, brand: 'Ozone', emoji: '🔗' },
    { id: 5, name: 'U-Channel Profile', category: 'Railing Systems', price: 2200, brand: 'Alumil', emoji: '⬜' },
    { id: 6, name: 'UPVC Window Frame', category: 'Doors & Windows', price: 650, brand: 'Fenesta', emoji: '🪟' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingBag size={20} style={{ color: 'var(--accent-amber)' }} />
          Complete Your Installation
        </h3>
      </div>

      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '8px',
        scrollSnapType: 'x mandatory',
      }}>
        {ALLIED.map(product => (
          <div
            key={product.id}
            className="glass-card"
            style={{
              minWidth: '200px',
              padding: '20px',
              scrollSnapAlign: 'start',
              flex: '0 0 auto',
            }}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>{product.emoji}</span>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>{product.name}</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{product.brand}</p>
            <span className="badge badge-blue" style={{ fontSize: '0.7rem', marginBottom: '8px' }}>
              {product.category}
            </span>
            <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem', marginTop: '8px' }}>
              ₹{product.price.toLocaleString()}
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400 }}> /unit</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
