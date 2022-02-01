const { Schema, model } = require("mongoose");

const SearchSchema = new Schema({
    litm: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    textol: {
        type: String,
        default: '',
    },
    nombre_com: {
        type: String,
        default: ''
    },
    droga: {
        type: String,
        required: false,
    },
    estado: {
        type: Boolean,
        default: true
    },
    f_auditoria: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

module.exports = model("Insumos", SearchSchema);
