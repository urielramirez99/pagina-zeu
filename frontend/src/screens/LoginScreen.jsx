import { useState } from 'react';
import '../styles/Login.css';
import { CONFIG } from '../config/config.js';

const Login = ({ alLoguearse }) => {
  const [credenciales, setCredenciales] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.mensaje || 'Error al iniciar sesión');

      // Si las credenciales son válidas, guardamos el token en LocalStorage
      localStorage.setItem('token_zeus', data.token);
      localStorage.setItem('usuario_zeus', data.usuario);

      // Le avisamos al componente padre que el login fue exitoso
      alLoguearse(data.token);

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Panel de Control Admin</h2>
      
      {error && (
        <div style={{ padding: '10px', marginBottom: '15px', color: 'white', backgroundColor: '#e74c3c', borderRadius: '4px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Usuario:
          <input type="text" name="usuario" value={credenciales.usuario} onChange={handleChange} required className="login-input" />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={credenciales.password} onChange={handleChange} required className="login-input" />
        </label>
        <button type="submit" disabled={cargando} className="login-button">
          {cargando ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;