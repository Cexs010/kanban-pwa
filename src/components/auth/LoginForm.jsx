import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../../services/firebase/authFirebase";
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
      navigate('/kanban');
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
    <div className="w-full max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-7 rounded-lg shadow-md border border-gray-300"
      >
        <h1 className="text-center text-2xl font-semibold mb-5">Iniciar Sesión</h1>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block h-10 w-full py-2 px-3.5"
            placeholder="Ingresa tu correo"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full h-10 py-2 px-3.5"
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
      </form>
    </div>
  );
}

export default LoginForm;
