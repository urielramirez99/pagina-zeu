import { useState, useEffect } from 'react';
import { catalogoStyles } from '../styles.js'; 

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const API_URL = 'http://localhost:5000/api/products';

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al traer los perfumes:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  if (cargando) return <p style={{ textAlign: 'center' }}>Cargando fragancias...</p>;
  if (productos.length === 0) return <p style={{ textAlign: 'center' }}>No hay perfumes disponibles.</p>;

  return (
    <div style={catalogoStyles.container}>
      <h2 style={catalogoStyles.titulo}>Nuestro Catálogo</h2>
      
      <div style={catalogoStyles.grilla}>
        {productos.map((perfume) => (
          <div key={perfume._id} style={catalogoStyles.card}>
            <img 
              src={perfume.imagenUrl} 
              alt={perfume.nombre} 
              style={catalogoStyles.imagen} 
            />
            <div style={catalogoStyles.infoContainer}>
              <span style={catalogoStyles.marca}>{perfume.marca}</span>
              <h4 style={catalogoStyles.nombre}>{perfume.nombre}</h4>
              <p style={catalogoStyles.descripcion}>{perfume.descripcion}</p>
              
              <div style={catalogoStyles.footerCard}>
                <span style={catalogoStyles.precio}>${perfume.precio}</span>
                <span style={{ 
                  fontSize: '12px', 
                  color: perfume.stock > 0 ? '#27ae60' : '#c0392b',
                  fontWeight: 'bold' 
                }}>
                  {perfume.stock > 0 ? `${perfume.stock} disp.` : 'Agotado'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;