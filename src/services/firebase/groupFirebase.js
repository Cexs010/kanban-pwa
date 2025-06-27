import { 
  addDoc, 
  collection, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  orderBy 
} from "firebase/firestore";
import { db } from "./firebase";
import toast from "react-hot-toast";

export const groupService = {
  createGroup: async (groupName, userId, groups = []) => {
    try {
      // Validaciones
      if (!groupName.trim()) {
        throw new Error("El nombre del grupo no puede estar vacío");
      }

      if (!userId) {
        throw new Error("Debes iniciar sesión para crear grupos");
      }

      // Verificar duplicados
      const groupExists = groups.some(
        (group) => group.name.toLowerCase() === groupName.trim().toLowerCase()
      );

      if (groupExists) {
        throw new Error("Ya existe un grupo con ese nombre");
      }

      // Crear el objeto grupo
      const newGroup = {
        name: groupName.trim(),
        description: "", // Descripción vacía por defecto
        createdAt: serverTimestamp(),
        createdBy: userId,
        members: [userId], // El creador es automáticamente miembro
        memberCount: 1,
        taskCount: 0,
        updatedAt: serverTimestamp(),
      };

      // Guardar en Firestore
      const docRef = await addDoc(collection(db, "groups"), newGroup);

      // Retornar el grupo con ID para el estado local
      return {
        id: docRef.id,
        name: newGroup.name,
        description: newGroup.description,
        createdBy: userId,
        members: newGroup.members,
        memberCount: newGroup.memberCount,
        taskCount: newGroup.taskCount,
        createdAt: new Date(), // Para el estado local usamos Date actual
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error("Error en groupService.createGroup:", error);
      toast.error(error.message);
      throw error;
    }
  },

  getUserGroups: async (userId) => {
    try {
      if (!userId) {
        throw new Error("ID de usuario requerido");
      }

      // Query para obtener grupos donde el usuario es miembro
      const q = query(
        collection(db, "groups"),
        where("members", "array-contains", userId),
        orderBy("updatedAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const groups = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        groups.push({
          id: doc.id,
          name: data.name,
          description: data.description || "",
          createdBy: data.createdBy,
          members: data.members || [],
          memberCount: data.memberCount || data.members?.length || 0,
          taskCount: data.taskCount || 0,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        });
      });

      return groups;
    } catch (error) {
      console.error("Error en groupService.getUserGroups:", error);
      toast.error("Error al cargar los grupos");
      throw error;
    }
  },

  // Función auxiliar para actualizar contadores (opcional, para uso futuro)
  updateGroupCounts: async (groupId, updates) => {
    try {
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(groupRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error actualizando contadores del grupo:", error);
      throw error;
    }
  }
};