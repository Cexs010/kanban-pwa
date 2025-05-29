import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase/firebase";

const NavbarKanban = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="h-16 bg-cyan-900 bg-opacity-90 backdrop-blur-sm shadow-lg overflow-visible">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        <Link
          to="/home"
          className="flex items-center space-x-2 text-white font-bold text-xl"
        >
          <img
            src="/Kanban_192x192.png"
            alt="Logo"
            className="w-15 h-15 object-contain mr-5"
          />
          Tablero
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
            to="/profile"
            className="text-white px-4 py-2 hover:bg-white/20 hover:rounded-lg transition-all duration-300"
          >
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="text-white px-4 py-2 hover:bg-red-600 hover:rounded-lg transition-all duration-300"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <div className="md:hidden flex px-5 py-3 bg-cyan-900 flex-col gap-2">
          <hr className="border-white/20"/>
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="text-white px-4 py-2 bg-cyan-800 rounded-lg hover:bg-cyan-700 transition"
          >
            Perfil
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="text-white px-4 py-2 text-start bg-red-600 rounded-lg hover:bg-red-500 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarKanban;
