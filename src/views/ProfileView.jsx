import { useAuth } from "../app/context/AuthContext"; // Ajusta si tu ruta es diferente

const ProfileView = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-600">
        Cargando información del usuario...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Perfil de Usuario</h2>
      <div className="space-y-4">
        <div>
          <strong>Nombre:</strong>
          <p>{user.displayName || "No especificado"}</p>
        </div>
        <div>
          <strong>Correo electrónico:</strong>
          <p>{user.email}</p>
        </div>
        <div>
          <strong>Email verificado:</strong>
          <p>{user.emailVerified ? "Sí" : "No"}</p>
        </div>
        <div>
          <strong>UID:</strong>
          <p className="break-words">{user.uid}</p>
        </div>
        <div>
          <strong>Fecha de creación:</strong>
          <p>{new Date(user.metadata.creationTime).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
