const express = require('express');
const { obtenerLibros, crearLibro, actualizarLibro, eliminarLibro, buscarLibros } = require('../controllers/libroController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, obtenerLibros);
router.get('/:id', authMiddleware, buscarLibros);
router.post('/', authMiddleware, crearLibro);
router.put('/:id', authMiddleware, actualizarLibro);
router.delete('/:id', authMiddleware, eliminarLibro);


module.exports = router;
