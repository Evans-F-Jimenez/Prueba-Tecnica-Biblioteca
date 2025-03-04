const Libro = require('../models/Libro');
const Review = require('../models/Review');

exports.crearReview = async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;
        const libro = await Libro.findById(bookId);
        if (!libro) return res.status(404).json({ msg: "Libro no encontrado." });

        const nuevaReview = new Review({ bookId, userId: req.user.id, rating, comment });
        await nuevaReview.save();

        res.status(201).json(nuevaReview);

    } catch (error) {
        res.status(500).json({ msg: "Error al crear reseña" })
    }
};

exports.obtenerReview = async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'username');
        res.json(reviews);

    } catch (error) {
        res.status(500).json({ msg: "Error al obtener las reseña" })
    }
};

exports.actualizarReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findById(id);

        if (!review) return res.status(404).json({ msg: "Reseña no encontrada" });

        if (review.userId.toString() !== req.user.id) return res.status(403).json({ msg: "No hay permiso para editar esta reseña." });

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        await review.save();
        res.status(200).json(review);

    } catch (error) {
        console.error();
        res.status(500).json({ msg: "Error al editar la reseña." });
    }
}

exports.eliminarReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) return res.status(404).json({ msg: "Reseña no encontrada" });

        if (review.userId.toString() !== req.user.id) return res.status(403).json({ msg: "No hay permiso para editar esta reseña." });

        await review.deleteOne();
        res.status(200).json({ msg: "Reseña eliminada correctamente." });



    } catch (error) {
        console.error("Error al eliminar la reseña: ", error);
        res.status(500).json({ msg: "Error al eliminar la reseña." });
    }
}