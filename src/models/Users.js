const {Schema , model} = require('mongoose');

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    nacionalidad: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model("User" , UserSchema);