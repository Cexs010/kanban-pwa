import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(getAuthError(error.code));
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw new Error(getAuthError(error.code));
  }
};

const getAuthError = (code) => {
  const errors = {
    "auth/invalid-email": "Correo electrónico no válido",
    "auth/user-disabled": "Cuenta desactivada",
    "auth/user-not-found": "Usuario no registrado",
    "auth/wrong-password": "Contraseña incorrecta",
    "auth/popup-closed-by-user": "Inicio de sesión cancelado",
  };
  return errors[code] || "Error al iniciar sesión";
};



