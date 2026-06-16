import express from 'express';
import { login, registrarAdminInicial } from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta para loguearse: POST /api/auth/login
router.post('/login', login);

// Ruta temporal para crear tu primer usuario administrador: POST /api/auth/registro-inicial
router.post('/registro-inicial', registrarAdminInicial);

export default router;