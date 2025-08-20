import { Users, CheckCircle, Clock } from "lucide-react";

const StatCard = ({ title, value, color, icon: Icon, subtitle }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-gray-600">Total</span>
                <span className={`font-bold ${color}`}>{value}</span>
            </div>
            {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
            )}
        </div>
    </div>
);

const DashboardStats = ({ userGroups, onCreateGroup }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resumen de grupos */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Mis Grupos</h2>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total de Grupos</span>
                        <span className="font-bold text-blue-600">{userGroups.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Grupos Activos</span>
                        <span className="font-bold text-green-600">{userGroups.length}</span>
                    </div>
                    {userGroups.length === 0 && (
                        <div className="text-center py-4">
                            <p className="text-gray-500 text-sm">No tienes grupos aún</p>
                            <button
                                onClick={onCreateGroup}
                                className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Crear tu primer grupo
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tareas */}
            <StatCard
                title="Tareas"
                value="0"
                color="text-orange-600"
                icon={Clock}
                subtitle="Las tareas aparecerán cuando crees grupos y proyectos"
            />

            {/* Actividad reciente */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
                <div className="space-y-2">
                    {userGroups.length > 0 ? (
                        userGroups.slice(0, 3).map((group) => (
                            <div key={group.id} className="text-sm text-gray-600">
                                <span className="font-medium">Grupo creado:</span> {group.name}
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
    );
};

export default DashboardStats;