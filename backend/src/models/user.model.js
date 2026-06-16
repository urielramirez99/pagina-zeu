import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
}, { timestamps: true });

// El hook moderno: Al ser async, Mongoose espera a que termine. ¡Sin usar next!
usuarioSchema.pre('save', async function() {
    // Si no se modificó la contraseña, salimos de la función sin hacer nada
    if (!this.isModified('password')) return;
    
    // Encriptamos la contraseña y la reasignamos al documento
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar contraseñas en el login (Este se queda igual)
usuarioSchema.methods.compararPassword = async function(passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;