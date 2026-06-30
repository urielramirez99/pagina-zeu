import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config/config.js';
import '../styles/Inicio.css';

const Inicio = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const obtenerDestacados = async () => {
      try {
        const response = await fetch(`${CONFIG.API_URL}/products`);
        const data = await response.json();

        setDestacados(data.slice(0, 4));
      } catch (error) {
        console.error('Error al cargar destacados:', error);
      }
    };

    obtenerDestacados();
  }, []);

  const mensajeWhatsApp = encodeURIComponent(
    'Hola Zeus Import, quiero consultar por una fragancia.'
  );

  return (
    <div className="inicio-page">

      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">Perfumes importados originales</span>

          <h1 className="hero-title">
            Elegí una fragancia que hable por vos
          </h1>

          <p className="hero-text">
            Perfumes originales, aromas intensos y marcas seleccionadas para
            cada estilo. Comprá fácil, rápido y con atención personalizada.
          </p>

          <div className="hero-buttons">
            <Link to="/catalogo" className="hero-btn">
              Ver catálogo
            </Link>

            <a
              href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${mensajeWhatsApp}`}
              target="_blank"
              rel="noreferrer"
              className="hero-btn-secondary"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <div className="hero-info">
            <span>100% originales</span>
            <span>Envíos al país</span>
            <span>Compra rápida</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>🚚</h2>
          <h3>Envíos a todo el país</h3>
          <p>Recibí tus fragancias donde estés.</p>
        </div>

        <div className="feature-card">
          <h2>✅</h2>
          <h3>Productos originales</h3>
          <p>Garantía de autenticidad en cada compra.</p>
        </div>

        <div className="feature-card">
          <h2>💬</h2>
          <h3>Atención personalizada</h3>
          <p>Te ayudamos a elegir el perfume ideal.</p>
        </div>
      </section>

      {destacados.length > 0 && (
        <section className="featured-products">
          <div className="section-header">
            <span>Selección Zeus Import</span>
            <h2>Fragancias destacadas</h2>
          </div>

          <div className="featured-grid">
            {destacados.map((perfume) => (
              <Link
                to="/catalogo"
                key={perfume._id}
                className="featured-card"
              >
                <img src={perfume.imagenUrl} alt={perfume.nombre} />

                <div>
                  <span>{perfume.marca}</span>
                  <h3>{perfume.nombre}</h3>
                  <p>${perfume.precio}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="brands">
        <div className="section-header">
          <span>Marcas reconocidas</span>
          <h2>Marcas destacadas</h2>
        </div>

        <div className="brand-grid">
          <span>Dior</span>
          <span>Versace</span>
          <span>Jean Paul Gaultier</span>
          <span>Paco Rabanne</span>
          <span>Armaf</span>
          <span>Lattafa</span>
        </div>
      </section>

      <section className="home-cta">
        <h2>¿Buscás una fragancia especial?</h2>
        <p>
          Explorá el catálogo completo o escribinos para recibir una recomendación.
        </p>

        <Link to="/catalogo">
          Ir al catálogo
        </Link>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Zeus Import</h2>
            <p>
              Perfumes importados originales, seleccionados para quienes buscan
              calidad, presencia y estilo.
            </p>
          </div>

          <div className="footer-links">
            <h3>Navegación</h3>
            <Link to="/">Inicio</Link>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/carrito">Carrito</Link>
          </div>

          <div className="footer-contact">
            <h3>Contacto</h3>
            <a
              href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${mensajeWhatsApp}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <span>Envíos a todo el país</span>
            <span>Atención personalizada</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Zeus Import. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
};

export default Inicio;