import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/LoginView.jsx";
import Navbar from "../components/Navbar";
import Register from "../views/RegisterView.jsx";

const Router = () => {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </>
  );
};

export default Router;
