import React, { useState } from "react";
import Sidebar from "../components/kanban/Sidebar";

// Componentes de contenido para cada sección
const DashboardContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Total Tareas
        </h3>
        <p className="text-3xl font-bold text-blue-600">24</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Completadas
        </h3>
        <p className="text-3xl font-bold text-green-600">18</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibent text-gray-900 mb-2">Pendientes</h3>
        <p className="text-3xl font-bold text-orange-600">6</p>
      </div>
    </div>
  </div>
);

const UsersContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
        <div className="space-y-3">
          {["Juan Pérez", "María García", "Carlos López"].map((user, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">{user.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium">{user}</p>
                <p className="text-sm text-gray-500">usuario@example.com</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ReportsContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Estadísticas del Proyecto</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="font-medium">Tareas Completadas</span>
          <span className="text-green-600 font-bold">75%</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="font-medium">Productividad</span>
          <span className="text-blue-600 font-bold">85%</span>
        </div>
      </div>
    </div>
  </div>
);

const DocumentsContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Documentos</h1>
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Archivos Recientes</h2>
      <div className="space-y-3">
        {["Especificaciones.pdf", "Diseño_UI.figma", "Manual_Usuario.docx"].map(
          (doc, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <div>
                <p className="font-medium">{doc}</p>
                <p className="text-sm text-gray-500">Modificado hace 2 días</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </div>
);

const HomeView = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuItemClick = (itemId) => {
    setActiveItem(itemId);
    setIsSidebarOpen(false); // Cierra sidebar en móvil al seleccionar
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para renderizar el contenido basado en la opción activa
  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardContent />;
      case "users":
        return <UsersContent />;
      case "reports":
        return <ReportsContent />;
      case "documents":
        return <DocumentsContent />;
      case "profile":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p>Información del perfil...</p>
            </div>
          </div>
        );
      case "account":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p>Configuración de la cuenta...</p>
            </div>
          </div>
        );
      case "billing":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Facturación</h1>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p>Información de facturación...</p>
            </div>
          </div>
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeItem={activeItem}
        onMenuItemClick={handleMenuItemClick}
        isOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      {/* Contenido principal */}
      <main className="flex-1 overflow-auto lg:ml-64 p-8">
        <div className="max-w-6xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default HomeView;
