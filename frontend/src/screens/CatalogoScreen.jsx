import { useState, useEffect, useMemo } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { CONFIG } from '../config/config.js';
import { toast } from 'react-toastify';
import '../styles/catalogo.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const {
    cart,
    agregarAlCarrito,
    aumentarCantidad,
    disminuirCantidad
  } = useCart();

  const API_URL = `${CONFIG.API_URL}/products`;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        console.error('Error al traer los perfumes:', err);
        setError('No se pudieron cargar los productos. Intenta nuevamente.');
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [API_URL]);

  // Memorizar el filtrado para mejorar rendimiento
  const productosFiltrados = useMemo(() => {
    const termino = busqueda.toLowerCase().trim();
    if (!termino) return productos;

    return productos.filter((producto) =>
      producto.nombre?.toLowerCase().includes(termino) ||
      producto.marca?.toLowerCase().includes(termino)
    );
  }, [productos, busqueda]);

  const agregarProducto = (perfume) => {
    agregarAlCarrito(perfume);
    toast.success(`${perfume.nombre} agregado al carrito`);
  };

  if (cargando) {
    return (
      <div className="catalogo-state-container">
        <div className="spinner"></div>
        <p>Cargando fragancias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogo-state-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="catalogo-container">
      <h2 className="catalogo-title">Nuestro Catálogo</h2>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o marca..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron perfumes que coincidan con "{busqueda}".</p>
        </div>
      ) : (
        <div className="catalogo-grid">
          {productosFiltrados.map((perfume) => {
            const productoEnCarrito = cart.find(
              (item) => item._id === perfume._id
            );
            const estaAgotado = perfume.stock <= 0;
            const alcanzoLimiteStock = productoEnCarrito && productoEnCarrito.cantidad >= perfume.stock;

            return (
              <div key={perfume._id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={perfume.imagenUrl}
                    alt={perfume.nombre}
                    className="product-image"
                    loading="lazy"
                  />
                  {estaAgotado && <span className="badge-out">Agotado</span>}
                </div>

                <div className="product-info">
                  <span className="product-brand">{perfume.marca}</span>
                  <h4 className="product-name" title={perfume.nombre}>
                    {perfume.nombre}
                  </h4>
                  <p className="product-description">{perfume.descripcion}</p>

                  <div className="product-footer">
                    <span className="product-price">
                      ${perfume.precio?.toLocaleString('es-AR')}
                    </span>

                    <span className={`stock-status ${estaAgotado ? 'stock-out' : 'stock-in'}`}>
                      {estaAgotado ? 'Sin Stock' : `${perfume.stock} disp.`}
                    </span>
                  </div>

                  {productoEnCarrito ? (
                    <div className="quantity-controls">
                      <button
                        onClick={() => disminuirCantidad(perfume._id)}
                        className="btn-qty"
                      >
                        -
                      </button>

                      <span className="qty-number">
                        {productoEnCarrito.cantidad}
                      </span>

                      <button
                        onClick={() => aumentarCantidad(perfume._id)}
                        disabled={alcanzoLimiteStock}
                        className="btn-qty"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => agregarProducto(perfume)}
                      disabled={estaAgotado}
                      className="add-cart-btn"
                    >
                      {estaAgotado ? 'Sin stock' : 'Agregar al carrito'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Catalogo;