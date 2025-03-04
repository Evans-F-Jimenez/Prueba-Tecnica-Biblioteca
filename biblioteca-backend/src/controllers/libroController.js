const Libro = require('../models/Libro');

exports.crearLibro = async (req, res) => {
    try {
        console.log('📌 Usuario autenticado en crearLibro:', req.usuario); // ✅ Depuración

        const nuevoLibro = new Libro({
            ...req.body,
            userId: req.usuario.id // 🔥 Asigna automáticamente el ID del usuario autenticado
        });

        await nuevoLibro.save();

        console.log('📌 Libro creado:', nuevoLibro);

        res.status(201).json(nuevoLibro);
    } catch (error) {
        console.error('❌ Error al crear el libro:', error);
        res.status(500).json({ msg: 'Error al crear un libro', error: error.message });
    }
};


exports.obtenerLibros = async (req, res) => {
    try {
        const page = parseInt(req.query.page) | 1;
        const limit = parseInt(req.query.limit) | 10;

        const skip = parseInt(page - 1) * limit;
        const libros = await Libro.find().skip(skip).limit(limit);
        const total = await Libro.countDocuments();

        console.log('📌 Libros obtenidos:', libros);

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            libros
        });
    } catch (error) {
        console.error('❌ Error al obtener los libros:', error);
        res.status(500).json({ msg: 'Error al obtener los libros', error: error.message });
    }
};

exports.actualizarLibro = async (req, res) => {
    try {
        console.log('📌 Datos recibidos en actualizarLibro:', req.body);

        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!libro) {
            return res.status(404).json({ msg: 'Libro no encontrado' });
        }

        console.log('📌 Libro actualizado:', libro);
        res.status(200).json(libro);
    } catch (error) {
        console.error('❌ Error al actualizar el libro:', error);
        res.status(500).json({ msg: 'Error al actualizar el libro', error: error.message });
    }
};

exports.eliminarLibro = async (req, res) => {
    try {
        console.log('📌 Intentando eliminar libro con ID:', req.params.id);

        const libro = await Libro.findByIdAndDelete(req.params.id);

        if (!libro) {
            return res.status(404).json({ msg: 'Libro no encontrado' });
        }

        console.log('📌 Libro eliminado:', libro);
        res.status(200).json({ msg: 'Libro eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar el libro:', error);
        res.status(500).json({ msg: 'Error al eliminar el libro', error: error.message });
    }
};


exports.buscarLibros = async (req, res) => {
    try {
        const { Search } = req.body;

        if (!Search) return res.status(400).json({ msg: "Debe escribir un termino de busqueda." });

        const regex = new RegExp(Search, 'i');

        const libros = await Libros.find({ $or: [{ title: regex }, { author: regex }] });

        res.status(200).json(libros);
    } catch (error) {
        console.error("Error en la busqueda de libros.", error);
        res.status(500).json({ msg: "Error al buscar libros" })
    }
}