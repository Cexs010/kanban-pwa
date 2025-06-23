import { useState, useEffect } from 'react';
import { ChevronRight, Rocket, Users, BarChart3, CheckCircle, ArrowRight, Star } from 'lucide-react';

const CTAButton = ({ to, text, variant = 'primary', className = '' }) => {
  const baseClasses = "inline-flex items-center px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4";
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl focus:ring-cyan-300",
    secondary: "bg-white text-cyan-600 border-2 border-cyan-600 hover:bg-cyan-50 shadow-lg hover:shadow-xl focus:ring-cyan-300"
  };
  
  return (
    <a href={to} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {text}
      <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="bg-gradient-to-br from-cyan-400 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-cyan-100 leading-relaxed">{description}</p>
    </div>
  );
};

const AnimatedCounter = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < end) {
          return prev + Math.ceil(end / 100);
        }
        return end;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white mb-2">{count.toLocaleString()}+</div>
      <div className="text-cyan-200">{label}</div>
    </div>
  );
};

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-[80vh] bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-bounce" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium backdrop-blur-sm border border-cyan-500/30">
              <Star className="w-4 h-4 mr-2" />
              AgilBan
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Gestiona tus proyectos{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              ágiles
            </span>{" "}
            con <span className="text-cyan-400">AgilBan</span>
          </h1>
          
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Revoluciona tu productividad con tableros Kanban intuitivos, colaboración en tiempo real 
            y análisis avanzados que impulsan el éxito de tu equipo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <CTAButton to="/register" text="Unete ahora" />
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Por qué elegir <span className="text-cyan-400">AgilBan</span>?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Descubre las características que hacen de AgilBan la elección perfecta para equipos modernos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <FeatureCard
              icon={Rocket}
              title="Configuración Instantánea"
              description="Crea tu primer tablero en menos de 60 segundos. Sin configuraciones complejas, solo resultados inmediatos."
              delay={100}
            />
            <FeatureCard
              icon={Users}
              title="Colaboración Avanzada"
              description="Sincronización en tiempo real, comentarios inteligentes y notificaciones que mantienen a tu equipo conectado."
              delay={200}
            />
            <FeatureCard
              icon={BarChart3}
              title="Análisis Inteligente"
              description="Métricas automáticas, informes personalizables y insights que revelan el verdadero rendimiento de tu equipo."
              delay={300}
            />
          </div>

          {/* Benefits List */}
          <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-3xl p-12 border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Todo lo que necesitas en una sola plataforma
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Tableros Kanban personalizables",
                "Colaboración en tiempo real",
                "Plantillas predefinidas",
                "Integraciones con herramientas populares",
                "Informes y análisis avanzados",
                "Soporte 24/7 en español",
                "Seguridad empresarial",
                "Apps móviles nativas"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">AgilBan</h3>
              <p className="text-slate-400">La evolución de la gestión de proyectos</p>
            </div>
            <div className="flex space-x-8">
              <a href="/privacy" className="hover:text-cyan-400 transition-colors">Privacidad</a>
              <a href="/terms" className="hover:text-cyan-400 transition-colors">Términos</a>
              <a href="/support" className="hover:text-cyan-400 transition-colors">Soporte</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-500">
              © {new Date().getFullYear()} AgilBan. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;