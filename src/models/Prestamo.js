const mongoose = require("mongoose");

const prestamoSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true
  },
  libro: {
    type: String,
    required: true
  },
  fecha_prestamo: {
    type: Date,
    required: true
  },
  fecha_devolucion: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    required: true,
    enum: ["Prestado", "Devuelto"]
  }
});

module.exports = mongoose.model("Prestamo", prestamoSchema, "prestamos");