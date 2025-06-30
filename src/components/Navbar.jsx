import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 h-16 bg-cyan-900 bg-opacity-90 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        <Link
          to="/"
          className="flex items-center space-x-2 text-white font-bold text-xl"
        >
          <img
            src="/Kanban_192x192.png"
            alt="Logo"
            className="w-12 h-12 object-contain mr-2"
          />
          Inicio
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Links en pantallas grandes */}
        <div className="hidden md:flex gap-x-8">
          <Link
            to="/login"
            className="text-white px-4 py-2 hover:bg-white/20 hover:rounded-lg transition-all duration-300"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="text-white px-4 py-2 hover:bg-white/20 hover:rounded-lg transition-all duration-300"
          >
            Registrarse
          </Link>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full md:hidden bg-cyan-900 z-40 px-5 py-3 flex flex-col gap-2 shadow-md">
          <hr className="border-white/20" />
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="text-white px-4 py-2 bg-cyan-800 rounded-lg hover:bg-cyan-700 transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="text-white px-4 py-2 bg-cyan-800 rounded-lg hover:bg-cyan-700 transition"
          >
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
