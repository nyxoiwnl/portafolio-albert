import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export default function About() {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { num: '1+', label: 'Año', sub: 'de experiencia activa' },
    { num: '4+', label: 'Proyectos', sub: 'entregados online' },
    { num: '100%', label: 'Clientes', sub: 'satisfechos' }
  ];

  const timeline = [
    { year: '2025', title: 'Inicio en desarrollo web', desc: 'Primeros proyectos con React y Tailwind' },
    { year: '2025', title: 'Lanzamiento de proyectos comerciales', desc: 'Inversiones Duvan, JJ Logistic, SafePet' },
    { year: '2026', title: 'Desarrollo SaaS', desc: 'VentaPulse: plataforma de gestión empresarial' },
    { year: '2026', title: 'Expansión de servicios', desc: 'Más clientes y soluciones personalizadas' }
  ];

  const methodology = ['Análisis', 'Diseño', 'Desarrollo', 'Entrega'];
  const tools = ['Git & GitHub', 'Vercel', 'VS Code', 'Responsive Design'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="sobre-mi" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background glow elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center md:text-left mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="text-cyan-400 font-semibold tracking-wider uppercase text-sm mb-2 block">
            Sobre mí
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
            El dev <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400">
              detrás del código
            </span>
          </motion.h2>
        </motion.div>

        {/* Main Content: Photo & Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-20">
          {/* Photo */}
          <motion.div 
            className="lg:col-span-5 flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl p-1 overflow-hidden group">
              {/* Rotating Gradient Border */}
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_270deg,#6366f1_360deg)] group-hover:bg-[conic-gradient(from_0deg,transparent_0_270deg,#22D3EE_360deg)] transition-all duration-500" />
              
              {/* Inner background to mask the gradient center */}
              <div className="absolute inset-1 bg-[#070711] rounded-[22px] z-10" />

              {/* Image */}
              <img 
                src="/Albert.webp" 
                onError={(e) => { e.currentTarget.src = '/Albert.png'; }}
                alt="Albert Rodriguez - Desarrollador Web" 
                className="relative z-20 w-full h-full object-cover rounded-[20px] grayscale hover:grayscale-0 transition-all duration-500"
              />

              {/* Badge */}
              <div className="absolute top-5 right-5 z-30 bg-[#070711]/80 text-cyan-300 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                Disponible
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-gray-300"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-white">
              Hola, soy Albert Rodriguez
            </motion.h3>
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-indigo-300 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>La Guaira · Caracas, Venezuela</span>
            </motion.div>
            <motion.p variants={itemVariants} className="text-lg leading-relaxed">
              Soy un <strong className="text-white font-medium">desarrollador web</strong> especializado en crear soluciones digitales funcionales y atractivas. Me dedico a digitalizar marcas construyendo interfaces modernas que no solo lucen bien, sino que ofrecen resultados reales y una experiencia de usuario excepcional.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg leading-relaxed">
              Siempre estoy en constante aprendizaje, adoptando nuevas tecnologías y metodologías para llevar cada proyecto al siguiente nivel. Ya sea un portafolio, una tienda online o una plataforma SaaS completa, transformo ideas complejas en código limpio y eficiente.
            </motion.p>

            {/* Stats */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-center flex flex-col justify-center items-center backdrop-blur-sm transition-colors hover:border-indigo-500/30 hover:bg-white/[0.04]"
                >
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-1">
                    {stat.num}
                  </span>
                  <span className="text-sm font-semibold text-white block mb-0.5">{stat.label}</span>
                  <span className="text-xs text-gray-400">{stat.sub}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline & Extras Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 mt-24">
          
          {/* Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.h4 variants={itemVariants} className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Trayectoria
            </motion.h4>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500/20 before:via-cyan-500/20 before:to-transparent">
              {timeline.map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Timeline dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#070711] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full group-hover:bg-cyan-400 transition-colors shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  </div>
                  {/* Content card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-indigo-500/30 transition-colors">
                    <span className="text-cyan-400 font-mono text-sm mb-1 block">{item.year}</span>
                    <h5 className="text-white font-medium mb-2">{item.title}</h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Methodology & Tools */}
          <motion.div 
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {/* Methodology */}
            <div>
              <motion.h4 variants={itemVariants} className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                Metodología de Trabajo
              </motion.h4>
              <div className="grid grid-cols-2 gap-4">
                {methodology.map((step, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    className="relative bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-indigo-300 font-mono text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-gray-200 font-medium">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <motion.h4 variants={itemVariants} className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                Herramientas Clave
              </motion.h4>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool, i) => (
                  <motion.span 
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-[#070711] border border-white/10 rounded-full text-gray-300 text-sm font-medium shadow-sm"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
