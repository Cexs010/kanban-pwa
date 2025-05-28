import { useAuth } from "../app/context/AuthContext.jsx"
import { Routes, Route } from "react-router-dom";
import LandingPage from "../views/LandingPage.jsx";
import Login from "../views/LoginView.jsx";
import Navbar from "../components/Navbar";
import Register from "../views/RegisterView.jsx";
import KanbanView from "../views/KanbanView.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import NavbarKanban from "../components/kanban/NavbarKanban.jsx"

const Router = () => {
  const { user } = useAuth();
  return (
    <>
      {user ? <NavbarKanban /> : <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas Protegidas */}
        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <KanbanView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
