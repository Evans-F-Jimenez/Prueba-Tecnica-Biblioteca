import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../store/favoritesSlice";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Favorites = () => {
    const { favorites } = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    return (
        <div className="h-screen flex text-white">
            <div className='w-1/7 bg-green-700 flex flex-col justify-between items-center py-6'>
                <button className="w-30 h-10 rounded-md border-2 border-white bg-transparent hover:bg-green-100 transition">
                    <Link to={"/myprofile"}>
                        Atras
                    </Link>
                </button>
                <h1></h1>
                <button className="w-30 h-10 rounded-md border-2 border-black bg-transparent hover:bg-gray-400 transition">
                    <Link to={"/login"}>
                        Salir
                    </Link>
                </button>

            </div>
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-green-700 text-center">⭐ Mis Favoritos</h1>

                {favorites.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No tienes libros en favoritos.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {favorites.map((book) => (
                            <div key={book._id} className="bg-white shadow-lg rounded-md p-4 flex flex-col items-center">
                                <img src={book.coverImage} alt={book.title} className="w-40 h-60 object-cover rounded-md" />
                                <h2 className="text-xl font-semibold text-green-700 mt-2">{book.title}</h2>
                                <p className="text-gray-600">{book.author}</p>

                                <div className="flex mt-4 space-x-2">
                                    <Link to={`/libro/${book._id}`} className="text-blue-500 hover:underline">
                                        Ver detalles
                                    </Link>
                                    <button
                                        onClick={() => dispatch(removeFromFavorites(book._id))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
