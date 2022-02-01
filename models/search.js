const { Schema, model } = require("mongoose");

const SearchSchema = new Schema({
    search: {
        type: String,
        required: true,
    },
    userjde: {
        type: String,
        required: true,
    },
    oficina: {
        type: String,
        required: true,
    },
    sucursal: {
        type: String,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        require: true
    },
    f_auditoria: {
        type: Date,
        required: true,
            default: Date.now,
    }
});

module.exports = model("Searchs", SearchSchema);
