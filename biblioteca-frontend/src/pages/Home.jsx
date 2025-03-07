import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Topbar from '../components/Topbar';


const Home = () => {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:5000/api/libros").then(res => setLibros(res.data.libros)).catch(err => console.error("Error al obtener los libros: ", err));

    }, []);

    return (

        <>
            <Topbar />
            <div className='mt-6 w-full'>
                <div className='pl-20 pr-20'>
                    <div className="max-w-9x1 bg-white shadow-lg rounded-md p-15 mt-4">
                    </div>
                    <div className="w-full max-w-8xl flex flex-col items-center mt-8 ">
                        <div className="w-full h-2 bg-green-600" />

                        <div className=" pl-275 relative flex items-center justify-center w-full">
                            <button className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-green-600 bg-white shadow-lg absolute -top-6 transition-transform transform hover:scale-110">
                                <Link to={"/insertbook"} className="flex items-center justify-center w-full h-full">
                                    <span className="text-green-600 text-2xl font-bold">+</span>
                                </Link>
                            </button>
                        </div>
                        <div className="w-full h-1 bg-green-600" />
                    </div>
                    <div className="mt-10 pb-90 p-1 bg-white shadow-lg max-w-9x1 border border-green-700">
                        <ul className="mt-8 space-y-3">
                            {libros.length > 0 ? (
                                libros.map(libro => (
                                    <li key={libro._id} className="p-3 bg-white shadow-md rounded-md hover:bg-gray-200">
                                        <Link to={`/libro/${libro._id}`} className="text-black font-medium">
                                            {libro.title} - {libro.author}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center mt-8=7=5=4">No hay libros en la biblioteca</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div></>
    )
}

export default Home