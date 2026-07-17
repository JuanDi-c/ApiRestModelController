const express = require("express");
const controller = require("../controllers/libroController");

const router = express.Router();

router.get("/", controller.obtenerLibros);
router.post("/", controller.crearLibro);
router.get("/:id", controller.obtenerLibroPorId);
router.put("/:id", controller.actualizarLibro);
router.delete("/:id", controller.eliminarLibro);

module.exports = router;
