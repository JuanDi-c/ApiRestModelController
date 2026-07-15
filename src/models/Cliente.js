const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  fecha_registro: {
    type: Date,
    required: true
  },
  libros_prestados: [
    {
      type: mongoose.Schema.Types.Mixed
    }
  ],
  historial: [
    {
      type: mongoose.Schema.Types.Mixed
    }
  ]
});

module.exports = mongoose.model("Cliente", ClienteSchema);