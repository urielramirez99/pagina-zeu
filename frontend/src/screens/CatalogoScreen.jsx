import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { CONFIG } from '../config/config.js';
import { toast } from 'react-toastify';
import '../styles/Catalogo.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
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
        const response = await fetch(API_URL);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al traer los perfumes:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) {
    return (
      <p style={{ textAlign: 'center' }}>
        Cargando fragancias...
      </p>
    );
  }

  if (productos.length === 0) {
    return (
      <p style={{ textAlign: 'center' }}>
        No hay perfumes disponibles.
      </p>
    );
  }

  const agregarProducto = (perfume) => {
  agregarAlCarrito(perfume);

  toast.success(
    `${perfume.nombre} agregado al carrito`
  );
};

const productosFiltrados = productos.filter((producto) =>
  producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  producto.marca.toLowerCase().includes(busqueda.toLowerCase())
);

  return (
    <div className='catalogo-container'>
      <h2 className='catalogo-title'>
        Nuestro Catálogo
      </h2>

      <input
        type="text"
        placeholder="🔍 Buscar perfume o marca..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className='search-input'
        />

    {productosFiltrados.length === 0 && (
    <p
    style={{
      textAlign: 'center',
      marginBottom: '20px'
    }}>
    No se encontraron perfumes.
    </p>
    )}

      <div className='catalogo-grid'>
        {productosFiltrados.map((perfume) => {
          const productoEnCarrito = cart.find(
            item => item._id === perfume._id
          );

          return (
            <div
              key={perfume._id}
              className='product-card'
            >
              <img
                src={perfume.imagenUrl}
                alt={perfume.nombre}
                className="product-image"
              />

              <div className='product-info'>
                <span className="product-brand" >
                  {perfume.marca}
                </span>

                <h4 className="product-name">
                  {perfume.nombre}
                </h4>

                <p className="product-description">
                  {perfume.descripcion}
                </p>

                <div className="product-footer">
                  <span className="product-price">
                    ${perfume.precio}
                  </span>

                  <span
                    style={{
                      fontSize: '12px',
                      color:
                        perfume.stock > 0
                          ? '#27ae60'
                          : '#c0392b',
                      fontWeight: 'bold'
                    }}
                  >
                    {perfume.stock > 0
                      ? `${perfume.stock} disp.`
                      : 'Agotado'}
                  </span>
                </div>

                {productoEnCarrito ? (
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        disminuirCantidad(perfume._id)
                      }
                      style={{
                        padding: '5px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>

                    <span
                      style={{
                        fontWeight: 'bold',
                        fontSize: '16px'
                      }}
                    >
                      {productoEnCarrito.cantidad}
                    </span>

                    <button
                      onClick={() =>
                        aumentarCantidad(perfume._id)
                      }
                      style={{
                        padding: '5px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      agregarProducto(perfume)
                    }
                    disabled={perfume.stock <= 0}
                    className="add-cart-btn"
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalogo;