const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const router = express.Router();

// Obtener libros
router.get("/", async (req, res) => {
    try {
        const libros = await mongoose.connection.db
            .collection("libros")
            .find({})
            .toArray();

        res.json(libros);

    } catch (error) {
        res.status(500).json({ error: "Error al consultar libros" });
    }
});

// Agregar libro
router.post("/", async (req, res) => {

    try {

        const libro = req.body;

        if (!libro.titulo || !libro.autor || !libro.genero || !libro.año_publicacion) {
            return res.status(400).json({
                error: "Faltan datos."
            });
        }

        const resultado = await mongoose.connection.db
            .collection("libros")
            .insertOne(libro);

        res.status(201).json({
            mensaje: "Libro agregado",
            id: resultado.insertedId
        });

    } catch (error) {

        res.status(500).json({
            error: "No se pudo agregar."
        });

    }

});

// Actualizar libro
router.put("/:id", async (req, res) => {

    try {

        const resultado = await mongoose.connection.db
            .collection("libros")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }

        res.json({
            mensaje: "Libro actualizado"
        });

    } catch (error) {

        res.status(500).json({
            error: "No se pudo actualizar"
        });

    }

});

// Eliminar libro
router.delete("/:id", async (req, res) => {

    try {

        const resultado = await mongoose.connection.db
            .collection("libros")
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                error: "Libro no encontrado"
            });
        }

        res.json({
            mensaje: "Libro eliminado"
        });

    } catch (error) {

        res.status(500).json({
            error: "No se pudo eliminar"
        });

    }

});

module.exports = router;