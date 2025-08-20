import { useState } from "react";
import { auth } from "../services/firebase/firebase";
import { groupService } from "../services/firebase/groupFirebase";
import toast from "react-hot-toast";

export const useGroupOperations = (userGroups, setUserGroups) => {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isDeletingGroup, setIsDeletingGroup] = useState(null); // ahora guarda el ID del grupo que se está eliminando

  // Crear grupo
  const handleCreateGroup = async (groupName) => {
    try {
      setIsCreatingGroup(true);
      const user = auth.currentUser;

      if (!user) {
        toast.error("Debes iniciar sesión para crear grupos");
        return;
      }

      const newGroup = await groupService.createGroup(
        groupName,
        user.uid,
        userGroups
      );

      setUserGroups((prev) => [...prev, newGroup]); // actualizar lista local
      toast.success(`Grupo "${groupName}" creado exitosamente`);
    } catch (error) {
      console.error("Error creando grupo:", error);
    } finally {
      setIsCreatingGroup(false);
    }
  };

  // Eliminar grupo
  const handleDeleteGroup = async (groupId) => {
    try {
      setIsDeletingGroup(groupId); // activar loading solo para este grupo
      const user = auth.currentUser;

      if (!user) {
        toast.error("Debes iniciar sesión para eliminar grupos");
        return;
      }

      await groupService.deleteGroup(groupId);

      setUserGroups((prev) => prev.filter((group) => group.id !== groupId)); // actualizar estado local
      toast.success("Grupo eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando grupo:", error);
    } finally {
      setIsDeletingGroup(null); // desactivar loading
    }
  };

  return {
    handleCreateGroup,
    handleDeleteGroup,
    isCreatingGroup,
    isDeletingGroup,
  };
};
