import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'from-cyan-400 to-indigo-500',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'JavaScript / ES6+', level: 85 },
      { name: 'HTML5 / CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 80 },
    ]
  },
  {
    title: 'Backend & DB',
    icon: '⚙️',
    color: 'from-violet-500 to-indigo-500',
    skills: [
      { name: 'Node.js / Express', level: 70 },
      { name: 'Supabase', level: 78 },
      { name: 'Firebase', level: 75 },
      { name: 'APIs REST', level: 82 },
    ]
  },
  {
    title: 'Herramientas',
    icon: '🛠️',
    color: 'from-emerald-400 to-cyan-500',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Vercel / Deploy', level: 85 },
      { name: 'Vite', level: 90 },
      { name: 'Responsive Design', level: 95 },
    ]
  }
];

export default function Skills() {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="skills" className="relative w-full py-24 bg-[#070711] overflow-hidden" ref={ref}>
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span variants={itemVariants} className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-2 block">
            Habilidades
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mi stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">tecnológico</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={!shouldReduceMotion && !isMobile ? { y: -5, scale: 1.02 } : {}}
              className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-white/[0.1]"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduceMotion ? 0 : 1, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.2 }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
