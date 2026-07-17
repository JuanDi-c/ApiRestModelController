const Prestamo = require("../models/Prestamo");

// Obtener todos los préstamos
exports.obtenerPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find();
    res.status(200).json(prestamos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los préstamos",
      error: error.message
    });
  }
};

// Obtener un préstamo por ID
exports.obtenerPrestamoPorId = async (req, res) => {
  try {
    const prestamo = await Prestamo.findById(req.params.id);

    if (!prestamo) {
      return res.status(404).json({
        mensaje: "Préstamo no encontrado"
      });
    }

    res.status(200).json(prestamo);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el préstamo",
      error: error.message
    });
  }
};

// Crear un préstamo
exports.crearPrestamo = async (req, res) => {
  try {
    const nuevoPrestamo = new Prestamo(req.body);
    await nuevoPrestamo.save();

    res.status(201).json({
      mensaje: "Préstamo creado correctamente",
      prestamo: nuevoPrestamo
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el préstamo",
      error: error.message
    });
  }
};

// Actualizar un préstamo
exports.actualizarPrestamo = async (req, res) => {
  try {
    const prestamoActualizado = await Prestamo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!prestamoActualizado) {
      return res.status(404).json({
        mensaje: "Préstamo no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Préstamo actualizado correctamente",
      prestamo: prestamoActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el préstamo",
      error: error.message
    });
  }
};

// Eliminar un préstamo
exports.eliminarPrestamo = async (req, res) => {
  try {
    const prestamoEliminado = await Prestamo.findByIdAndDelete(req.params.id);

    if (!prestamoEliminado) {
      return res.status(404).json({
        mensaje: "Préstamo no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Préstamo eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el préstamo",
      error: error.message
    });
  }
};

// Actualizar únicamente el estado de un préstamo
exports.actualizarEstadoPrestamo = async (req, res) => {
  try {
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({
        mensaje: "Debe enviar el nuevo estado"
      });
    }

    const prestamo = await Prestamo.findById(req.params.id);

    if (!prestamo) {
      return res.status(404).json({
        mensaje: "Préstamo no encontrado"
      });
    }

    if (prestamo.estado === "finalizado") {
      return res.status(403).json({
        mensaje: "No se puede modificar un préstamo que ya está finalizado"
      });
    }

    prestamo.estado = estado;
    await prestamo.save();

    res.status(200).json({
      mensaje: "Estado actualizado correctamente",
      prestamo
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "No se pudo actualizar el estado",
      error: error.message
    });
  }
};
