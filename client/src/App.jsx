import { useState } from 'react';
import axios from 'axios';
import './App.css';

function Spinner({ size = 18, color = '#fff' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      style={{ verticalAlign: 'middle', marginRight: 8 }}
      aria-hidden
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 25 25;360 25 25"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default function App() {
  const [pong, setPong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPing = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/ping');
      setPong(response.data.pong);
    } catch (err) {
      setError('Error: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    padding: '2rem',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: 820,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))',
    borderRadius: 14,
    padding: '2.25rem',
    boxShadow: '0 10px 30px rgba(2,6,23,0.6)',
    border: '1px solid rgba(255,255,255,0.04)',
    color: 'var(--text, #e6eef8)',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2.8rem',
    margin: 0,
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.05,
  };

  const subtitleStyle = {
    marginTop: 8,
    marginBottom: 18,
    color: 'var(--muted, #98a0b3)',
    fontSize: '1rem',
  };

  const btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '0.6rem 1rem',
    borderRadius: 10,
    background: loading ? 'linear-gradient(90deg,#444,#222)' : 'linear-gradient(90deg,#7c5cff,#5a4bff)',
    color: '#fff',
    border: 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    boxShadow: loading ? 'none' : '0 8px 20px rgba(92,67,255,0.18)',
    fontWeight: 600,
    fontSize: '0.98rem',
  };

  const responseBox = {
    marginTop: 20,
    padding: '1rem',
    borderRadius: 10,
    background: 'rgba(0,0,0,0.25)',
    border: '1px solid rgba(255,255,255,0.03)',
    textAlign: 'left',
    wordBreak: 'break-all',
  };

  const responseLabel = { margin: 0, fontSize: '1rem', color: 'var(--muted, #98a0b3)' };
  const responseText = { marginTop: 8, color: '#4dd0e1', fontWeight: 700, fontSize: '1.05rem' };
  const errorStyle = { marginTop: 12, color: '#ff6b6b', fontWeight: 600 };

  return (
    <div style={containerStyle}>
      <main style={cardStyle} role="main">
        <h1 style={titleStyle}>MERN Render</h1>
        <div style={subtitleStyle}>Render Autoaprendizaje</div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={fetchPing}
            disabled={loading}
            style={btnStyle}
            aria-busy={loading}
            aria-label="Obtener respuesta del servidor"
          >
            {loading && <Spinner />}
            {loading ? 'Cargando...' : 'Obtener Users'}
          </button>
        </div>

        {error && <div style={errorStyle} role="alert">{error}</div>}

        {pong && (
          <section style={responseBox} aria-live="polite">
            <p style={responseLabel}>Respuesta del Servidor:</p>
            <pre style={responseText}>{`"pong": "${pong}"`}</pre>
          </section>
        )}

        <footer style={{ marginTop: 18, color: 'var(--muted, #98a0b3)', fontSize: '0.9rem' }}>
          <span>Servidor local en http://localhost:3000</span>
        </footer>
      </main>
    </div>
  );
}
