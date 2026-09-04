import React from 'react'
import "../styles/inicio.css"
import { CONFIG } from '../config/config.js';
import { Link } from 'react-router-dom';

const Footer = () => {
	const mensajeWhatsApp = encodeURIComponent(
    'Hola Zeus Import, quiero consultar por una fragancia.'
  );
  return (
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

  )
}

export default Footer