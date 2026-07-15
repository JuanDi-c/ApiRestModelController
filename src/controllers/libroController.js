const Libro = require("../models/Libro");

// Obtener todos los libros
exports.obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los libros",
      error: error.message
    });
  }
};

// Obtener un libro por ID
exports.obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);

    if (!libro) {
      return res.status(404).json({
        mensaje: "Libro no encontrado"
      });
    }

    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el libro",
      error: error.message
    });
  }
};

// Crear un libro
exports.crearLibro = async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    await nuevoLibro.save();

    res.status(201).json({
      mensaje: "Libro creado correctamente",
      libro: nuevoLibro
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el libro",
      error: error.message
    });
  }
};

// Actualizar un libro
exports.actualizarLibro = async (req, res) => {
  try {
    const libroActualizado = await Libro.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!libroActualizado) {
      return res.status(404).json({
        mensaje: "Libro no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Libro actualizado correctamente",
      libro: libroActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el libro",
      error: error.message
    });
  }
};

// Eliminar un libro
exports.eliminarLibro = async (req, res) => {
  try {
    const libroEliminado = await Libro.findByIdAndDelete(req.params.id);

    if (!libroEliminado) {
      return res.status(404).json({
        mensaje: "Libro no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Libro eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el libro",
      error: error.message
    });
  }
};