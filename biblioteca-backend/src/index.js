require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

// Conectar a la base de datos solo si NO estamos en modo test
// if (process.env.NODE_ENV !== 'test') {
//     connectDB();
// }
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const libroRoutes = require('./routes/libroRoutes');
app.use('/api/libros', libroRoutes);
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', authRoutes);

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
