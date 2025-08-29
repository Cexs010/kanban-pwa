import { 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  getDocs, 
  getDoc, 
  collection, 
  query, 
  where, 
  increment 
} from "firebase/firestore";
import { db } from "./firebase";

// 🔹 Invitar miembro por email
export const inviteMember = async (groupId, email) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Usuario no encontrado");
    }

    const userDoc = querySnapshot.docs[0];
    const userId = userDoc.id;

    const groupRef = doc(db, "groups", groupId);
    await updateDoc(groupRef, {
      members: arrayUnion(userId),
      memberCount: increment(1), // 🔹 importante
      updatedAt: new Date()
    });

    return { success: true, userId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 🔹 Eliminar miembro por ID
export const removeMember = async (groupId, userId) => {
  try {
    const groupRef = doc(db, "groups", groupId);
    await updateDoc(groupRef, {
      members: arrayRemove(userId),
      memberCount: increment(-1), // 🔹 importante
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 🔹 Obtener todos los miembros del grupo
export const getMembers = async (groupId) => {
  try {
    const groupRef = doc(db, "groups", groupId);
    const groupSnap = await getDoc(groupRef);

    if (!groupSnap.exists()) return [];

    const { members } = groupSnap.data();
    if (!members || members.length === 0) return [];

    // ⚠️ Firestore limita a 10 en "in"
    const chunks = [];
    for (let i = 0; i < members.length; i += 10) {
      chunks.push(members.slice(i, i + 10));
    }

    let allUsers = [];
    for (const chunk of chunks) {
      const q = query(collection(db, "users"), where("__name__", "in", chunk));
      const querySnap = await getDocs(q);
      allUsers = allUsers.concat(querySnap.docs.map(d => ({ id: d.id, ...d.data() })));
    }

    return allUsers;
  } catch (error) {
    console.error("Error obteniendo miembros:", error);
    return [];
  }
};
