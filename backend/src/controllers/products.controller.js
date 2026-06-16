import Producto from '../models/products.model.js';

// 1. CREAR un nuevo perfume (POST)
export const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el producto', error: error.message });
    }
};

// 2. OBTENER todos los perfumes (GET)
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find().sort({ createdAt: -1 }); // Los más nuevos primero
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los productos', error: error.message });
    }
};

// 3. ACTUALIZAR un perfume por ID (PUT)
export const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true } // new: true devuelve el objeto ya modificado
        );

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
};

// 4. ELIMINAR un perfume por ID (DELETE)
export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await Producto.findByIdAndDelete(id);

        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
    }
};