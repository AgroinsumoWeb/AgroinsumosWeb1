const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
  username: {
    type: String,
    required: [true, 'El usuario es obligatorio'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  estado: {
    type: Boolean,
    default: true
  }
});

module.exports = model("User", UsersSchema);
