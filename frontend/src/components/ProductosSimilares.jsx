import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../config/config.js';
import '../styles/similares.css';

const ProductosSimilares = ({ productoActualId }) => {
  const [similares, setSimilares] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilares = async () => {
      if (!productoActualId) return;

      try {
        setCargando(true);
        const res = await fetch(`${CONFIG.API_URL}/products/${productoActualId}/similares`);
        
        if (res.ok) {
          const data = await res.json();
          setSimilares(data);
        }
      } catch (error) {
        console.error('Error al cargar perfumes similares:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchSimilares();
  }, [productoActualId]);

  if (cargando || similares.length === 0) {
    return null; // Oculta la sección si no hay datos o sigue cargando
  }

  return (
    <section className="similar-products-section">
      <h2 className="similar-title">También te podría gustar:</h2>
      <div className="similar-grid">
        {similares.map((item) => (
          <div
            key={item._id}
            className="similar-card"
            onClick={() => navigate(`/producto/${item._id}`)}
          >
            <div className="similar-img-wrapper">
              <img src={item.imagenUrl} alt={item.nombre} className="similar-img" />
            </div>
            <div className="similar-info">
              <span className="similar-brand">{item.marca}</span>
              <h3 className="similar-name">{item.nombre}</h3>
              <p className="similar-price">
                ${item.precio?.toLocaleString('es-AR')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductosSimilares;