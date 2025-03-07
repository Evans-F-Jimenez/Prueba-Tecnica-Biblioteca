const express = require('express');
const { crearReview, obtenerReview, actualizarReview, eliminarReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, crearReview);
router.get('/:bookId', authMiddleware, obtenerReview);
router.put('/:reviewId', authMiddleware, actualizarReview);
router.delete('/:reviewId', authMiddleware, eliminarReview);

module.exports = router;
