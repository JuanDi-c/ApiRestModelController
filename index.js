const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("No se pudo conectar", err));

// Middleware
const middlewareRevision = (req, res, next) => {
    const hora = new Date().toLocaleString();
    console.log(`[${hora}] ${req.method} ${req.url}`);
    next();
};

app.use(middlewareRevision);

// Rutas

app.use("/api/v1/libros", require("./src/routes/libros"));
app.use("/api/v1/empleados", require("./src/routes/empleados"));
app.use("/api/v1/clientes", require("./src/routes/clientes"));
app.use("/api/v1/prestamo", require("./src/routes/prestamo"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});