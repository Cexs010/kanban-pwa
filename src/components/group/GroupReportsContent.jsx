import { BarChart3 } from "lucide-react";

const ProgressCard = ({ title, completed, total, percentage }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">Tareas Completadas</span>
        <span className="text-green-600 font-bold">
          {completed}/{total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gray-300 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-sm text-gray-500">
        Los reportes se actualizarán cuando agregues tareas
      </p>
    </div>
  </div>
);

const ActivityCard = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <h2 className="text-xl font-semibold mb-4">Actividad del Grupo</h2>
    <div className="text-center py-8">
      <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
      <p className="text-gray-500">No hay actividad reciente</p>
    </div>
  </div>
);

const GroupReportsContent = ({ groupId, groupName }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Reportes del Grupo</h1>
      <p className="text-gray-600">{groupName}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProgressCard
        title="Progreso del Proyecto"
        completed={0}
        total={0}
        percentage={0}
      />
      <ActivityCard />
    </div>
  </div>
);

export default GroupReportsContent;
