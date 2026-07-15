const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const router = express.Router();

// Obtener empleados
router.get("/", async (req, res) => {
    try {
        const empleados = await mongoose.connection.db
            .collection("empleados")
            .find({})
            .toArray();

        res.json(empleados);

    } catch (error) {
        res.status(500).json({ error: "Error al consultar los empleados" });
    }
});

// Agregar empleado
router.post("/", async (req, res) => {
    try {

        const nuevoEmpleado = req.body;

        if (
            !nuevoEmpleado.nombre ||
            !nuevoEmpleado.edad ||
            !nuevoEmpleado.telefono ||
            !nuevoEmpleado.email ||
            !nuevoEmpleado.salario
        ) {
            return res.status(400).json({
                error: "Debe ingresar nombre, edad, teléfono, email y salario."
            });
        }

        const resultado = await mongoose.connection.db
            .collection("empleados")
            .insertOne(nuevoEmpleado);

        res.status(201).json({
            mensaje: "Empleado agregado",
            id_generado: resultado.insertedId,
            datosGuardados: nuevoEmpleado
        });

    } catch (error) {
        res.status(500).json({ error: "Error al agregar el empleado" });
    }
});

// Actualizar empleado
router.put("/:id", async (req, res) => {
    try {

        const resultado = await mongoose.connection.db
            .collection("empleados")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }

        res.json({
            mensaje: "Empleado actualizado correctamente",
            modificaciones: resultado.modifiedCount
        });

    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar el empleado" });
    }
});

// Eliminar empleado
router.delete("/:id", async (req, res) => {
    try {

        const resultado = await mongoose.connection.db
            .collection("empleados")
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }

        res.json({ mensaje: "Empleado eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar el empleado" });
    }
});

module.exports = router;