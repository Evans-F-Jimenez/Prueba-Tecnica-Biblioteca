import React from 'react'
import { Link } from 'react-router-dom'

const Topbar = () => {

    return (
        <div className="w-full max-w-9xl bg-white shadow-lg rounded-md p-5 mt-4 flex justify-between">
            <h1></h1>
            <Link to={"/dashboard"}>
                <h1 className="text-2xl font-bold text-green-700 text-center">MyLibrary</h1>
            </Link>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">
                <Link to={"/myprofile"}>
                    Mi Perfil
                </Link>
            </button>
        </div>
    )
}

export default Topbar