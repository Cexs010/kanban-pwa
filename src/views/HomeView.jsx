import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase/firebase";
import { groupService } from "../services/firebase/groupFirebase";
import Sidebar from "../components/kanban/Sidebar";
import { Plus, Users, FileText, BarChart3, Kanban, X } from "lucide-react";
import toast from "react-hot-toast";

// Componente de Miembros específico de grupo
const GroupUsersContent = ({ groupId, groupName }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Miembros del Grupo</h1>
        <p className="text-gray-600">{groupName}</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
        <Plus size={20} />
        <span>Invitar Miembro</span>
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <div className="text-center py-8">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-2">
            Esta funcionalidad estará disponible próximamente
          </p>
          <p className="text-sm text-gray-400">
            Podrás invitar y gestionar miembros del grupo aquí
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Componente de Reportes específico de grupo
const GroupReportsContent = ({ groupId, groupName }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Reportes del Grupo</h1>
      <p className="text-gray-600">{groupName}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Progreso del Proyecto</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Tareas Completadas</span>
            <span className="text-green-600 font-bold">0/0</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-300 h-2 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            Los reportes se actualizarán cuando agregues tareas
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Actividad del Grupo</h2>
        <div className="text-center py-8">
          <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No hay actividad reciente</p>
        </div>
      </div>
    </div>
  </div>
);

// Componente de Documentos específico de grupo
const GroupDocumentsContent = ({ groupId, groupName }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Documentos del Grupo
        </h1>
        <p className="text-gray-600">{groupName}</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
        <Plus size={20} />
        <span>Subir Documento</span>
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="text-center py-12">
        <FileText size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 mb-2">No hay documentos en este grupo</p>
        <p className="text-sm text-gray-400">
          Sube documentos para compartir con tu equipo
        </p>
      </div>
    </div>
  </div>
);

// Modal para crear nuevo grupo
const CreateGroupModal = ({ isOpen, onClose, onCreateGroup, isLoading }) => {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      await onCreateGroup(groupName.trim());
      setGroupName("");
    }
  };

  const handleClose = () => {
    setGroupName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Crear Nuevo Grupo
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label
              htmlFor="groupName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre del Grupo
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa el nombre del grupo"
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              disabled={isLoading || !groupName.trim()}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creando...</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Crear Grupo</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const HomeView = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentContext, setCurrentContext] = useState(null);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const navigate = useNavigate();
  
  // Estado para grupos del usuario
  const [userGroups, setUserGroups] = useState([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(true);

  // Cargar grupos del usuario al montar el componente
  useEffect(() => {
    const loadUserGroups = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setIsLoadingGroups(true);
          const groups = await groupService.getUserGroups(user.uid);
          setUserGroups(groups);
        } else {
          // Si no hay usuario autenticado, limpiar grupos
          setUserGroups([]);
        }
      } catch (error) {
        console.error("Error cargando grupos del usuario:", error);
        setUserGroups([]);
      } finally {
        setIsLoadingGroups(false);
      }
    };

    // Escuchar cambios en el estado de autenticación
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadUserGroups();
      } else {
        setUserGroups([]);
        setIsLoadingGroups(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMenuItemClick = (itemId, context = null) => {
    setActiveItem(itemId);
    setCurrentContext(context);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateGroup = async (groupName) => {
    try {
      setIsCreatingGroup(true);
      const user = auth.currentUser;

      if (!user) {
        toast.error("Debes iniciar sesión para crear grupos");
        return;
      }

      // Crear el grupo usando el servicio
      const newGroup = await groupService.createGroup(
        groupName,
        user.uid,
        userGroups
      );

      // Agregar el nuevo grupo al estado local
      setUserGroups((prevGroups) => [newGroup, ...prevGroups]);

      // Cerrar el modal
      setIsCreateGroupModalOpen(false);

      // Mostrar mensaje de éxito
      toast.success(`Grupo "${groupName}" creado exitosamente`);
    } catch (error) {
      console.error("Error creando grupo:", error);
      // El error ya se muestra en el servicio via toast
    } finally {
      setIsCreatingGroup(false);
    }
  };

  const openCreateGroupModal = () => {
    setIsCreateGroupModalOpen(true);
  };

  const closeCreateGroupModal = () => {
    setIsCreateGroupModalOpen(false);
  };

  // Función para obtener el nombre del grupo actual
  const getCurrentGroupName = () => {
    if (currentContext?.groupId) {
      const group = userGroups.find((g) => g.id === currentContext.groupId);
      return group?.name || "Grupo Desconocido";
    }
    return "";
  };

  // Función para renderizar el contenido basado en la opción activa
  const renderContent = () => {
    const groupName = getCurrentGroupName();

    switch (activeItem) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Resumen de grupos */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Mis Grupos</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total de Grupos</span>
                    <span className="font-bold text-blue-600">
                      {userGroups.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Grupos Activos</span>
                    <span className="font-bold text-green-600">
                      {userGroups.length}
                    </span>
                  </div>
                  {userGroups.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">
                        No tienes grupos aún
                      </p>
                      <button
                        onClick={openCreateGroupModal}
                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Crear tu primer grupo
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Tareas pendientes */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Tareas</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pendientes</span>
                    <span className="font-bold text-orange-600">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completadas</span>
                    <span className="font-bold text-green-600">0</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Las tareas aparecerán cuando crees grupos y proyectos
                  </p>
                </div>
              </div>

              {/* Actividad reciente */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Actividad Reciente
                </h2>
                <div className="space-y-2">
                  {userGroups.length > 0 ? (
                    userGroups.slice(0, 3).map((group) => (
                      <div key={group.id} className="text-sm text-gray-600">
                        <span className="font-medium">Grupo creado:</span>{" "}
                        {group.name}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 text-center py-4">
                      No hay actividad reciente
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      // Contenido específico de grupos
      case `kanban-${currentContext?.groupId}`:
        navigate(`/kanban/${currentContext.groupId}`, {
          state: { groupName },
        });
        return null;

      case `users-${currentContext?.groupId}`:
        return (
          <GroupUsersContent
            groupId={currentContext.groupId}
            groupName={groupName}
          />
        );

      case `reports-${currentContext?.groupId}`:
        return (
          <GroupReportsContent
            groupId={currentContext.groupId}
            groupName={groupName}
          />
        );

      case `documents-${currentContext?.groupId}`:
        return (
          <GroupDocumentsContent
            groupId={currentContext.groupId}
            groupName={groupName}
          />
        );

      // Configuración personal
      case "profile":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Configuración de perfil en desarrollo...
                </p>
              </div>
            </div>
          </div>
        );

      case "account":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Configuración de Cuenta
            </h1>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Configuración de cuenta en desarrollo...
                </p>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Configuración de notificaciones en desarrollo...
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p>Bienvenido a tu dashboard...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeItem={activeItem}
        onMenuItemClick={handleMenuItemClick}
        isOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        userGroups={userGroups}
        onCreateGroup={openCreateGroupModal}
        isLoadingGroups={isLoadingGroups}
      />

      {/* Contenido principal */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>

      {/* Modal para crear grupo */}
      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={closeCreateGroupModal}
        onCreateGroup={handleCreateGroup}
        isLoading={isCreatingGroup}
      />
    </div>
  );
};

export default HomeView;
