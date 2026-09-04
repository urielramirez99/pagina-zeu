import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { CONFIG } from '../config/config.js';
import { toast } from 'react-toastify';
import Footer from '../components/Footer.jsx';
import '../styles/detalle.css';
import ProductosSimilares from '../components/ProductosSimilares.jsx';

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, agregarAlCarrito, aumentarCantidad, disminuirCantidad } = useCart();

  const [perfume, setPerfume] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        setCargando(true);
        setError(null);
        const response = await fetch(`${CONFIG.API_URL}/products/${id}`);
        if (!response.ok) throw new Error('No se encontró la fragancia');
        const data = await response.json();
        setPerfume(data);
      } catch (err) {
        console.error('Error al cargar detalle:', err);
        setError('No se pudo obtener la información de esta fragancia.');
      } finally {
        setCargando(false);
      }
    };

    obtenerDetalle();
  }, [id]);

  if (cargando) {
    return (
      <div className="catalogo-state-container">
        <div className="spinner"></div>
        <p>Cargando información del perfume...</p>
      </div>
    );
  }

  if (error || !perfume) {
    return (
      <div className="catalogo-state-container">
        <p className="error-message">{error || 'Producto no encontrado'}</p>
        <button onClick={() => navigate('/catalogo')} className="btn-back">
          ← Volver al catálogo
        </button>
      </div>
    );
  }

  const productoEnCarrito = cart.find((item) => item._id === perfume._id);
  const estaAgotado = perfume.stock <= 0;
  const alcanzoLimiteStock = productoEnCarrito && productoEnCarrito.cantidad >= perfume.stock;

  const handleAgregar = () => {
    agregarAlCarrito(perfume);
    toast.success(`${perfume.nombre} agregado al carrito`);
  };

  return (
    <div className="detail-page-wrapper">
      <div className="detail-page-container">
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Volver al catálogo
        </button>

        <div className="detail-card">
          <div className="detail-image-wrapper">
            <img src={perfume.imagenUrl} alt={perfume.nombre} className="detail-image" />
            {estaAgotado && <span className="badge-out">Agotado</span>}
          </div>

          <div className="detail-info">
            <span className="product-brand-tag">{perfume.marca}</span>
            <h1 className="detail-title">{perfume.nombre}</h1>
            
            <div className="detail-price-row">
              <span className="detail-price">
                ${perfume.precio?.toLocaleString('es-AR')}
              </span>
              <span className={`stock-status ${estaAgotado ? 'stock-out' : 'stock-in'}`}>
                {estaAgotado ? 'Sin Stock' : `${perfume.stock} disp.`}
              </span>
            </div>

            <div className="detail-section">
              <h3 className="section-subtitle">Descripción</h3>
              <p className="detail-description">{perfume.descripcion}</p>
            </div>

            <div className="detail-actions">
              {productoEnCarrito ? (
                <div className="quantity-controls-detail">
                  <button onClick={() => disminuirCantidad(perfume._id)} className="btn-qty-detail">
                    -
                  </button>
                  <span className="qty-number-detail">{productoEnCarrito.cantidad}</span>
                  <button 
                    onClick={() => aumentarCantidad(perfume._id)} 
                    disabled={alcanzoLimiteStock} 
                    className="btn-qty-detail"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAgregar}
                  disabled={estaAgotado}
                  className="add-cart-btn-detail"
                >
                  {estaAgotado ? 'Sin stock' : 'Agregar al carrito'}
                </button>
              )}
            </div>
          </div>
        </div>
        <ProductosSimilares productoActualId={perfume._id} />
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailScreen;