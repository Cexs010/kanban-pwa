import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  registerWithEmail,
  loginWithGoogle,
} from "../services/registerFirebase";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerWithEmail(email, password, displayName);
      toast.success("¡Registro exitoso!");
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("¡Registro exitoso!");
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-4 sm:p-6 rounded-xl shadow-md w-full max-w-xs sm:max-w-sm border border-gray-300"
    >
      <h1 className="text-center text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
        Crear Cuenta
      </h1>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <label
            htmlFor="displayName"
            className="text-sm font-medium text-gray-700"
          >
            Nombre Completo
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 bg-gray-50 border border-gray-300 text-sm rounded-md w-full h-9 px-3"
            placeholder="Tu nombre"
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 bg-gray-50 border border-gray-300 text-sm rounded-md w-full h-9 px-3"
            placeholder="ejemplo@correo.com"
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 bg-gray-50 border border-gray-300 text-sm rounded-md w-full h-9 px-3"
            placeholder="Mínimo 6 caracteres"
            minLength="6"
            autoComplete="off"
            required
          />
        </div>

        <div className="flex items-start gap-2 text-sm">
          <input
            id="terms"
            type="checkbox"
            className="mt-1 w-4 h-4 border-gray-300 rounded-sm"
            required
          />
          <label htmlFor="terms" className="text-gray-700 leading-5">
            Acepto los{" "}
            <a href="#" className="text-cyan-700 hover:underline">
              términos y condiciones
            </a>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-4 text-white bg-cyan-900 hover:bg-cyan-700 transition duration-300 font-medium rounded-md text-sm h-10 w-full ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      <div className="my-3 flex items-center">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm">o</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      <button
        type="button"
        onClick={handleGoogleRegister}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full text-gray-700 bg-white hover:bg-gray-100 font-medium rounded-md text-sm h-10 px-3 border border-gray-300"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-4 h-4"
        />
        Google
      </button>

      <p className="mt-3 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-cyan-700 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
