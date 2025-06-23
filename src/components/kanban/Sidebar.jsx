import React, { useState } from "react";
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";

const Sidebar = ({ activeItem, onMenuItemClick, isOpen, onToggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "#" },
    { id: "users", label: "Usuarios", icon: Users, href: "#" },
    { id: "reports", label: "Reportes", icon: BarChart3, href: "#" },
    { id: "documents", label: "Documentos", icon: FileText, href: "#" },
  ];

  const dropdownItems = [
    { id: "profile", label: "Mi Perfil", href: "#" },
    { id: "account", label: "Configuración", href: "#" },
    { id: "billing", label: "Facturación", href: "#" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggleSidebar}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">
              Kanban PWA
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onMenuItemClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}

          {/* Dropdown Section */}
          <div className="pt-4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Settings size={20} />
                <span className="font-medium">Configuración</span>
              </div>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Items */}
            <div
              className={`
              mt-2 space-y-1 transition-all duration-200 overflow-hidden
              ${isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
            `}
            >
              {dropdownItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onMenuItemClick(item.id)}
                  className="w-full text-left px-9 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">CS</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">César Silva</p>
              <p className="text-xs text-gray-500">cesar@example.com</p>
            </div>
          </div>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200">
            <LogOut size={16} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
