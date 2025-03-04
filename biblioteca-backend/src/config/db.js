const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        console.error('❌ No se ha definido MONGO_URI');
        return;
    }

    if (mongoose.connection.readyState >= 1) {
        console.log('⚠️ Ya hay una conexión activa a MongoDB.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB conectado');
    } catch (error) {
        console.error('❌ Error en la conexión a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
