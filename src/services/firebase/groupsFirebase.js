import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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
        createdAt: serverTimestamp(),
        createdBy: userId,
        members: [userId],
        updatedAt: serverTimestamp(),
      };

      // Guardar en Firestore
      const docRef = await addDoc(collection(db, "groups"), newGroup);

      return {
        id: docRef.id,
        ...newGroup,
      };
    } catch (error) {
      console.error("Error en groupService:", error);
      toast.error(error.message);
      throw error; // Re-lanzamos el error para manejarlo en el componente
    }
  },
};
