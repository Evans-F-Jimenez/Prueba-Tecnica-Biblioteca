const express = require('express');
const { crearReview, obtenerReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, crearReview);
router.post('/:BookId', authMiddleware, obtenerReview);

module.exports = router;
