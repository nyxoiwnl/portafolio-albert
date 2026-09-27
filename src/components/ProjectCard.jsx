import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export default function ProjectCard({ project, index = 0, onSelect }) {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (isMobile || shouldReduceMotion || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    if (isMobile || shouldReduceMotion) return;
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const getTagColor = (tag) => {
    const lowerTag = tag?.toLowerCase() || '';
    if (lowerTag.includes('web')) return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    if (lowerTag.includes('saas')) return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
    if (lowerTag.includes('catálogo') || lowerTag.includes('catalogo')) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    return 'bg-white/5 text-white/70 border-white/10';
  };

  return (
    <motion.article
      variants={itemVariants}
      className="relative group h-full"
      style={{ perspective: 1000 }}
    >
      <motion.button
        type="button"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        animate={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`
          h-full w-full rounded-2xl overflow-hidden text-left
          bg-[#070711]/40 border border-white/[0.05]
          backdrop-blur-md shadow-xl
          relative flex flex-col
          transition-colors duration-300
          hover:bg-[#070711]/60
        `}
      >
        {/* Animated Gradient Border (Shimmer) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
          <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#6366f1_25%,#22D3EE_50%,#8B5CF6_75%,transparent_100%)] animate-[spin_4s_linear_infinite] opacity-30" />
          <div className="absolute inset-[1px] bg-[#070711] rounded-2xl z-0" />
        </div>

        {/* Shine Sweep Effect */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={isHovered ? { x: '200%', opacity: 0.15 } : { x: '-100%', opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg]"
          />
        </div>

        <div className="relative z-10 flex flex-col h-full bg-[#070711]/50 backdrop-blur-sm rounded-2xl overflow-hidden">
          {/* Image Area */}
          <div className="relative aspect-video overflow-hidden bg-white/5">
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Tags overlay */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-20">
              {project.tags?.map((tag, i) => (
                <span 
                  key={i} 
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border backdrop-blur-md ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* 'Ver detalles' hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 z-20">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-full text-sm flex items-center gap-2 transform transition-colors"
              >
                Ver detalles
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Info Area */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
              {project.name}
            </h3>
            
            <p className="text-white/60 text-sm line-clamp-2 mb-4 flex-1">
              {project.desc}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.techs?.slice(0, 4).map((tech, i) => (
                <span 
                  key={i} 
                  className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10"
                >
                  {tech}
                </span>
              ))}
              {project.techs?.length > 4 && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                  +{project.techs.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.button>
    </motion.article>
  );
}
