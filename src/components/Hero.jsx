import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const ROLES = [
  'Desarrollador Web',
  'Front-end Developer',
  'React Developer',
  'Creador de Sitios Web'
];

const TECHNOLOGIES = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Node.js', 'Supabase', 'Firebase', 'Next.js'
];

const STATS = [
  { value: 1, suffix: '+', label: 'Año', sub: 'de experiencia' },
  { value: 4, suffix: '+', label: 'Proyectos', sub: 'entregados' },
  { value: 100, suffix: '%', label: 'Clientes', sub: 'satisfechos' }
];

// Reusable animated counter
const AnimatedCounter = ({ from = 0, to, duration = 2, inView = true }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration, inView]);

  return <span>{count}</span>;
};

// CSS particles
const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 5 + 5}s`,
  animationDelay: `${Math.random() * 2}s`
}));

export default function Hero() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [text, setText] = useState('');
  
  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setText(ROLES[0]);
      return;
    }
    
    const role = ROLES[currentRole];
    let timeout;
    
    if (isTyping) {
      if (text.length < role.length) {
        timeout = setTimeout(() => {
          setText(role.slice(0, text.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50);
      } else {
        setCurrentRole((prev) => (prev + 1) % ROLES.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [text, isTyping, currentRole, prefersReducedMotion]);

  // Magnetic Button Effect
  const techRef = useRef([]);
  const handleMouseMove = useCallback((e, index) => {
    if (isMobile) return;
    const el = techRef.current[index];
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, [isMobile]);

  const handleMouseLeave = useCallback((index) => {
    if (isMobile) return;
    const el = techRef.current[index];
    if (el) el.style.transform = 'translate(0px, 0px)';
  }, [isMobile]);

  // Split text
  const name = "Albert Rodriguez";
  const nameChars = Array.from(name);

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#070711] pt-20 pb-12 lg:pt-0">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Aurora Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* CSS Floating Particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute w-1.5 h-1.5 bg-white/40 rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] animate-float"
            style={{
              top: p.top,
              left: p.left,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          33% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          66% { transform: translateY(10px) translateX(-15px); opacity: 0.8; }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
        .glow-ring::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 0%, #6366f1 20%, #22D3EE 50%, #8B5CF6 80%, transparent 100%);
          animation: rotate 4s linear infinite;
          z-index: -1;
        }
      `}} />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pointer-events-auto">
          
          {/* Text Content */}
          <div className="flex flex-col space-y-8 order-2 lg:order-1 text-center lg:text-left mt-8 lg:mt-0 relative z-20">
            {/* Status Chip */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 w-max mx-auto lg:mx-0 backdrop-blur-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-indigo-200">Disponible para proyectos</span>
            </motion.div>

            {/* Name & Role */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight flex flex-wrap justify-center lg:justify-start">
                {prefersReducedMotion ? (
                  <span>{name}</span>
                ) : (
                  nameChars.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className={char === ' ' ? 'w-4' : 'inline-block'}
                    >
                      {char}
                    </motion.span>
                  ))
                )}
              </h1>
              <div className="h-8 md:h-12 flex items-center justify-center lg:justify-start">
                <h2 className="text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-semibold h-full flex items-center">
                  {text}
                  <span className="w-[3px] h-[70%] bg-indigo-400 ml-1 animate-pulse"></span>
                </h2>
              </div>
              <p className="text-gray-400 flex items-center justify-center lg:justify-start text-lg mt-2">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                La Guaira · Caracas, Venezuela
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {TECHNOLOGIES.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  ref={el => techRef.current[i] = el}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 font-medium cursor-default transition-colors hover:bg-white/10 hover:border-indigo-500/50 hover:text-white"
                  style={{ transition: 'transform 0.1s ease-out, background 0.3s, border 0.3s' }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 relative z-50"
            >
              <a href="#proyectos" className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold rounded-2xl shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2 group">
                Ver mis proyectos
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#contacto" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95 text-center backdrop-blur-md">
                Contáctame
              </a>
            </motion.div>
          </div>

          {/* Image & Stats */}
          <div className="flex flex-col items-center order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative group"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 glow-ring rounded-full p-1 bg-[#070711]">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#070711] bg-gray-800">
                  <img 
                    src="/inicio.webp" 
                    alt="Albert Rodriguez" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Floating elements on image */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute top-1/4 -left-12 lg:-left-16 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="bg-cyan-500/20 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-white">Desarrollo</p>
                  <p className="text-xs text-gray-400">Front-end</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-1/4 -right-12 lg:-right-16 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="bg-indigo-500/20 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-white">React & Next</p>
                  <p className="text-xs text-gray-400">Experto</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 w-full max-w-lg bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl grid grid-cols-3 gap-4"
            >
              {STATS.map((stat, i) => (
                <div key={i} className="text-center relative">
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-1">
                    <AnimatedCounter to={stat.value} duration={2} />
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-sm md:text-base font-medium text-indigo-300">{stat.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.sub}</p>
                  {i !== STATS.length - 1 && (
                    <div className="absolute top-1/4 bottom-1/4 right-0 w-px bg-white/10" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Descubre</p>
        <a href="#proyectos" className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center p-2 hover:border-indigo-400/50 transition-colors">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-indigo-400 rounded-full"
          />
        </a>
      </motion.div>
    </section>
  );
}
