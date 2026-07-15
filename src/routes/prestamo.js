const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const router = express.Router();

// Obtener préstamos
router.get("/", async (req, res) => {
    try {
        const prestamos = await mongoose.connection.db
            .collection("prestamo")
            .find({})
            .toArray();

        res.json(prestamos);

    } catch (error) {
        res.status(500).json({ error: "Error al consultar los préstamos" });
    }
});

// Agregar préstamo
router.post("/", async (req, res) => {
    try {

        const nuevoPrestamo = req.body;

        if (
            !nuevoPrestamo.cliente ||
            !nuevoPrestamo.libro ||
            !nuevoPrestamo.fecha_prestamo||
            !nuevoPrestamo.estado
        ) {
            return res.status(400).json({
                error: "Debe ingresar cliente, libro, estado y fecha del préstamo."
            });
        }

        const resultado = await mongoose.connection.db
            .collection("prestamo")
            .insertOne(nuevoPrestamo);

        res.status(201).json({
            mensaje: "Préstamo registrado",
            id_generado: resultado.insertedId,
            datosGuardados: nuevoPrestamo
        });

    } catch (error) {
        res.status(500).json({ error: "Error al registrar el préstamo" });
    }
});

// Actualizar préstamo
router.put("/:id", async (req, res) => {
    try {

        const resultado = await mongoose.connection.db
            .collection("prestamo")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Préstamo no encontrado" });
        }

        res.json({
            mensaje: "Préstamo actualizado correctamente",
            modificaciones: resultado.modifiedCount
        });

    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar el préstamo" });
    }
});

// Eliminar préstamo
router.delete("/:id", async (req, res) => {
    try {

        const resultado = await mongoose.connection.db
            .collection("prestamo")
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Préstamo no encontrado" });
        }

        res.json({ mensaje: "Préstamo eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar el préstamo" });
    }
});

//actualizar prestamo (EJERCICIO PROPUESTO)
router.patch("/actualizar-estado/:id", async (req, res) => {

    try {

        const idPrestamo = req.params.id;
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({
                error: "Debe enviar el nuevo estado."
            });
        }

        // Buscar el préstamo
        const prestamo = await mongoose.connection.db
            .collection("prestamo")
            .findOne({
                _id: new ObjectId(idPrestamo)
            });

        // Verificar si existe
        if (!prestamo) {
            return res.status(404).json({
                error: "Préstamo no encontrado."
            });
        }

        // Validación de negocio
        if (prestamo.estado === "finalizado") {
            return res.status(403).json({
                error: "No se puede modificar un préstamo que ya está finalizado."
            });
        }

        // Actualizar únicamente el estado
        await mongoose.connection.db
            .collection("prestamo")
            .updateOne(
                { _id: new ObjectId(idPrestamo) },
                { $set: { estado: estado } }
            );

        res.json({
            mensaje: "Estado actualizado correctamente.",
            nuevoEstado: estado
        });

    } catch (error) {

        res.status(500).json({
            error: "No se pudo actualizar el estado."
        });

    }

});

module.exports = router;