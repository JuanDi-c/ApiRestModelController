const express = require("express");
const controller = require("../controllers/empleadoController");
const router = express.Router();

router.get("/", controller.obtenerEmpleados);
router.post("/", controller.crearEmpleado);
router.get("/:id", controller.obtenerEmpleadoPorId);
router.put("/:id", controller.actualizarEmpleado);
router.delete("/:id", controller.eliminarEmpleado);

module.exports = router;
