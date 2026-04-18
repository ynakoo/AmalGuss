import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { aiAPI } from '../services/api';
import { useRole } from '../context/RoleContext';
import { Sparkles, Send, ArrowRight, Eye, FileText, Bot, User, Loader2 } from 'lucide-react';

const EXAMPLE_QUERIES = [
  'I need glass for my bathroom shower enclosure',
  'Soundproof glass for my office cabin',
  'Glass railing for my balcony on 15th floor',
  'Energy efficient glass for my south-facing facade',
  'Decorative glass for kitchen backsplash',
  'Privacy glass for conference room partition',
];

export default function SmartMatchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      handleSubmit(null, q);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e, overrideQuery) => {
    if (e) e.preventDefault();
    const query = overrideQuery || input.trim();
    if (!query || loading) return;

    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: query }]);
    setLoading(true);

    try {
      const res = await aiAPI.match(query, role || 'homeowner');
      setMessages(prev => [...prev, {
        type: 'ai',
        recommendation: res.data.recommendation,
        matchedProducts: res.data.matchedProducts,
        alliedSuggestions: res.data.alliedSuggestions,
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'Sorry, I had trouble processing that request. Please try again or rephrase your question.',
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="section" style={{ paddingTop: '24px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'rgba(139, 92, 246, 0.15)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
            color: 'var(--accent-purple)',
          }}>
            <Sparkles size={28} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Outfit', marginBottom: '6px' }}>
            AI Glass Expert
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Describe your project and I'll recommend the perfect glass
          </p>
        </div>

        {/* Chat Area */}
        <div className="glass-card-static" style={{
          padding: '24px',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '24px',
        }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Try one of these queries:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
                  {EXAMPLE_QUERIES.map(q => (
                    <button
                      key={q}
                      onClick={() => handleSubmit(null, q)}
                      style={{
                        padding: '10px 16px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                      onMouseEnter={e => {
                        e.target.style.borderColor = 'var(--accent-purple)';
                        e.target.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={e => {
                        e.target.style.borderColor = 'var(--glass-border)';
                        e.target.style.color = 'var(--text-secondary)';
                      }}
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: '16px',
                display: 'flex',
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                gap: '10px',
              }}>
                {msg.type !== 'user' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: msg.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Bot size={16} color={msg.type === 'error' ? '#ef4444' : '#8b5cf6'} />
                  </div>
                )}

                <div style={{
                  maxWidth: '85%',
                }}>
                  {msg.type === 'user' && (
                    <div style={{
                      background: 'var(--gradient-accent)',
                      padding: '12px 18px',
                      borderRadius: '16px 16px 4px 16px',
                      color: 'white',
                      fontSize: '0.9rem',
                    }}>
                      {msg.content}
                    </div>
                  )}

                  {msg.type === 'error' && (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      padding: '12px 18px',
                      borderRadius: '4px 16px 16px 16px',
                      color: 'var(--accent-red)',
                      fontSize: '0.9rem',
                    }}>
                      {msg.content}
                    </div>
                  )}

                  {msg.type === 'ai' && msg.recommendation && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Main Recommendation */}
                      <div style={{
                        background: 'rgba(139, 92, 246, 0.08)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '4px 16px 16px 16px',
                        padding: '20px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                          <span style={{ fontSize: '1.2rem' }}>🎯</span>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                            {msg.recommendation.thickness} {msg.recommendation.glassType}
                          </h4>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                          <span className="badge badge-purple">{msg.recommendation.process}</span>
                          <span className="badge badge-emerald">{msg.recommendation.priceRange}</span>
                        </div>

                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '10px' }}>
                          {msg.recommendation.reasoning}
                        </p>

                        {msg.recommendation.safetyNotes && (
                          <div style={{
                            background: 'rgba(239, 68, 68, 0.06)',
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-xs)',
                            fontSize: '0.82rem',
                            color: 'var(--text-secondary)',
                            border: '1px solid rgba(239, 68, 68, 0.1)',
                          }}>
                            🛡️ {msg.recommendation.safetyNotes}
                          </div>
                        )}

                        {msg.recommendation.alternatives?.length > 0 && (
                          <div style={{ marginTop: '12px' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Alternatives:</p>
                            {msg.recommendation.alternatives.map((alt, j) => (
                              <div key={j} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                • <strong>{alt.glassType}</strong> — {alt.reason}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Matched Products */}
                      {msg.matchedProducts?.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {msg.matchedProducts.slice(0, 2).map(p => (
                            <button
                              key={p.id}
                              className="btn btn-secondary btn-sm"
                              onClick={() => navigate(`/product/${p.id}`)}
                              style={{ fontSize: '0.8rem' }}
                            >
                              <Eye size={14} /> View {p.glassType}
                            </button>
                          ))}
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              const pid = msg.matchedProducts[0]?.id;
                              if (pid) navigate(`/estimate?product=${pid}`);
                            }}
                            style={{ fontSize: '0.8rem' }}
                          >
                            <FileText size={14} /> Get Estimate
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {msg.type === 'user' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(59, 130, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <User size={16} color="#3b82f6" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(139, 92, 246, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Bot size={16} color="#8b5cf6" />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  background: 'rgba(139, 92, 246, 0.08)',
                  borderRadius: '4px 16px 16px 16px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                }}>
                  <Loader2 size={16} style={{ animation: 'spin-slow 1s linear infinite' }} />
                  Analyzing your requirement...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: '10px',
            borderTop: '1px solid var(--glass-border)',
            paddingTop: '16px',
          }}>
            <input
              className="input"
              type="text"
              placeholder="Describe your glass requirement..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !input.trim()}
              style={{ opacity: loading || !input.trim() ? 0.5 : 1 }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
