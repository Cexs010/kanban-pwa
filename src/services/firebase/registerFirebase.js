import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

// Registro con email/contraseña
export const registerWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Actualizar perfil del usuario
    await updateProfile(auth.currentUser, {
      displayName: displayName
    });

    // Crear documento en Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      displayName,
      email,
      createdAt: new Date(),
      isAdmin: false
    });

    return userCredential.user;
  } catch (error) {
    throw new Error(getAuthError(error.code));
  }
};

// Login con Google (ya existente)
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Verificar si es nuevo usuario
    if (result._tokenResponse.isNewUser) {
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        createdAt: new Date(),
        isAdmin: false
      });
    }
    
    return result.user;
  } catch (error) {
    throw new Error(getAuthError(error.code));
  }
};

// Función para traducir errores
const getAuthError = (code) => {
  const errors = {
    'auth/email-already-in-use': 'El correo ya está registrado',
    'auth/invalid-email': 'Correo electrónico no válido',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/operation-not-allowed': 'Operación no permitida',
    // ... otros códigos de error
  };
  return errors[code] || 'Error en el registro';
};