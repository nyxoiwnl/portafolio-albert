import { useState, lazy, Suspense, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { useIsMobile } from '../hooks/useIsMobile';

const ProjectDetailModal = lazy(() => import('./ProjectDetailModal'));

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  // Extract unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set(['Todos']);
    projects.forEach(project => {
      if (project.tags) {
        project.tags.forEach(tag => tags.add(tag));
      } else if (project.category) {
        tags.add(project.category);
      }
    });
    return Array.from(tags);
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'Todos') return projects;
    return projects.filter(project => 
      project.tags?.includes(selectedTag) || project.category === selectedTag
    );
  }, [selectedTag]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="proyectos" className="relative py-24 bg-[#070711] overflow-hidden">
      {/* Background Orb Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-4 block">
              Portafolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proyectos <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                que inspiran
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Cada proyecto es una solución digital única, diseñada para generar impacto real en el negocio de mis clientes.
            </p>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-gray-500 font-medium">
              Mostrando {filteredProjects.length} proyectos
            </p>
          </div>
        </div>

        {/* Filter/Tag Bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout={!shouldReduceMotion ? "position" : false}
                initial={!shouldReduceMotion ? { opacity: 0, scale: 0.9 } : { opacity: 0 }}
                animate={!shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1 }}
                exit={!shouldReduceMotion ? { opacity: 0, scale: 0.9, transition: { duration: 0.2 } } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard 
                  project={project} 
                  onSelect={setSelectedProject} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectDetailModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
}
