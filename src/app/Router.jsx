import { useAuth } from "../app/context/AuthContext.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../views/LandingPage.jsx";
import Login from "../views/LoginView.jsx";
import Navbar from "../components/Navbar";
import Register from "../views/RegisterView.jsx";
import KanbanView from "../views/KanbanView.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import NavbarKanban from "../components/kanban/NavbarKanban.jsx";
import ProfileView from "../views/ProfileView.jsx";
import HomeView from "../views/HomeView.jsx";

const Router = () => {
  const { user } = useAuth();
  const location = useLocation();

  // si la ruta actual es /home, no mostrar navbar
  const hideNavbar = location.pathname === "/home";

  return (
    <>
      {!hideNavbar && (user ? <NavbarKanban /> : <Navbar />)}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas Protegidas */}
        <Route
          path="/kanban/:groupId"
          element={
            <ProtectedRoute>
              <KanbanView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
