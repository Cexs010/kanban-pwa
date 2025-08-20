import DashboardStats from "./DashboardStats";
import GroupUsersContent from "../group/GroupUsersContent";
import GroupReportsContent from "../group/GroupReportsContent";
import GroupDocumentsContent from "../group/GroupDocumentsContent";
import SettingsContent from "../settings/SettingsContent";

const ContentRenderer = ({
  activeItem,
  currentContext,
  userGroups,
  onCreateGroup,
  navigate
}) => {
  const getCurrentGroupName = () => {
    if (currentContext?.groupId) {
      const group = userGroups.find((g) => g.id === currentContext.groupId);
      return group?.name || "Grupo Desconocido";
    }
    return "";
  };

  const groupName = getCurrentGroupName();

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <DashboardStats
              userGroups={userGroups}
              onCreateGroup={onCreateGroup}
            />
          </div>
        );

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

      case "profile":
        return <SettingsContent title="Mi Perfil" />;

      case "account":
        return <SettingsContent title="Configuración de Cuenta" />;

      case "notifications":
        return <SettingsContent title="Notificaciones" />;

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

  return renderContent();
};

export default ContentRenderer;