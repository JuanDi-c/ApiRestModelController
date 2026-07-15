const Cliente = require("../models/Cliente");

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los clientes",
      error: error.message
    });
  }
};

// Obtener un cliente por ID
exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);

    if (!cliente) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado"
      });
    }

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el cliente",
      error: error.message
    });
  }
};

// Crear un cliente
exports.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();

    res.status(201).json({
      mensaje: "Cliente creado correctamente",
      cliente: nuevoCliente
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el cliente",
      error: error.message
    });
  }
};

// Actualizar un cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!clienteActualizado) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Cliente actualizado correctamente",
      cliente: clienteActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el cliente",
      error: error.message
    });
  }
};

// Eliminar un cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);

    if (!clienteEliminado) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Cliente eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el cliente",
      error: error.message
    });
  }
};