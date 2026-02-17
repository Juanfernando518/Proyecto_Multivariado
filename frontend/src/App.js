import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState("computadoras cientificas");
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState(false);
  const [numPapers, setNumPapers] = useState(4);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/search?query=${query}&recent=${recent}&k=${numPapers}`);
      if (!response.ok) throw new Error('Error en el servidor');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      alert("Error: Asegúrate de que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  // Función para dar color al score (Verde si es alto, Rojo si es bajo)
  const getScoreStyle = (score) => {
    if (score > 0.1) return { color: '#28a745', fontWeight: 'bold' }; // Verde
    if (score < 0) return { color: '#dc3545' }; // Rojo
    return { color: '#6c757d' }; // Gris
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#343a40', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>🔍 Academic Search Engine</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
          <div>
            <strong>Query: </strong>
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da', marginTop: '5px' }}
              placeholder="Ej: Artificial Intelligence..."
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
            <div>
              <strong># Papers: </strong>
              <input 
                type="number" value={numPapers} onChange={(e) => setNumPapers(e.target.value)} 
                min="1" max="20"
                style={{ width: '60px', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
              />
            </div>
            <label style={{ cursor: 'pointer', paddingBottom: '10px' }}>
              <input type="checkbox" checked={recent} onChange={() => setRecent(!recent)} /> 
              <span style={{ marginLeft: '8px' }}>Ordenar por Recientes</span>
            </label>
          </div>
        </div>

        <button 
          onClick={handleSearch} 
          disabled={loading}
          style={{ 
            width: '100%', background: loading ? '#6c757d' : '#007bff', color: 'white', 
            border: 'none', padding: '12px', cursor: 'pointer', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold' 
          }}
        >
          {loading ? 'Buscando...' : 'Realizar Búsqueda Semántica'}
        </button>

        <div style={{ marginTop: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#343a40', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Título del Paper</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Revista (Venue)</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Año</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Similitud</th>
              </tr>
            </thead>
            <tbody>
              {results.map((paper, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #dee2e6', transition: '0.3s' }} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f3f5'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '15px', fontWeight: '500' }}>{paper.title}</td>
                  <td style={{ padding: '15px' }}><span style={{ background: '#e9ecef', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{paper.venue}</span></td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={paper.year >= 2023 ? { background: '#fff3cd', padding: '4px 8px', borderRadius: '4px' } : {}}>
                      {paper.year}
                    </span>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center', ...getScoreStyle(paper.score) }}>
                    {(paper.score * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;