const mongoose = require("mongoose");

const PruebasSchema = mongoose.Schema({
  prueba: {
    type: Array,
    required: true,
  },

  aspirante: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Aspirante",
  },
  gerenteTecnico: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "GerenteTecnico",
  },
  estado: {
    type: String,
    default: "Presentando",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Prueba", PruebasSchema);
