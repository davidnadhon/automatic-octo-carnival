import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Monitor, Cloud, Code } from 'lucide-react'

// Carousel slides data
const SLIDES = [
  {
    id: 'soc',
    badge: 'Surveillance 24/7',
    title: 'Surveillance',
    highlight: 'SOC 24/7',
    description:
      'Un Centre Opérationnel de Sécurité actif jour et nuit. Nos analystes détectent et neutralisent les menaces avant qu\'elles n\'impactent votre activité.',
    icon: Monitor,
    accentFrom: 'from-blue-400',
    accentTo: 'to-blue-600',
    glowColor: 'bg-blue-600/5',
    glowColor2: 'bg-blue-800/5',
  },
  {
    id: 'cloud',
    badge: 'Infrastructure Cloud',
    title: 'Protection Cloud',
    highlight: 'Avancée',
    description:
      'Sécurisez vos environnements AWS, Azure et GCP avec nos architectures Zero Trust et nos politiques de conformité adaptées au cloud hybride.',
    icon: Cloud,
    accentFrom: 'from-indigo-400',
    accentTo: 'to-blue-500',
    glowColor: 'bg-indigo-600/5',
    glowColor2: 'bg-blue-700/5',
  },
  {
    id: 'pentest',
    badge: 'Tests d\'Intrusion',
    title: 'Expertise',
    highlight: 'Pentest',
    description:
      'Nos experts certifiés OSCP et CEH simulent des attaques réelles sur vos systèmes pour identifier les vulnérabilités avant les acteurs malveillants.',
    icon: Code,
    accentFrom: 'from-sky-400',
    accentTo: 'to-blue-500',
    glowColor: 'bg-sky-600/5',
    glowColor2: 'bg-blue-900/5',
  },
]

/** Animated tech-grid background for the hero */
function TechGrid({ glowColor, glowColor2 }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${glowColor} rounded-full blur-3xl transition-colors duration-700`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${glowColor2} rounded-full blur-3xl transition-colors duration-700`} />
    </div>
  )
}

/** Single slide content, animated with Framer Motion */
function SlideContent({ slide, direction }) {
  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  const Icon = slide.icon

  return (
    <motion.div
      key={slide.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="text-center"
    >
      {/* Badge */}
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-600/30 mb-6">
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
        {slide.badge}
      </span>

      <h1
        id="hero-heading"
        className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-100 leading-tight mb-6"
      >
        {slide.title}{' '}
        <span className={`bg-gradient-to-r ${slide.accentFrom} ${slide.accentTo} bg-clip-text text-transparent`}>
          {slide.highlight}
        </span>
      </h1>

      <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
        {slide.description}
      </p>
    </motion.div>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((index, dir) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const prev = useCallback(() => {
    const index = (current - 1 + SLIDES.length) % SLIDES.length
    goTo(index, -1)
  }, [current, goTo])

  const next = useCallback(() => {
    const index = (current + 1) % SLIDES.length
    goTo(index, 1)
  }, [current, goTo])

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setTimeout(next, 5000)
    return () => clearTimeout(timer)
  }, [next])

  const slide = SLIDES[current]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <TechGrid glowColor={slide.glowColor} glowColor2={slide.glowColor2} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel slides */}
        <div className="relative min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <SlideContent key={slide.id} slide={slide} direction={direction} />
          </AnimatePresence>
        </div>

        {/* CTA buttons – static, outside the slide transition */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-blue-600/25 active:scale-95"
          >
            Nos Services
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600 rounded-xl font-semibold text-lg transition-all active:scale-95"
          >
            Audit Gratuit
          </a>
        </motion.div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-blue-400 transition-all"
            aria-label="Diapositive précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Progress dots */}
          <div className="flex gap-2" role="tablist" aria-label="Navigation des diapositives">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`Diapositive ${i + 1} : ${s.badge}`}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-6 h-2.5 bg-blue-500'
                    : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-blue-400 transition-all"
            aria-label="Diapositive suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          aria-label="Statistiques clés"
        >
          {[
            { value: '500+', label: 'Clients protégés' },
            { value: '99.9%', label: 'Temps de réponse SLA' },
            { value: '15+', label: "Années d'expérience" },
            { value: '24/7', label: 'Support continu' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-blue-400">{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
