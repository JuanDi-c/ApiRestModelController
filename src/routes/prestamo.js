const express = require("express");
const controller = require("../controllers/prestamoController");

const router = express.Router();

router.get("/", controller.obtenerPrestamos);
router.post("/", controller.crearPrestamo);
router.get("/:id", controller.obtenerPrestamoPorId);
router.put("/:id", controller.actualizarPrestamo);
router.delete("/:id", controller.eliminarPrestamo);
router.patch("/actualizar-estado/:id", controller.actualizarEstadoPrestamo);

module.exports = router;
