const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const router = express.Router();

// Obtener clientes
router.get("/", async (req, res) => {
    try {
        const clientes = await mongoose.connection.db
            .collection("clientes")
            .find({})
            .toArray();

        res.json(clientes);

    } catch (error) {
        res.status(500).json({ error: "Error al consultar los clientes" });
    }
});

// Agregar cliente
router.post("/", async (req, res) => {
    try {

        const nuevoCliente = req.body;

        if (
            !nuevoCliente.nombre ||
            !nuevoCliente.email ||
            !nuevoCliente.telefono
        ) {
            return res.status(400).json({
                error: "Debe ingresar nombre, email y teléfono."
            });
        }

        const resultado = await mongoose.connection.db
            .collection("clientes")
            .insertOne(nuevoCliente);

        res.status(201).json({
            mensaje: "Cliente agregado",
            id_generado: resultado.insertedId,
            datosGuardados: nuevoCliente
        });

    } catch (error) {
        res.status(500).json({ error: "Error al agregar el cliente" });
    }
});

// Actualizar cliente
router.put("/:id", async (req, res) => {
    try {

        const resultado = await mongoose.connection.db
            .collection("clientes")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json({
            mensaje: "Cliente actualizado correctamente",
            modificaciones: resultado.modifiedCount
        });

    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar el cliente" });
    }
});

// Eliminar cliente
router.delete("/:id", async (req, res) => {
    try {

        const resultado = await mongoose.connection.db
            .collection("clientes")
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json({ mensaje: "Cliente eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar el cliente" });
    }
});

module.exports = router;