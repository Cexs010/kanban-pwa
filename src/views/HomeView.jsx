import { useState } from "react";
import SidebarKanban from "../components/kanban/SidebarKanban";
import { useGroups } from "../app/hooks/useGroups"; 

const HomeView = () => {
  const { groups, loading, error } = useGroups(); 
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId);
  };

  const handleGroupCreated = (newGroup) => {
    console.log("Nuevo grupo creado:", newGroup);
    setSelectedGroupId(newGroup.id);
  };

  return (
    <div className="flex h-screen">
      <SidebarKanban
        groups={groups}
        onSelectGroup={handleSelectGroup}
        selectedGroupId={selectedGroupId}
        onCreateGroup={handleGroupCreated}
      />
      
      {/* Contenido principal */}
      <main className="flex-1 overflow-auto">
        {/* ... */}
      </main>
    </div>
  );
};

export default HomeView;