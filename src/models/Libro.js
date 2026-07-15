const mongoose = require("mongoose");

const LibroSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  año_publicacion: {
    type: Number,
    required: true
  },
  editorial: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0
  },
  disponibles: {
    type: Number,
    required: true,
    min: 0
  },
  estado: {
    type: String,
    required: true,
    enum: ["Disponible", "No disponible"]
  }
});

module.exports = mongoose.model("Libro", LibroSchema);