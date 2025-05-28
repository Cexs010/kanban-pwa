import CTAButton from "../components/CTAButton";

const LandingPage = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-slate-400 mx-auto px-6 py-25 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Gestiona tus proyectos ágiles con{" "}
          <span className="text-cyan-900">AgilBan</span>
        </h1>
        <p className="text-md text-white max-w-2xl mx-auto mb-8">
          Organiza tareas, colabora en equipo y aumenta tu productividad con
          tableros Kanban intuitivos.
        </p>
        <CTAButton to="/register" text="Empieza ahora" />
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ¿Por qué elegir AgilBan?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Sencillo y rápido",
                description:
                  "Configura tu tablero en minutos y comienza a trabajar.",
              },
              {
                icon: "👥",
                title: "Colaboración en equipo",
                description:
                  "Comparte columnas y tareas con tu equipo en tiempo real.",
              },
              {
                icon: "📊",
                title: "Visualización clara",
                description:
                  "Mide el progreso con gráficos y métricas integradas.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-400 p-6 rounded-lg text-center"
              >
                <span className="text-4xl mb-4 inline-block">
                  {feature.icon}
                </span>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyan-900 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          <p>
            © {new Date().getFullYear()} AgilBan. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
