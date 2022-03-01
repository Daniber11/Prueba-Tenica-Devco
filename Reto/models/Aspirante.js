const mongoose = require("mongoose");

const AspirantesSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  resultado: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  GerenteTecnico: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "GerenteTecnico",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Aspirante", AspirantesSchema);
