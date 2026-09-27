import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const testimonials = [
  {
    name: 'Inversiones Duvan',
    role: 'Negocio de almuerzos al mayor',
    image: '/logoduvan.webp',
    text: 'Albert nos creó una página web que refleja perfectamente nuestro negocio. Desde que la lanzamos, recibimos más pedidos y nuestros clientes nos encuentran fácilmente. Muy profesional y rápido en la entrega.',
    rating: 5,
    project: 'duvan.com.ve',
  },
  {
    name: 'SafePet',
    role: 'Servicios veterinarios y cuidado de mascotas',
    image: '/logosafepet.webp',
    text: 'Excelente trabajo con nuestra web. Los dueños de mascotas nos contactan mucho más desde que tenemos presencia online. El diseño es amigable y transmite la confianza que buscábamos para nuestro negocio.',
    rating: 5,
    project: 'safepet2021.com',
  },
  {
    name: 'Evimar Malavé',
    role: 'Usuaria de VentaPulse',
    image: null,
    text: 'VentaPulse me cambió la forma de gestionar mi negocio. Todo está organizado, las ventas, el inventario, los reportes... La interfaz es súper intuitiva y me ahorra horas de trabajo cada semana. ¡Lo recomiendo al 100%!',
    rating: 5,
    project: 'ventapulse.com',
  },
  {
    name: 'Kimberly Canelón',
    role: 'Usuaria de VentaPulse',
    image: null,
    text: 'La plataforma es increíble. Puedo controlar todo mi negocio desde el celular, ver las ventas del día en tiempo real y generar facturas en segundos. Albert creó algo que realmente funciona y se nota el cuidado en cada detalle.',
    rating: 5,
    project: 'ventapulse.com',
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-white/10'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const InitialsAvatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-indigo-500/20">
      {initials}
    </div>
  );
};

export default function Testimonials() {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="testimonios" className="relative py-24 bg-[#070711] overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-2 block"
          >
            Testimonios
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Lo que dicen{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
              mis clientes
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-xl mx-auto">
            La satisfacción de mis clientes es mi mejor carta de presentación.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={
                !isMobile && !shouldReduceMotion
                  ? { y: -5, boxShadow: '0 20px 60px -15px rgba(99,102,241,0.15)' }
                  : {}
              }
              className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.05] group"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-indigo-500/10 text-6xl font-serif leading-none select-none pointer-events-none">
                "
              </div>

              {/* Stars */}
              <div className="mb-4">
                <StarRating rating={t.rating} />
              </div>

              {/* Text */}
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 relative z-10">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/10 flex-shrink-0 bg-white/5"
                  />
                ) : (
                  <InitialsAvatar name={t.name} />
                )}
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                  <p className="text-indigo-400/60 text-xs mt-0.5">{t.project}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
