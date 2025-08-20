import { Plus, Users } from "lucide-react";

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

export default GroupUsersContent;
