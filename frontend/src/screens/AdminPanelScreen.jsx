import { useState, useEffect } from 'react';
import { adminStyles } from '../styles.js';

const AdminPanel = () => {
  // Estado para el formulario
  const [producto, setProducto] = useState({
    nombre: '',
    marca: '',
    precio: '',
    descripcion: '',
    stock: '',
    imagenUrl: '',
    categoria: ''
  });

  // Estado para listar los productos en el panel
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const API_URL = 'http://localhost:5000/api/products';

  // Traer productos para el panel de administración
  const obtenerProductosAdmin = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setListaProductos(data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductosAdmin();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Crear un producto (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      const response = await fetch(API_URL, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token_zeus')}` // <-- AGREGA ESTO
  },
  body: JSON.stringify(producto)
});

      const data = await response.json();

      if (!response.ok) throw new Error(data.mensaje || 'Error al crear');

      setMensaje({ texto: `¡Perfume "${data.nombre}" agregado!`, tipo: 'exito' });
      setProducto({ nombre: '', marca: '', precio: '', descripcion: '', stock: '', imagenUrl: '', categoria: '' });
      
      // Recargar la lista inmediatamente
      obtenerProductosAdmin();
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' });
    } finally {
      setCargando(false);
    }
  };

  // Eliminar un producto (DELETE)
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este perfume del catálogo?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
           'Authorization': `Bearer ${localStorage.getItem('token_zeus')}` 
  }
});

      if (!response.ok) throw new Error('No se pudo eliminar el producto');

      setMensaje({ texto: 'Producto eliminado correctamente', tipo: 'exito' });
      // Refrescar lista filtrando el eliminado del estado para que sea instantáneo
      setListaProductos(listaProductos.filter(prod => prod._id !== id));
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* SECCIÓN DEL FORMULARIO */}
      <div style={adminStyles.container}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', margin: '0 0 20px 0' }}>Panel Admin</h2>
        
        {mensaje.texto && (
          <div style={{ 
            padding: '10px', marginBottom: '15px', color: 'white', borderRadius: '4px', textAlign: 'center',
            backgroundColor: mensaje.tipo === 'exito' ? '#2ecc71' : '#e74c3c'
          }}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} style={adminStyles.formulario}>
          <label>Nombre:
            <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} required style={adminStyles.input} />
          </label>
          <label>Marca:
            <input type="text" name="marca" value={producto.marca} onChange={handleChange} required style={adminStyles.input} />
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <label style={{ flex: 1 }}>Precio ($):
              <input type="number" name="precio" value={producto.precio} onChange={handleChange} required min="0" step="0.01" style={adminStyles.input} />
            </label>
            <label style={{ flex: 1 }}>Stock:
              <input type="number" name="stock" value={producto.stock} onChange={handleChange} required min="0" style={adminStyles.input} />
            </label>
          </div>
          <label>Categoría:
            <input type="text" name="categoria" value={producto.categoria} onChange={handleChange} style={adminStyles.input} />
          </label>
          <label>URL Imagen:
            <input type="url" name="imagenUrl" value={producto.imagenUrl} onChange={handleChange} required style={adminStyles.input} />
          </label>
          <label>Descripción:
            <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} rows="3" style={adminStyles.input}></textarea>
          </label>
          <button type="submit" disabled={cargando} style={adminStyles.botonSubmit}>
            {cargando ? 'Guardando...' : 'Agregar Producto'}
          </button>
        </form>
      </div>

      {/* SECCIÓN DE LA TABLA / GESTIÓN */}
      <div style={{ marginTop: '5px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Inventario Actual</h3>
        
        {listaProductos.length === 0 ? (
          <p>No tienes productos registrados en la base de datos.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd', color: '#7f8c8d' }}>
                <th style={{ padding: '10px 5px' }}>Imagen</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaProductos.map((prod) => (
                <tr key={prod._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 5px' }}>
                    <img src={prod.imagenUrl} alt={prod.nombre} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td>
                    <strong>{prod.nombre}</strong><br />
                    <span style={{ fontSize: '12px', color: '#95a5a6' }}>{prod.marca}</span>
                  </td>
                  <td>${prod.precio}</td>
                  <td>{prod.stock} u.</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => handleEliminar(prod._id)} 
                      style={{ padding: '6px 12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default AdminPanel;