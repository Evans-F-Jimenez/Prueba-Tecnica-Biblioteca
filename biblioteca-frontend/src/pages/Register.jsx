import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        if (e.target.name === "confirmPassword" || e.target.name === "password") {
            if (e.target.value !== form.password && form.confirmPassword) {
                setPasswordError("Las contraseñas no coinciden.");
            } else {
                setPasswordError("");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.username || !form.email || !form.password || !form.confirmPassword) {
            setPasswordError("Todos los campos son obligatorios");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
            return;
        }

        dispatch(registerUser(form)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                navigate("/login");
            }
        });
    };

    return (
        <div className="flex flex-col items-center rounded-lg justify-center h-197 bg-[url(./register-background.png)] bg-center bg-no-repeat">
            <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
                <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Registro</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Repite la contraseña"
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading || !form.username || !form.email || !form.password || !form.confirmPassword || passwordError}
                        className={`p-3 text-white font-semibold rounded-md transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                    <Link to={"/login"} className="text-sm text-center">
                        Ya tiene un usuario? Inicia sesion.
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
