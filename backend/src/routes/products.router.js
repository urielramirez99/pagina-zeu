import express from 'express';

import protegerRuta from '../middlewares/authMiddleware.js'; // <-- Importamos el middleware
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductos } from '../controllers/products.controller.js';

const Authrouter = express.Router();


Authrouter.get("/", obtenerProductos)                  // Público
Authrouter.post("/", protegerRuta, crearProducto);     // 🔒 Protegido


Authrouter.put('/:id', protegerRuta, actualizarProducto)   // 🔒 Protegido
Authrouter.delete('/:id',protegerRuta, eliminarProducto); // 🔒 Protegido

export default Authrouter;