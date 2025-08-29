import { Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { inviteMember, removeMember, getMembers } from "../../services/firebase/membersFirebase";
import toast from "react-hot-toast";
import InviteMemberModal from "./InviteMemberModal";

const GroupUsersContent = ({ groupId, groupName }) => {
  const [members, setMembers] = useState([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadMembers = async () => {
    const data = await getMembers(groupId);
    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, [groupId]);

  const handleInvite = async (email) => {
    setIsLoading(true);
    const result = await inviteMember(groupId, email);
    setIsLoading(false);

    if (result.success) {
      toast.success("Miembro agregado con éxito");
      loadMembers(); // refrescar
      setIsInviteOpen(false);
    } else {
      toast.error(result.error);
      console.log(result.error);
      console.log(groupId, email);
    }
  };

  const handleRemove = async (userId) => {
    const result = await removeMember(groupId, userId);
    if (result.success) {
      toast.success("Miembro eliminado");
      loadMembers();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Miembros del Grupo</h1>
          <p className="text-gray-600">{groupName}</p>
        </div>
        <button 
          onClick={() => setIsInviteOpen(true)}
          className="text-white bg-cyan-900 hover:bg-cyan-700 transition duration-300 font-medium rounded-lg text-sm h-12 px-4 flex items-center space-x-2"
        >
          <Plus size={15} /> 
          <span>Invitar Miembro</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {members.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {members.map(m => (
              <li key={m.id} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">{m.displayName || m.email}</p>
                  <p className="text-sm text-gray-500">{m.email}</p>
                </div>
                <button
                  onClick={() => handleRemove(m.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No hay miembros aún</p>
          </div>
        )}
      </div>

      <InviteMemberModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onInvite={handleInvite}
        isLoading={isLoading}
      />
    </div>
  );
};

export default GroupUsersContent;
