import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <>
          <ScrollProgress />
          <Header />
          <BackToTop />
          <main>
            <Hero />
            <Projects />
            <Skills />
            <About />
            <Testimonials />
            <Contact />
          </main>
          <footer className="py-10 px-4 sm:px-6 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
            <div className="max-w-6xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="gradient-text font-black text-base">Albert Rodriguez</span>
                <span className="text-text-secondary/40 text-xs">Desarrollador web · Venezuela</span>
              </div>
              <span className="text-text-secondary/30 text-xs">© {new Date().getFullYear()} · Soluciones digitales de alto impacto</span>
              <a
                href="#inicio"
                className="text-text-secondary/50 hover:text-accent text-xs transition-colors flex items-center gap-1.5 group"
              >
                Volver al inicio
                <span className="group-hover:-translate-y-0.5 transition-transform duration-200 inline-block">↑</span>
              </a>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
