import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white font-bold text-xl hover:text-blue-200 transition-colors"
        >
          Inicio
        </Link>
        <Link
          to="/login"
          className="text-white hover:text-blue-200 transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
