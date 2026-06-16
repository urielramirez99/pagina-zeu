import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del perfume es obligatorio'],
        trim: true
    },
    marca: {
        type: String,
        required: [true, 'La marca es obligatoria'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    descripcion: {
        type: String,
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        default: 0
    },
    imagenUrl: {
        type: String,
        required: [true, 'La URL de la imagen es obligatoria']
    },
    categoria: {
        type: String,
        trim: true,
        default: 'General'
    }
}, {
    timestamps: true // Esto crea automáticamente campos "createdAt" y "updatedAt"
});

const Producto = mongoose.model('Producto', productoSchema);
export default Producto;