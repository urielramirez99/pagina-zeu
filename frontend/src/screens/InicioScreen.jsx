import { Link } from 'react-router-dom';
// IMPORTAMOS LOS ESTILOS DE INICIO
import { inicioStyles } from '../styles.js'; 

const Inicio = () => {
  return (
    <div style={inicioStyles.container}>
      <h1 style={inicioStyles.titulo}>Bienvenidos a Zeus Import</h1>
      <p style={inicioStyles.texto}>
        Descubre nuestra exclusiva colección de fragancias y perfumes importados. 
        Encuentra el aroma perfecto que define tu estilo y personalidad con la mejor calidad del mercado.
      </p>
      
      <Link to="/catalogo" style={inicioStyles.boton}>
        Ver Catálogo Completo 🛍️
      </Link>
    </div>
  );
};

export default Inicio;