import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../app/context/AuthContext";
import { groupService } from "../../services/firebase/groupsFirebase";
import toast from "react-hot-toast";

const SidebarKanban = ({
  groups = [],
  onSelectGroup,
  selectedGroupId,
  onCreateGroup,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useAuth();

  const handleCreateGroup = async () => {
    try {
      setIsCreating(true);

      // Usamos el servicio de grupos
      const createdGroup = await groupService.createGroup(
        newGroupName,
        user?.uid,
        groups
      );

      toast.success(`Grupo "${createdGroup.name}" creado exitosamente`);

      setNewGroupName("");
      setShowModal(false);

      // Llamamos a onCreateGroup si existe, o a onSelectGroup como fallback
      if (typeof onCreateGroup === "function") {
        onCreateGroup(createdGroup);
      } else if (typeof onSelectGroup === "function") {
        onSelectGroup(createdGroup.id);
      }
    } catch (error) {
      // Los errores ya se manejan en el servicio
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-16 left-0 z-40 h-screen w-64 p-4 bg-cyan-900 text-white border border-gray-300 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
         `}
      >
        {/* Contenido del sidebar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Grupos</h2>
          <button
            className="md:hidden bg-white text-black hover:bg-gray-300 p-1 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <ul className="space-y-2">
          {groups.length > 0 ? (
            groups.map((group) => (
              <li
                key={group.id}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                  selectedGroupId === group.id
                    ? "bg-gray-700"
                    : "hover:bg-gray-800"
                }`}
                onClick={() => onSelectGroup(group.id)}
              >
                {group.name}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-400">No hay grupos aún.</li>
          )}
        </ul>

        <div className="mt-8">
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Crear grupo
          </button>
        </div>
      </aside>

      {/* Modal para crear grupo - Sin fondo oscuro */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Nuevo grupo
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewGroupName("");
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                disabled={isCreating}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="groupName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre del grupo
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Ingresa el nombre del grupo"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  autoFocus
                  disabled={isCreating}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateGroup()}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNewGroupName("");
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  disabled={isCreating}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateGroup}
                  disabled={!newGroupName.trim() || isCreating}
                  className={`px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors ${
                    isCreating ? "opacity-70 cursor-not-allowed" : ""
                  } ${
                    !newGroupName.trim() ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isCreating ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creando...
                    </span>
                  ) : (
                    "Crear grupo"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante para abrir el sidebar */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-17 left-4 z-50 bg-white text-black hover:bg-gray-300 p-2 rounded-full shadow-md transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
};

export default SidebarKanban;
