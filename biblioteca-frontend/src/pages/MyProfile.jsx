import React from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaLanguage, FaUser, FaHistory, FaFileCsv } from "react-icons/fa";

const MyProfile = () => {
    return (
        <>
            <div className="h-screen flex text-white">
                <div className='w-1/7 bg-green-700 flex flex-col justify-between items-center py-6'>
                    <button className="w-30 h-10 rounded-md border-2 border-white bg-transparent hover:bg-green-100 transition">
                        <Link to={"/"}>
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
                <div className="w-6/7 p-6">
                    <h1 className='text-5xl font-bold text-green-700 text-center'>
                        Mi Perfil
                    </h1>
                    <div className='grid grid-cols-3 gap-10 mt-30'>
                        <Link to={"/favorites"}>
                            <div className='w-100 h-24 border-2 border-green-700 rounded-lg flex items-center justify-center hover:bg-green-700 group transition'>
                                <span className='text-green-700 font-semibold pr-5 transition group-hover:text-white'>Favoritos</span>
                                <FaStar className="text-green-700 text-2xl mt-2 transition group-hover:text-white" />
                            </div>
                        </Link>
                        <div className='w-100 h-24 border-2 border-green-700 rounded-lg flex items-center justify-center hover:bg-green-700 group transition'>
                            <span className='text-green-700 group-hover:text-white transition font-semibold pr-5'>Idiomas</span>
                            <FaLanguage className="text-green-700 text-2xl mt-2 transition group-hover:text-white" />
                        </div>
                        <Link to={"/login"}>
                            <div className='w-100 h-24 border-2 border-green-700 rounded-lg flex items-center justify-center hover:bg-green-700 group transition'>
                                <span className='text-green-700 font-semibold pr-5 transition group-hover:text-white'>Usuario</span>
                                <FaUser className="text-green-700 text-2xl mt-2 transition group-hover:text-white" />
                            </div>
                        </Link>
                        <div className='w-100 h-24 border-2 border-green-700 rounded-lg flex items-center justify-center hover:bg-green-700 group transition'>
                            <span className='text-green-700 font-semibold pr-5 transition group-hover:text-white'>Historial</span>
                            <FaHistory className="text-green-700 text-2xl mt-2 transition group-hover:text-white" />
                        </div>
                        <div className='w-100 h-24 border-2 border-green-700 rounded-lg flex items-center justify-center hover:bg-green-700 group transition'>
                            <span className='text-green-700 font-semibold pr-5 transition group-hover:text-white'>Exportar CSV</span>
                            <FaFileCsv className="text-green-700 text-2xl mt-2 transition group-hover:text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile