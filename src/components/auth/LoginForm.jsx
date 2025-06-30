import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../services/firebase/authFirebase";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      toast.success("¡Inicio de sesión exitoso!");
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await loginWithGoogle();
      toast.success("¡Inicio de sesión exitoso!");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 p-4 sm:p-6 rounded-xl shadow-md w-full max-w-xs sm:max-w-sm border border-gray-300"
      >
        <h1 className="text-center text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Iniciar Sesión
        </h1>

        <div className="flex flex-col gap-3 sm:gap-4">
          <div>
            <label
              htmlFor="email"
              className="md:text-sm text-xs font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg block h-10 w-full py-2 px-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="md:text-sm text-xs font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg block w-full h-10 py-2 px-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`text-white bg-cyan-900 hover:bg-cyan-700 transition duration-300 font-medium rounded-lg text-sm h-10 p-2 w-full text-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>

          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-3 text-gray-600 text-sm">o</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full text-gray-700 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm p-2 h-10 border border-gray-300"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4"
            />
            Continuar con Google
          </button>
        </div>
      </form>
  );
}

export default LoginForm;
