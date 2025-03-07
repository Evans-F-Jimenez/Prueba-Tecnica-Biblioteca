import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../store/favoritesSlice";
import { Link } from "react-router-dom";

const BookDetail = () => {

    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.favorites);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/libros/${id}`)
            .then((res) => {
                setBook(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al traer el libro:", err);
                setLoading(false);
            });
    }, [id]);

    const handleAddToFavorites = () => {
        dispatch(addToFavorites(book));
    };

    if (loading) return <p className="text-center text-gray-500">Cargando...</p>;

    return (
        <div className="container mx-auto px-6 py-8">
            <Link to="/" className="text-green-600 font-semibold hover:underline">
                ⬅ Volver a la biblioteca
            </Link>

            {book ? (
                <div className="flex flex-col md:flex-row mt-6 bg-white shadow-lg rounded-lg p-6">
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-64 h-96 object-cover rounded-md mx-auto md:mx-0"
                    />
                    <div className="md:ml-6 flex-1">
                        <h1 className="text-3xl font-bold text-green-700">{book.title}</h1>
                        <p className="text-gray-700 mt-2">Autor: {book.author}</p>
                        <p className="text-gray-500">Género: {book.genre?.join(", ")}</p>

                        <button
                            className="mt-6 flex items-center bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
                            onClick={handleAddToFavorites}
                        >
                            <FaHeart className="mr-2" /> Agregar a favoritos
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-red-500 mt-6">Libro no encontrado.</p>
            )}
        </div>
    )
}

export default BookDetail