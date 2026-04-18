import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI, estimateAPI, vendorAPI } from '../services/api';
import VendorComparison from '../components/VendorComparison';
import { FileText, Calculator, ChevronDown, Printer, Download, CheckCircle, Plus, Minus } from 'lucide-react';

export default function EstimatePage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(searchParams.get('product') || '');
  const [width, setWidth] = useState('900');
  const [height, setHeight] = useState('2100');
  const [quantity, setQuantity] = useState(1);
  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [vendors, setVendors] = useState([]);
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    productAPI.getAll()
      .then(res => setProducts(res.data.products))
      .catch(() => {});
  }, []);

  // Fetch vendors when product changes
  useEffect(() => {
    if (selectedProductId) {
      vendorAPI.compare(selectedProductId)
        .then(res => setVendors(res.data.vendors))
        .catch(() => setVendors([]));
    }
  }, [selectedProductId]);

  // Auto-calculate when inputs change
  useEffect(() => {
    if (selectedProductId && width && height && quantity > 0) {
      handleCalculate();
    }
  }, [selectedProductId, width, height, quantity, selectedVendorId]);

  const handleCalculate = async () => {
    if (!selectedProductId || !width || !height || quantity <= 0) return;
    setLoading(true);

    try {
      const res = await estimateAPI.calculate({
        productId: Number(selectedProductId),
        width: Number(width),
        height: Number(height),
        quantity: Number(quantity),
        vendorId: selectedVendorId ? Number(selectedVendorId) : undefined,
      });
      setEstimate(res.data.estimate);
    } catch (err) {
      console.error('Estimate error:', err);
    }
    setLoading(false);
  };

  const selectedProduct = products.find(p => p.id === Number(selectedProductId));

  return (
    <div className="section" style={{ paddingTop: '24px' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Outfit', marginBottom: '6px' }}>
            <Calculator size={28} style={{ color: 'var(--accent-cyan)', verticalAlign: 'middle', marginRight: '8px' }} />
            Glass Estimate Calculator
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Get instant pricing based on glass type, dimensions, and vendor
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '24px',
          alignItems: 'start',
        }} id="estimate-layout">
          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Step 1: Glass Selection */}
            <div className="glass-card-static" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--accent-blue)' }}>
                1. Select Glass Type
              </h3>
              <select
                className="select"
                value={selectedProductId}
                onChange={e => setSelectedProductId(e.target.value)}
              >
                <option value="">Choose a glass type...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.thickness} • ₹{p.minRate}-{p.maxRate}/sq.ft
                  </option>
                ))}
              </select>

              {selectedProduct && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  background: 'var(--glass-bg)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}>
                  <span className="badge badge-blue">{selectedProduct.thickness}</span>
                  <span className="badge badge-purple">{selectedProduct.process}</span>
                  <span className="badge" style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}>
                    {selectedProduct.application}
                  </span>
                </div>
              )}
            </div>

            {/* Step 2: Dimensions */}
            <div className="glass-card-static" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--accent-blue)' }}>
                2. Enter Dimensions
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Width (mm)
                  </label>
                  <input
                    className="input"
                    type="number"
                    value={width}
                    onChange={e => setWidth(e.target.value)}
                    min="1"
                    placeholder="Width in mm"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Height (mm)
                  </label>
                  <input
                    className="input"
                    type="number"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    min="1"
                    placeholder="Height in mm"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Quantity (panels)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '8px 12px' }}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ fontSize: '1.3rem', fontWeight: 700, minWidth: '40px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '8px 12px' }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Visual */}
              {width && height && (
                <div style={{
                  marginTop: '16px',
                  padding: '16px',
                  background: 'var(--glass-bg)',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    width: `${Math.min(120, Number(width) / 20)}px`,
                    height: `${Math.min(160, Number(height) / 20)}px`,
                    border: '2px solid var(--accent-cyan)',
                    borderRadius: '4px',
                    margin: '0 auto 8px',
                    background: 'rgba(6, 182, 212, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                  }}>
                    {width}×{height}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Area per panel: <strong>{(Number(width) * Number(height) / 92903.04).toFixed(2)} sq.ft</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Vendor */}
            {vendors.length > 0 && (
              <div className="glass-card-static" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--accent-blue)' }}>
                  3. Select Vendor (optional)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px',
                    background: !selectedVendorId ? 'rgba(59, 130, 246, 0.08)' : 'var(--glass-bg)',
                    border: !selectedVendorId ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                  }}>
                    <input
                      type="radio"
                      name="vendor"
                      checked={!selectedVendorId}
                      onChange={() => setSelectedVendorId('')}
                      style={{ accentColor: 'var(--accent-blue)' }}
                    />
                    Average market rate
                  </label>
                  {vendors.map(v => (
                    <label key={v.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px',
                      background: selectedVendorId === String(v.id) ? 'rgba(59, 130, 246, 0.08)' : 'var(--glass-bg)',
                      border: selectedVendorId === String(v.id) ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid var(--glass-border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                    }}>
                      <input
                        type="radio"
                        name="vendor"
                        checked={selectedVendorId === String(v.id)}
                        onChange={() => setSelectedVendorId(String(v.id))}
                        style={{ accentColor: 'var(--accent-blue)' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{v.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          ₹{v.price}/sq.ft · {v.delivery}
                          {v.badge && <span className="badge badge-emerald" style={{ fontSize: '0.65rem', marginLeft: '8px' }}>{v.badge}</span>}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Estimate Summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="glass-card-static" style={{
              padding: '28px',
              background: 'linear-gradient(145deg, rgba(6, 182, 212, 0.06), rgba(59, 130, 246, 0.04))',
              borderColor: 'rgba(6, 182, 212, 0.2)',
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <FileText size={20} style={{ color: 'var(--accent-cyan)' }} />
                Estimate Summary
              </h3>

              {!estimate ? (
                <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  <Calculator size={32} style={{ marginBottom: '12px', opacity: 0.4 }} />
                  <p>Select a glass type and enter dimensions to see your estimate</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    padding: '12px',
                    background: 'var(--glass-bg)',
                    borderRadius: 'var(--radius-sm)',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                      {estimate.product.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {estimate.product.thickness} · {estimate.product.process}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Dimensions</span>
                      <span>{estimate.dimensions.width} × {estimate.dimensions.height} mm</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Area per panel</span>
                      <span>{estimate.areaPerPanel} sq.ft</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Total panels</span>
                      <span>{estimate.totalPanels}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Total area</span>
                      <span style={{ fontWeight: 600 }}>{estimate.totalArea} sq.ft</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Rate</span>
                      <span>₹{estimate.ratePerSqFt}/sq.ft</span>
                    </div>
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}>
                    <span>Glass Cost</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>₹{estimate.glassCost.toLocaleString()}</span>
                  </div>

                  {/* Allied Products */}
                  {estimate.alliedProducts?.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        Suggested Add-ons:
                      </div>
                      {estimate.alliedProducts.slice(0, 3).map((ap, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.82rem',
                          padding: '4px 0',
                        }}>
                          <span style={{ color: 'var(--text-secondary)' }}>
                            <CheckCircle size={12} style={{ color: 'var(--accent-emerald)', marginRight: '4px' }} />
                            {ap.name}
                          </span>
                          <span>₹{ap.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                  }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--accent-emerald)' }}>₹{estimate.totalWithAllied.toLocaleString()}</span>
                  </div>

                  {estimate.vendor && (
                    <div style={{
                      padding: '10px',
                      background: 'var(--glass-bg)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.82rem',
                    }}>
                      <div style={{ color: 'var(--text-secondary)' }}>Vendor: <strong style={{ color: 'var(--text-primary)' }}>{estimate.vendor.name}</strong></div>
                      <div style={{ color: 'var(--text-secondary)' }}>Delivery: {estimate.vendor.delivery}</div>
                    </div>
                  )}

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Valid until: {estimate.validUntil}
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => window.print()}
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    <Printer size={16} /> Print Estimate
                  </button>

                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {estimate.disclaimer}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #estimate-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
