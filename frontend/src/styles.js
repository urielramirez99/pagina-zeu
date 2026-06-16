// Archivo centralizado de estilos para Zeus Import

export const headerStyles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#2c3e50',
    color: 'white'
  },
  logo: {
    margin: 0,
    fontSize: '24px',
    textDecoration: 'none',
    color: 'white'
  },
  nav: {
    display: 'flex',
    gap: '20px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '5px 10px'
  },
  linkAdmin: {
    color: '#f1c40f',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '5px 10px'
  }
};

export const inicioStyles = {
  container: {
    textAlign: 'center',
    padding: '60px 20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  titulo: {
    fontSize: '48px',
    color: '#2c3e50',
    marginBottom: '20px'
  },
  texto: {
    fontSize: '18px',
    color: '#7f8c8d',
    lineHeight: '1.6',
    marginBottom: '40px'
  },
  boton: {
    padding: '15px 30px',
    backgroundColor: '#2c3e50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    display: 'inline-block'
  }
};

export const catalogoStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  titulo: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#333'
  },
  grilla: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  imagen: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0'
  },
  infoContainer: {
    padding: '15px'
  },
  marca: {
    fontSize: '12px',
    color: '#7f8c8d',
    textTransform: 'uppercase'
  },
  nombre: {
    margin: '5px 0 10px 0',
    fontSize: '18px',
    color: '#2c3e50'
  },
  descripcion: {
    fontSize: '14px',
    color: '#555',
    height: '40px',
    overflow: 'hidden'
  },
  footerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px'
  },
  precio: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#27ae60'
  }
};

export const adminStyles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  botonSubmit: {
    padding: '12px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

export const loginStyles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  titulo: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '25px'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  boton: {
    padding: '12px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
};