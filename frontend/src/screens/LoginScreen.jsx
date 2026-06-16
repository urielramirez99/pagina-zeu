import { useState } from 'react';
import { loginStyles } from '../styles.js';

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
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
    <div style={loginStyles.container}>
      <h2 style={loginStyles.titulo}>Panel de Control Admin</h2>
      
      {error && (
        <div style={{ padding: '10px', marginBottom: '15px', color: 'white', backgroundColor: '#e74c3c', borderRadius: '4px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={loginStyles.formulario}>
        <label>
          Usuario:
          <input type="text" name="usuario" value={credenciales.usuario} onChange={handleChange} required style={loginStyles.input} />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={credenciales.password} onChange={handleChange} required style={loginStyles.input} />
        </label>
        <button type="submit" disabled={cargando} style={loginStyles.boton}>
          {cargando ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;