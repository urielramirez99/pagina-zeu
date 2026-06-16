import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { headerStyles } from './styles.js';
import Inicio from './screens/InicioScreen.jsx';
import Catalogo from './screens/CatalogoScreen.jsx';
import AdminPanel from './screens/AdminPanelScreen.jsx';
import Login from './screens/LoginScreen.jsx';
import { useEffect, useState } from 'react';


function App() {
  // Estado para guardar el token del administrador
  const [token, setToken] = useState(null);

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

  return (
    <Router>
      <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', margin: 0 }}>
        
        {/* HEADER */}
        <header style={headerStyles.container}>
          <Link to="/" style={headerStyles.logo}>
            <h1>Zeus Import</h1>
          </Link>
          
          <nav style={headerStyles.nav}>
            <Link to="/" style={headerStyles.link}>Inicio</Link>
            <Link to="/catalogo" style={headerStyles.link}>Catálogo</Link>
            <Link to="/admin" style={headerStyles.linkAdmin}>Admin ⚙️</Link>
            
            {/* Si está logueado, le mostramos el botón de cerrar sesión */}
            {token && (
              <button onClick={cerrarSesion} style={{ 
                background: 'none', border: '1px solid #e74c3c', color: '#e74c3c', 
                borderRadius: '4px', cursor: 'pointer', padding: '5px 10px' 
              }}>
                Salir
              </button>
            )}
          </nav>
        </header>

        {/* CONTENEDOR DE RUTAS */}
        <main style={{ padding: '40px' }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            
            {/* Si tiene token ve el panel, si no, ve el login */}
            <Route path="/admin" element={
              token ? <AdminPanel /> : <Login alLoguearse={setToken} />
            } />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;