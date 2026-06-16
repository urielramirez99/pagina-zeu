import jwt from 'jsonwebtoken';

const protegerRuta = async (req, res, next) => {
    let token;

    // El token se suele enviar en el header como: "Bearer eyJhbGciOi..."
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extraemos solo el string del token

            // Verificar y decodificar el token
            const decodificado = jwt.verify(token, process.env.JWT_SECRET);
            
            // Inyectamos el id del admin verificado en la petición por seguridad
            req.usuarioId = decodificado.id; 

            return next(); // Continuar al controlador (crear, eliminar, etc.)
        } catch (error) {
            return res.status(401).json({ mensaje: 'Token no válido o expirado, acceso denegado' });
        }
    }

    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token, autorización denegada' });
    }
};

export default protegerRuta;