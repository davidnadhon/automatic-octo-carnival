import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

function TechGrid() {
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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl" />
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16"
      aria-labelledby="hero-heading"
    >
      <TechGrid />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-600/30 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            Sécurité de niveau entreprise
          </span>
        </motion.div>

        <motion.h1
          id="hero-heading"
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-100 leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Sécuriser votre{' '}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            futur numérique
          </span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          CyberShield Solutions protège votre organisation contre les cybermenaces
          les plus sophistiquées. Expertise certifiée, réponse proactive, sérénité garantie.
        </motion.p>

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

        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-8 text-sm text-slate-500"
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
