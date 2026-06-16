import Usuario from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Iniciar Sesión (POST)
export const login = async (req, res) => {
    const { usuario, password } = req.body;

    try {
        // 1. Verificar si el usuario existe
        const user = await Usuario.findOne({ usuario });
        if (!user) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas (Usuario incorrecto)' });
        }

        // 2. Verificar si la contraseña coincide
        const esCorrecto = await user.compararPassword(password);
        if (!esCorrecto) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas (Contraseña incorrecta)' });
        }

        // 3. Generar el Token JWT
        // Guardamos el ID del usuario dentro del token y expira en 2 horas
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }
        );

        // 4. Responder con el token
        res.status(200).json({
            mensaje: 'Login exitoso',
            token,
            usuario: user.usuario
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

// NOTA PRO: Ruta auxiliar opcional para crear el primer administrador en tu base de datos
export const registrarAdminInicial = async (req, res) => {
    try {
        const existe = await Usuario.findOne({ usuario: req.body.usuario });
        if (existe) return res.status(400).json({ mensaje: 'El usuario ya existe' });

        const nuevoAdmin = new Usuario(req.body);
        await nuevoAdmin.save();
        res.status(201).json({ mensaje: 'Administrador creado con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar', error: error.message });
    }
};