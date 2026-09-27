import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export default function LoadingScreen({ onComplete }) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  
  const messages = [
    'Preparando la experiencia...',
    'Cargando proyectos...',
    'Optimizando rendimiento...',
    'Casi listo...'
  ];

  const duration = isMobile ? 1500 : 2200;
  const particleCount = isMobile ? 6 : 15;

  // Generate static particle styles to avoid re-renders
  const particles = useRef([...Array(particleCount)].map(() => ({
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: Math.random() * 3 + 2,
    animationDelay: Math.random() * 2,
  }))).current;

  useEffect(() => {
    let start = Date.now();
    let animationFrame;

    const animateProgress = () => {
      const now = Date.now();
      const elapsed = now - start;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(currentProgress);

      if (currentProgress < 25) setMessageIndex(0);
      else if (currentProgress < 50) setMessageIndex(1);
      else if (currentProgress < 75) setMessageIndex(2);
      else setMessageIndex(3);

      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(animateProgress);
      } else {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, onComplete]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customFloat {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          100% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
      `}} />
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070711] overflow-hidden"
            style={{ contain: 'strict' }}
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.4, ease: 'easeInOut' }
            }}
          >
            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
              {particles.map((p, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-indigo-500/30"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    animation: prefersReducedMotion ? 'none' : `customFloat ${p.animationDuration}s ease-in-out infinite alternate`,
                    animationDelay: `${p.animationDelay}s`,
                  }}
                />
              ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-8">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: 'spring', 
                  damping: 12, 
                  stiffness: 100,
                  duration: prefersReducedMotion ? 0 : 0.5 
                }}
                className="text-6xl md:text-8xl font-black mb-12 tracking-tighter"
              >
                <span className="bg-gradient-to-br from-indigo-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                  AR
                </span>
              </motion.div>

              {/* Progress Bar Container */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4 relative" style={{ willChange: 'transform' }}>
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Percentage & Message */}
              <div className="flex justify-between items-center w-full text-sm font-medium text-slate-400">
                <div className="relative flex-1 overflow-hidden h-5">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={messageIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 truncate pr-4"
                    >
                      {messages[messageIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="tabular-nums text-cyan-400 ml-4 font-bold">{Math.round(progress)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
