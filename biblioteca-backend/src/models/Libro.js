const mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: [String], required: true },
    coverImage: { type: String },
    rating: { type: Number, default: 0 },
    isFavorite: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Libro', LibroSchema);