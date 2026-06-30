import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Inicio from './screens/InicioScreen.jsx';
import Catalogo from './screens/CatalogoScreen.jsx';
import AdminPanel from './screens/AdminPanelScreen.jsx';
import Login from './screens/LoginScreen.jsx';
import { useEffect, useState } from 'react';
import CartScreen from './screens/CartScreen.jsx';
import { useCart } from './context/CartContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Header.css';

function App() {
  // Estado para guardar el token del administrador
  const [token, setToken] = useState(null);

  // estado para el header ; celu y pc
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Al cargar la app por primera vez, verificamos si ya había un token guardado
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token_zeus');
    if (tokenGuardado) {
      setToken(tokenGuardado);
    }
  }, []);

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token_zeus');
    localStorage.removeItem('usuario_zeus');
    setToken(null);
  };

const { cart } = useCart();

const cantidadProductos = cart.reduce(
  (acc, item) => acc + item.cantidad,
  0
);

console.log("menu:", menuAbierto);

  return (
    <Router>
      <div /* style={{ backgroundColor: '#fafafa', minHeight: '100vh', margin: 0 }} */>
        
        {/* HEADER */}
        <header className="header">

  <Link to="/" className="logo">
    <h1>Zeus Import</h1>
  </Link>

  <button
    className="menu-button"
    onClick={() => {
      console.log("antes:", menuAbierto);
      setMenuAbierto(!menuAbierto)
    }}
  >
    ☰
  </button>

  <nav
    className={`nav ${menuAbierto ? 'nav-open' : ''}`}
  >

    <Link
      to="/"
      className="nav-link"
      onClick={() => setMenuAbierto(false)}
    >
      Inicio
    </Link>

    <Link
      to="/catalogo"
      className="nav-link"
      onClick={() => setMenuAbierto(false)}
    >
      Catálogo
    </Link>

    <Link
      to="/admin"
      className="nav-link"
      onClick={() => setMenuAbierto(false)}
    >
      Admin ⚙️
    </Link>

    <Link
      to="/carrito"
      className="cart-link"
      onClick={() => setMenuAbierto(false)}
    >
      🛒

      {cantidadProductos > 0 && (
        <span className="cart-badge">
          {cantidadProductos}
        </span>
      )}
    </Link>

    {token && (
      <button
        onClick={cerrarSesion}
        className="logout-btn"
      >
        Salir
      </button>
    )}

  </nav>

        </header>

        {/* CONTENEDOR DE RUTAS */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<CartScreen />} />
            
            {/* Si tiene token ve el panel, si no, ve el login */}
            <Route path="/admin" element={
              token ? <AdminPanel /> : <Login alLoguearse={setToken} />
            } />
          </Routes>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          />

      </div>
    </Router>
  );
}

export default App;