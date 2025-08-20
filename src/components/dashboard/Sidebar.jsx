import { useState, useEffect } from "react";
import { auth } from "../../services/firebase/firebase";
import { signOut } from "firebase/auth";
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
  Plus,
  Folder,
  Kanban,
  User,
  Loader2,
} from "lucide-react";

const Sidebar = ({
  activeItem,
  onMenuItemClick,
  isOpen,
  onToggleSidebar,
  userGroups = [], // Array de grupos del usuario
  onCreateGroup, // Función para crear nuevo grupo
  isLoadingGroups = false, // Estado de carga de grupos
  onDeleteGroup = () => {},     
  isDeletingGroup = false, 
}) => {
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Items del menú principal (siempre visibles)
  const mainMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "#" },
  ];

  // Items de configuración personal
  const settingsItems = [
    { id: "profile", label: "Mi Perfil", href: "#" },
    { id: "account", label: "Configuración", href: "#" },
    { id: "notifications", label: "Notificaciones", href: "#" },
  ];

  // Items específicos de cada grupo
  const getGroupMenuItems = (groupId) => [
    {
      id: `kanban-${groupId}`,
      label: "Tablero Kanban",
      icon: Kanban,
      groupId,
      type: "kanban",
    },
    {
      id: `users-${groupId}`,
      label: "Miembros",
      icon: Users,
      groupId,
      type: "users",
    },
    {
      id: `reports-${groupId}`,
      label: "Reportes",
      icon: BarChart3,
      groupId,
      type: "reports",
    },
    {
      id: `documents-${groupId}`,
      label: "Documentos",
      icon: FileText,
      groupId,
      type: "documents",
    },
  ];

  const toggleGroupExpansion = (groupId) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // navigate("/"); // Descomenta si usas useNavigate
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleMenuItemClick = (itemId, groupId = null, type = null) => {
    onMenuItemClick(itemId, { groupId, type });
    // En móvil, cierra el sidebar después de seleccionar
    if (window.innerWidth < 1024) {
      onToggleSidebar();
    }
  };

  // Función para renderizar el estado de carga de grupos
  const renderGroupsSection = () => {
    if (isLoadingGroups) {
      return (
        <div className="px-3 py-4 text-center">
          <Loader2 size={24} className="mx-auto text-gray-400 mb-2 animate-spin" />
          <p className="text-sm text-gray-500">Cargando grupos...</p>
        </div>
      );
    }

    if (userGroups.length === 0) {
      return (
        <div className="px-3 py-4 text-center">
          <Folder size={32} className="mx-auto text-gray-300 mb-2" />
          <p className="text-sm text-gray-500 mb-2">
            No tienes grupos aún
          </p>
          <button
            onClick={onCreateGroup}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Crear tu primer grupo
          </button>
        </div>
      );
    }

    return userGroups.map((group) => {
      const isExpanded = expandedGroups.has(group.id);
      const groupMenuItems = getGroupMenuItems(group.id);


      return (
        <div key={group.id} className="space-y-1">
          {/* Group Header */}
          <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
            <button
              onClick={() => toggleGroupExpansion(group.id)}
              className="flex items-center space-x-3 min-w-0 flex-1 text-gray-700"
            >
              <Folder size={18} className="text-gray-500 flex-shrink-0" />
              <div className="min-w-0 text-left">
                <span className="font-medium truncate block">
                  {group.name}
                </span>
                {(group.memberCount || group.taskCount) && (
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    {group.memberCount && <span>{group.memberCount} miembros</span>}
                    {group.taskCount && <span>{group.taskCount} tareas</span>}
                  </div>
                )}
              </div>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Botón eliminar grupo */}
            <button
              onClick={() => {
                if (window.confirm(`¿Seguro que quieres eliminar "${group.name}"?`)) {
                  // `onDeleteGroup` viene de HomeView
                  onDeleteGroup(group.id);
                }
              }}
              disabled={isDeletingGroup}
              className="ml-2 text-red-500 hover:text-red-700 disabled:opacity-50"
              title="Eliminar grupo"
            >
              ✕
            </button>
          </div>

          {/* Group Menu Items */}
          <div
            className={`space-y-1 transition-all duration-200 overflow-hidden ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            {groupMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id, item.groupId, item.type)}
                  className={`w-full flex items-center space-x-3 px-9 py-2 rounded-lg text-left text-sm transition-colors duration-200 ${isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <Icon size={16} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      );

    });
  };

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
        className="lg:hidden fixed top-16 left-4 z-50 p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 shadow
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">
              AgilBan
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-4">


          {/* Sección de Grupos */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Mis Grupos
              </h3>
              <button
                onClick={onCreateGroup}
                disabled={isLoadingGroups}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Crear nuevo grupo"
              >
                <Plus size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Lista de Grupos */}
            {renderGroupsSection()}
          </div>

          {/* Configuración Personal */}
          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Settings size={20} />
                <span className="font-medium">Configuración</span>
              </div>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${isSettingsOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Settings Items */}
            <div
              className={`
              mt-2 space-y-1 transition-all duration-200 overflow-hidden
              ${isSettingsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
            `}
            >
              {settingsItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`
                    w-full text-left px-9 py-2 text-sm rounded-lg transition-colors duration-200
                    ${activeItem === item.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* User Footer */}
        <div className="border-t border-gray-200 p-4 bottom-0">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {auth.currentUser?.displayName || "Usuario"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {auth.currentUser?.email || "usuario@example.com"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;