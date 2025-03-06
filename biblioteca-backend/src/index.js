require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const libroRoutes = require('./routes/libroRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Conectar a la base de datos solo si NO estamos en modo test, ya que setup llama a otra BD de prueba.
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/reviews', reviewRoutes);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
    app.get("/", (req, res) => {
        res.send("Servidor APi Funcionando");
    })

    module.exports = { app, server };
} else {
    module.exports = { app }; // Exportamos solo `app` para supertest en modo test
}
