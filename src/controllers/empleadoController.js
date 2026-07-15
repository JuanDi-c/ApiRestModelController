const Empleado = require("../models/Empleado");

// Obtener todos los empleados
exports.obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los empleados",
      error: error.message
    });
  }
};

// Obtener un empleado por ID
exports.obtenerEmpleadoPorId = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);

    if (!empleado) {
      return res.status(404).json({
        mensaje: "Empleado no encontrado"
      });
    }

    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el empleado",
      error: error.message
    });
  }
};

// Crear un empleado
exports.crearEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    await nuevoEmpleado.save();

    res.status(201).json({
      mensaje: "Empleado creado correctamente",
      empleado: nuevoEmpleado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el empleado",
      error: error.message
    });
  }
};

// Actualizar un empleado
exports.actualizarEmpleado = async (req, res) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!empleadoActualizado) {
      return res.status(404).json({
        mensaje: "Empleado no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Empleado actualizado correctamente",
      empleado: empleadoActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el empleado",
      error: error.message
    });
  }
};

// Eliminar un empleado
exports.eliminarEmpleado = async (req, res) => {
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);

    if (!empleadoEliminado) {
      return res.status(404).json({
        mensaje: "Empleado no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Empleado eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el empleado",
      error: error.message
    });
  }
};