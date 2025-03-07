const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', ReviewSchema);
