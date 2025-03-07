const Libro = require('../models/Libro');
const Review = require('../models/Review');

exports.crearReview = async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({ msg: "Usuario no autenticado." });
        }

        console.log("📌 req.user en `crearReview`:", req.user); // ✅ Depuración


        const libro = await Libro.findById(bookId);
        if (!libro) return res.status(404).json({ msg: "Libro no encontrado." });

        console.log("📌 Usuario autenticado en `crearReview`:", req.user); // ✅ Depuración

        const nuevaReview = new Review({
            bookId,
            userId: req.user._id, // ✅ Aseguramos que req.user._id existe
            rating,
            comment,
        });

        await nuevaReview.save();
        res.status(201).json(nuevaReview);

    } catch (error) {
        console.error("❌ Error al crear la reseña:", error);
        res.status(500).json({ msg: "Error al crear la reseña." });
    }
};

exports.obtenerReview = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Buscar reseñas por bookId
        const reviews = await Review.find({ bookId }).populate('userId', 'username');

        if (!reviews.length) {
            return res.status(404).json({ msg: "No hay reseñas para este libro." });
        }

        res.json(reviews);

    } catch (error) {
        console.error("❌ Error al obtener las reseñas:", error);
        res.status(500).json({ msg: "Error al obtener las reseñas." });
    }
};

exports.actualizarReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        // Buscar reseña por `_id`
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ msg: "Reseña no encontrada." });

        // Verificar si el usuario es el propietario de la reseña
        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ msg: "No tienes permiso para editar esta reseña." });
        }

        // Actualizar valores
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save();
        res.status(200).json(review);

    } catch (error) {
        console.error("❌ Error al actualizar la reseña:", error);
        res.status(500).json({ msg: "Error al actualizar la reseña." });
    }
};

exports.eliminarReview = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar reseña por `_id`
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ msg: "Reseña no encontrada." });

        // Verificar si el usuario es el propietario
        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ msg: "No tienes permiso para eliminar esta reseña." });
        }

        await review.deleteOne();
        res.status(200).json({ msg: "Reseña eliminada correctamente." });

    } catch (error) {
        console.error("❌ Error al eliminar la reseña:", error);
        res.status(500).json({ msg: "Error al eliminar la reseña." });
    }
};
