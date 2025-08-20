import { useParams, useLocation } from "react-router-dom";
import KanbanBoard from "../components/kanban/KanbanBoard";

const KanbanView = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const groupName = location.state?.groupName || "Sin nombre"; // Por si no viene

  return <KanbanBoard groupId={groupId} groupName={groupName} />;

};

export default KanbanView;
