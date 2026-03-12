import { motion } from 'framer-motion'
import { ClipboardCheck, Bug, Siren, GraduationCap } from 'lucide-react'

const services = [
  {
    icon: ClipboardCheck,
    title: 'Audit & Conformité',
    description:
      'Évaluation complète de votre posture de sécurité avec alignement sur les normes ISO 27001. Analyse de risques détaillée et plan de remédiation personnalisé.',
    tags: ['ISO 27001', 'Analyse de risques', 'RGPD'],
    color: 'emerald',
  },
  {
    icon: Bug,
    title: "Tests d'Intrusion",
    description:
      "Simulations d'attaques réelles sur vos infrastructures Web, Réseau et Cloud. Identification et exploitation des vulnérabilités avant les attaquants.",
    tags: ['Web App', 'Réseau', 'Cloud'],
    color: 'violet',
  },
  {
    icon: Siren,
    title: 'Réponse sur Incident',
    description:
      "Gestion de crise cybersécurité disponible 24h/24, 7j/7. Containment rapide, investigation forensique et restauration de la continuité d'activité.",
    tags: ['24/7', 'Forensique', 'Continuité'],
    color: 'emerald',
  },
  {
    icon: GraduationCap,
    title: 'Sensibilisation',
    description:
      'Programmes de formation sur mesure pour vos équipes. Simulations de phishing, ateliers pratiques et campagnes de sensibilisation continues.',
    tags: ['Anti-phishing', 'Formation', 'e-Learning'],
    color: 'violet',
  },
]

const colorMap = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20 group-hover:bg-violet-500/20',
}

const tagColorMap = {
  emerald: 'bg-emerald-500/10 text-emerald-400',
  violet: 'bg-violet-500/10 text-violet-400',
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0f172a]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">
            Ce que nous faisons
          </span>
          <h2
            id="services-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tighter text-slate-100"
          >
            Nos Services de Cybersécurité
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-lg">
            Des solutions complètes pour protéger chaque aspect de votre infrastructure numérique.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Liste des services"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            // Alternate: even indexes come from left, odd from right
            const xFrom = index % 2 === 0 ? -60 : 60
            return (
              <motion.article
                key={service.title}
                role="listitem"
                className="group relative p-8 rounded-2xl bg-slate-900/60 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/50 hover:-translate-y-1 backdrop-blur-sm"
                initial={{ opacity: 0, x: xFrom }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className={`inline-flex p-3 rounded-xl border transition-colors duration-300 mb-5 ${colorMap[service.color]}`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-100 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2" aria-label="Technologies">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${tagColorMap[service.color]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
