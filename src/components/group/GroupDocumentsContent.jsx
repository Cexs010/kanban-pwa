import { Plus, FileText } from "lucide-react";

const EmptyState = ({ icon: Icon, message, subtitle }) => (
  <div className="text-center py-12">
    <Icon size={48} className="mx-auto text-gray-300 mb-4" />
    <p className="text-gray-500 mb-2">{message}</p>
    <p className="text-sm text-gray-400">{subtitle}</p>
  </div>
);

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
      <EmptyState
        icon={FileText}
        message="No hay documentos en este grupo"
        subtitle="Sube documentos para compartir con tu equipo"
      />
    </div>
  </div>
);

export default GroupDocumentsContent;