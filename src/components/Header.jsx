import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: 'inicio', label: 'Inicio' },
  { href: 'proyectos', label: 'Proyectos' },
  { href: 'skills', label: 'Skills' },
  { href: 'sobre-mi', label: 'Sobre mí' },
  { href: 'contacto', label: 'Contacto' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      // Glassmorphism effect on scroll
      setIsScrolled(window.scrollY > 20);

      // Active section indicator logic
      const sections = NAV_LINKS.map(link => document.getElementById(link.href));
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Trigger earlier

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(NAV_LINKS[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(href);
    if (element) {
      // Offset for fixed header
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070711]/80 backdrop-blur-md border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#"
          onClick={(e) => scrollToSection(e, 'top')}
          className="text-2xl font-bold tracking-tighter z-50 relative flex items-center"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Albert</span>
          <span className="text-white/60 font-light"> Rodriguez</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="relative text-sm font-medium text-white/80 hover:text-white transition-colors group py-2"
            >
              {link.label}
              
              {/* Active Section Indicator */}
              {activeSection === link.href && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              
              {/* Hover Line Animation */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  activeSection === link.href ? 'hidden' : ''
                }`} 
              />
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contacto"
            onClick={(e) => scrollToSection(e, 'contacto')}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] overflow-hidden"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="relative z-10 text-white">Contrátame</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden relative z-50 p-2 text-white/80 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <span 
              className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${
                isOpen ? 'rotate-[45deg] translate-x-[2.5px] -translate-y-[1px]' : ''
              }`} 
            />
            <span 
              className={`w-full h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`} 
            />
            <span 
              className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${
                isOpen ? '-rotate-[45deg] translate-x-[2.5px] translate-y-[1px]' : ''
              }`} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0, transition: { delay: 0.2, duration: 0.3 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 w-full bg-[#070711]/95 backdrop-blur-xl md:hidden overflow-hidden flex flex-col pt-24 px-6 border-b border-white/10"
          >
            <nav className="flex flex-col gap-8 flex-1 justify-center pb-24">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { delay: 0 } }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`text-4xl font-bold tracking-tight ${
                    activeSection === link.href 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500' 
                      : 'text-white/80 hover:text-white transition-colors'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { delay: 0 } }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.1, duration: 0.4 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <a
                  href="#contacto"
                  onClick={(e) => scrollToSection(e, 'contacto')}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl text-white font-medium"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                  </span>
                  Contrátame
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
