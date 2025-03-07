import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                navigate("/dashboard");
            }
        });
    };

    return (
        <div className="flex flex-col items-center rounded-lg justify-center h-screen bg-[url(./login-background.png)] bg-center bg-no-repeat">
            <h1 className="text-7xl font-bold text-black text-center mb-6 pb-10">MyLibrary</h1>
            <div className="bg-white shadow-lg rounded-lg p-9 w-full max-w-md">
                <h2 className="text-2xl font-bold text-green-700 text-center mb-5">Iniciar Sesión</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <button type="submit" disabled={loading} className={`p-3 text-white font-semibold rounded-md transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                        }`} >{loading ? "Ingresando..." : "Ingresar"}
                    </button>
                    <Link to={"/register"} className="text-sm text-center">
                        Desea registrar un usuario?
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
