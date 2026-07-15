const mongoose = require("mongoose");

const EmpleadoSchema = new mongoose.Schema({
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
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    required: true
  },
  cargo: {
    type: String,
    required: true
  },
  fecha_ingreso: {
    type: Date,
    required: true
  },
  salario: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Empleado", EmpleadoSchema);