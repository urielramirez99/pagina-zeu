import express from 'express';

import protegerRuta from '../middlewares/authMiddleware.js'; // <-- Importamos el middleware
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductos, obtenerProductoPorId, obtenerProductosSimilares } from '../controllers/products.controller.js';

const Authrouter = express.Router();


Authrouter.get("/", obtenerProductos) 
Authrouter.get("/:id", obtenerProductoPorId) 
Authrouter.get("/:id/similares", obtenerProductosSimilares)                
Authrouter.post("/", protegerRuta, crearProducto);    


Authrouter.put('/:id', protegerRuta, actualizarProducto)   
Authrouter.delete('/:id',protegerRuta, eliminarProducto); 

export default Authrouter;