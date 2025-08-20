import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import CreateGroupModal from "../components/group/CreateGroupModal";
import ContentRenderer from "../components/content/ContentRenderer";
import { useUserGroups } from "../hooks/useUserGroups";
import { useGroupOperations } from "../hooks/useGroupOperations";

const HomeView = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentContext, setCurrentContext] = useState(null);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  const navigate = useNavigate();
  const { userGroups, isLoadingGroups, setUserGroups } = useUserGroups();
  const { handleCreateGroup, handleDeleteGroup, isCreatingGroup, isDeletingGroup } = useGroupOperations(
    userGroups,
    setUserGroups 
  );

  const handleMenuItemClick = (itemId, context = null) => {
    setActiveItem(itemId);
    setCurrentContext(context);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeItem={activeItem}
        onMenuItemClick={handleMenuItemClick}
        isOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        userGroups={userGroups}
        onCreateGroup={() => setIsCreateGroupModalOpen(true)}
        onDeleteGroup={handleDeleteGroup}
        isLoadingGroups={isLoadingGroups}
        isDeletingGroup={isDeletingGroup}
      />

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <ContentRenderer
            activeItem={activeItem}
            currentContext={currentContext}
            userGroups={userGroups}
            onCreateGroup={() => setIsCreateGroupModalOpen(true)}
            navigate={navigate}
          />
        </div>
      </main>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onCreateGroup={async (groupName) => {
          await handleCreateGroup(groupName);
          setIsCreateGroupModalOpen(false);
        }}
        isLoading={isCreatingGroup}
      />
    </div>
  );
};

export default HomeView;
