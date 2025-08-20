import { useState } from "react";
import { X, Plus } from "lucide-react";

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

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
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
              onChange={handleInputChange}
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
              className="px-4 py-2 text-gray-600 bg-gray-300 hover:text-red-600 font-semibold transition-colors duration-200 rounded-lg"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white font-semibold rounded-lg bg-cyan-900 hover:bg-cyan-700 transition duration-300 disabled:cursor-not-allowed flex items-center space-x-2"
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

export default CreateGroupModal;
