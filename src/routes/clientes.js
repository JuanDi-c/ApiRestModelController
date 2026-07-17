const express = require("express");
const controller = require("../controllers/clienteController");

const router = express.Router();

router.get("/", controller.obtenerClientes);
router.post("/", controller.crearCliente);
router.get("/:id", controller.obtenerClientePorId);
router.put("/:id", controller.actualizarCliente);
router.delete("/:id", controller.eliminarCliente);

module.exports = router;
