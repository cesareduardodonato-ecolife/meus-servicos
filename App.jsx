import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float, OrbitControls } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Terminal, Code, Database, Globe, ChevronDown, Send, Layers, Cpu } from 'lucide-react';

// ==========================================
// 1. COMPONENTES 3D (O "Coração" Imersivo)
// ==========================================

const AnimatedShape = () => {
  const meshRef = useRef();

  // Anima a rotação do objeto sutilmente com base no tempo
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#4f46e5" // Azul indigo tech
          attach="material"
          distort={0.4} // Intensidade da distorção abstrata
          speed={2} // Velocidade do movimento da malha
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const Background3D = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gray-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
        
        <AnimatedShape />
        
        {/* Adiciona reflexos e iluminação de ambiente realista */}
        <Environment preset="city" />
        
        {/* Permite que o usuário gire levemente o fundo (com limites para não estragar a cena) */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2 + 0.2} 
          minPolarAngle={Math.PI / 2 - 0.2} 
        />
      </Canvas>
    </div>
  );
};

// ==========================================
// 2. COMPONENTES DE INTERFACE (Frontend UI)
// ==========================================

const HeroSection = () => (
  <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md text-indigo-300 text-sm font-semibold tracking-wider uppercase">
        Inovação & Alta Performance
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
        Construindo o futuro do <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Software</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
        Especialista em criar soluções imersivas, escaláveis e de alto impacto. 
        Do backend robusto às interfaces 3D interativas, eu transformo a visão da sua empresa em realidade tecnológica.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#contato" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 transition-all text-white rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2">
          Iniciar Projeto <Code size={20} />
        </a>
        <a href="#tecnologias" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all text-white rounded-lg font-bold text-lg flex items-center gap-2">
          Explorar Stack <Layers size={20} />
        </a>
      </div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 animate-bounce text-gray-400"
    >
      <ChevronDown size={32} />
    </motion.div>
  </section>
);

const TechStackSection = () => {
  const techs = [
    { name: "Frontend Dinâmico", icon: <Globe className="text-cyan-400" size={32} />, desc: "React, Vue, Three.js, Tailwind" },
    { name: "Backend & APIs", icon: <Terminal className="text-green-400" size={32} />, desc: "Node.js, Express, Python, GraphQL" },
    { name: "Dados & Escala", icon: <Database className="text-blue-400" size={32} />, desc: "PostgreSQL, MongoDB, Redis" },
    { name: "DevOps & Cloud", icon: <Cpu className="text-purple-400" size={32} />, desc: "AWS, Docker, CI/CD" },
  ];

  return (
    <section id="tecnologias" className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ecossistema de Tecnologias</h2>
          <p className="text-gray-400 text-lg">As ferramentas certas para resolver problemas complexos com eficiência.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techs.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl flex flex-col items-center text-center group cursor-default"
            >
              <div className="bg-gray-800/80 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                {tech.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
              <p className="text-gray-400 text-sm">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
// ==========================================
// SEÇÃO DE PROJETOS (A Prova Social)
// ==========================================

const ProjectsSection = () => {
  const { scrollYProgress } = useScroll();
  
  // Cria um efeito sutil onde os elementos sobem levemente enquanto a tela desce
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const projects = [
    {
      title: "Motor Verde: Mobilidade Sustentável",
      description: "Aplicativo multiplataforma para gestão de mobilidade urbana inteligente. Integração de rotas, telemetria em tempo real e backend analítico para redução da pegada de carbono.",
      techs: ["Unity", "Flutter", "Python", "Node.js"],
      featured: true, // Card maior
      color: "from-emerald-500/20 to-teal-900/40",
      border: "border-emerald-500/30"
    },
    {
      title: "Pet Personale",
      description: "Plataforma comercial para banho e tosa. Sistema de agendamento online, gestão de clientes e interface responsiva focada na conversão de serviços locais.",
      techs: ["React", "Express", "MongoDB"],
      featured: false,
      color: "from-indigo-500/20 to-blue-900/40",
      border: "border-indigo-500/30"
    },
    {
      title: "Automação Industrial & IoT",
      description: "Dashboard para monitoramento de infraestrutura mecânica e elétrica. Coleta de dados de sensores, análise de falhas preditivas e controle de sistemas de ar comprimido.",
      techs: ["React", "PostgreSQL", "C++"],
      featured: false,
      color: "from-rose-500/20 to-orange-900/40",
      border: "border-rose-500/30"
    }
  ];

  return (
    <section id="projetos" className="min-h-screen py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Soluções em Ação</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Arquitetura de software aplicada para resolver desafios reais. Da automação industrial à mobilidade urbana.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              style={{ y: project.featured ? yParallaxSlow : yParallaxFast }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                relative overflow-hidden rounded-2xl border p-8 flex flex-col justify-between group
                bg-gradient-to-br ${project.color} ${project.border}
                ${project.featured ? 'md:col-span-2 min-h-[350px]' : 'min-h-[300px]'}
                hover:border-white/40 transition-colors duration-500 backdrop-blur-md
              `}
            >
              {/* Efeito de brilho ao passar o mouse */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-gray-300 md:text-lg leading-relaxed mb-8 max-w-3xl">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-xs font-mono text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const ContactTerminal = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    // Aqui conectaremos com o Backend (Node/Express) posteriormente!
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contato" className="py-20 px-4 min-h-screen flex items-center justify-center relative">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gray-950 rounded-xl overflow-hidden shadow-2xl border border-gray-800 font-mono"
        >
          {/* Header do Terminal */}
          <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs text-gray-500">guest@portfolio: ~/iniciar-projeto</div>
          </div>

          {/* Corpo do Terminal */}
          <div className="p-6 md:p-8">
            <p className="text-green-400 mb-6">
              $ ./conectar.sh<br/>
              <span className="text-gray-400">Iniciando protocolo de handshake. Insira seus dados para estabelecer conexão:</span>
            </p>

            {status === 'success' ? (
              <div className="text-cyan-400 animate-pulse">
                &gt; CONEXÃO ESTABELECIDA COM SUCESSO!<br/>
                &gt; Seus dados foram registrados. Retornarei o ping em breve.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <span className="text-pink-500 font-bold">&gt; const</span>
                  <span className="text-blue-400">nome</span>
                  <span className="text-white">=</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="flex-1 bg-transparent border-b border-gray-700 text-green-300 focus:outline-none focus:border-green-500 py-1"
                    placeholder="'Seu Nome'"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <span className="text-pink-500 font-bold">&gt; const</span>
                  <span className="text-blue-400">email</span>
                  <span className="text-white">=</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="flex-1 bg-transparent border-b border-gray-700 text-green-300 focus:outline-none focus:border-green-500 py-1"
                    placeholder="'seu@email.com'"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex gap-2">
                    <span className="text-pink-500 font-bold">&gt; const</span>
                    <span className="text-blue-400">mensagem</span>
                    <span className="text-white">=</span>
                  </div>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="3"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-green-300 focus:outline-none focus:border-green-500 resize-none mt-2"
                    placeholder="`Descreva como posso te ajudar...`"
                  ></textarea>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-950 px-6 py-2 rounded transition-all font-bold flex items-center gap-2"
                  >
                    {status === 'submitting' ? 'PROCESSANDO...' : 'EXECUTAR_ENVIO()'} 
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// 3. APLICAÇÃO PRINCIPAL (Montagem)
// ==========================================

export default function App() {
  return (
    <div className="relative font-sans text-white selection:bg-indigo-500/30">
      {/* Background Imersivo fixo atrás de tudo */}
      <Background3D />

      {/* Conteúdo rolável por cima (Glassmorphism) */}
      <div className="relative z-10 w-full h-full overflow-x-hidden">
        <HeroSection />
        
        {/* Divisor de seção suave */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50"></div>
        
        <TechStackSection />
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50"></div>
        
        <ContactTerminal />
        
        {/* Footer */}
        <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-800 bg-gray-950/80 backdrop-blur-md">
          <p>© {new Date().getFullYear()} Desenvolvido com React, Three.js & Node.js</p>
        </footer>
      </div>
    </div>
  );
}
