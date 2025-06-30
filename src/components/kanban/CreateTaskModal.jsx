import { useState } from "react";
import { X, Plus } from "lucide-react";

const ModalNuevaTarea = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit({ content: content.trim(), description: description.trim() });
    setContent("");
    setDescription("");
    onClose();
  };

  const handleClose = () => {
    setContent("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Nueva Tarea</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título de la tarea
            </label>
            <input
              type="text"
              placeholder="Escribe el título"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción (opcional)
            </label>
            <textarea
              placeholder="Detalles adicionales..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 bg-gray-300 hover:text-red-600 font-semibold transition-colors duration-200 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white font-semibold rounded-lg bg-cyan-900 hover:bg-cyan-700 transition duration-300 disabled:cursor-not-allowed flex items-center space-x-2"
              disabled={!content.trim()}
            >
              <Plus size={16} />
              <span>Crear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNuevaTarea;
