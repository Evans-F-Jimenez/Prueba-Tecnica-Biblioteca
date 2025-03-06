const express = require('express');
const { crearReview, obtenerReview, actualizarReview, eliminarReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, crearReview);
router.post('/:BookId', authMiddleware, obtenerReview);
router.put('/:BookId', authMiddleware, actualizarReview);
router.delete('/:BookId', authMiddleware, eliminarReview);


module.exports = router;
