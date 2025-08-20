import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import toast from "react-hot-toast";

export const groupService = {
  createGroup: async (groupName, userId, groups = []) => {
    try {
      if (!groupName.trim()) {
        throw new Error("El nombre del grupo no puede estar vacío");
      }

      if (!userId) {
        throw new Error("Debes iniciar sesión para crear grupos");
      }

      const groupExists = groups.some(
        (group) => group.name.toLowerCase() === groupName.trim().toLowerCase()
      );

      if (groupExists) {
        throw new Error("Ya existe un grupo con ese nombre");
      }

      const newGroup = {
        name: groupName.trim(),
        description: "",
        createdAt: serverTimestamp(),
        createdBy: userId,
        members: [userId],
        memberCount: 1,
        taskCount: 0,
        updatedAt: serverTimestamp(),
      };

      const groupDocRef = await addDoc(collection(db, "groups"), newGroup);

      // Crear columnas por defecto en la subcolección "board"
      const boardColumns = [
        { id: "todo", title: "Por hacer", cards: [] },
        { id: "inProgress", title: "En progreso", cards: [] },
        { id: "done", title: "Terminado", cards: [] },
      ];

      for (const column of boardColumns) {
        const columnRef = doc(db, "groups", groupDocRef.id, "board", column.id);
        await setDoc(columnRef, {
          title: column.title,
          cards: column.cards,
        });
      }

      return {
        id: groupDocRef.id,
        name: newGroup.name,
        description: newGroup.description,
        createdBy: userId,
        members: newGroup.members,
        memberCount: newGroup.memberCount,
        taskCount: newGroup.taskCount,
        createdAt: new Date(),
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
  },

  deleteGroup: async (groupId) => {
    try {
      if (!groupId) throw new Error("ID de grupo requerido");

      // 1. Borrar subcolección "board"
      const boardRef = collection(db, "groups", groupId, "board");
      const boardSnapshot = await getDocs(boardRef);

      const deleteBoardPromises = boardSnapshot.docs.map((docSnap) =>
        deleteDoc(docSnap.ref)
      );
      await Promise.all(deleteBoardPromises);

      // 2. Borrar el grupo en sí
      await deleteDoc(doc(db, "groups", groupId));
    } catch (error) {
      console.error("Error eliminando grupo:", error);
      toast.error("No se pudo eliminar el grupo");
      throw error;
    }
  },
};
