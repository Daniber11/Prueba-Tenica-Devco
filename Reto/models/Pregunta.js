const mongoose = require("mongoose");

const PreguntasSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  respuesta: {
    type: String,
    required: true,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Pregunta", PreguntasSchema);
