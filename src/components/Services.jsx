import { motion } from 'framer-motion'
import { ClipboardCheck, Bug, Siren, GraduationCap } from 'lucide-react'

const services = [
  {
    icon: ClipboardCheck,
    title: 'Audit & Conformité',
    description:
      'Évaluation complète de votre posture de sécurité avec alignement sur les normes ISO 27001. Analyse de risques détaillée et plan de remédiation personnalisé.',
    tags: ['ISO 27001', 'Analyse de risques', 'RGPD'],
    color: 'blue',
  },
  {
    icon: Bug,
    title: "Tests d'Intrusion",
    description:
      "Simulations d'attaques réelles sur vos infrastructures Web, Réseau et Cloud. Identification et exploitation des vulnérabilités avant les attaquants.",
    tags: ['Web App', 'Réseau', 'Cloud'],
    color: 'indigo',
  },
  {
    icon: Siren,
    title: 'Réponse sur Incident',
    description:
      "Gestion de crise cybersécurité disponible 24h/24, 7j/7. Containment rapide, investigation forensique et restauration de la continuité d'activité.",
    tags: ['24/7', 'Forensique', 'Continuité'],
    color: 'violet',
  },
  {
    icon: GraduationCap,
    title: 'Sensibilisation',
    description:
      'Programmes de formation sur mesure pour vos équipes. Simulations de phishing, ateliers pratiques et campagnes de sensibilisation continues.',
    tags: ['Anti-phishing', 'Formation', 'e-Learning'],
    color: 'sky',
  },
]

const colorMap = {
  blue: 'bg-blue-600/10 text-blue-400 border-blue-600/20 group-hover:bg-blue-600/20',
  indigo: 'bg-indigo-600/10 text-indigo-400 border-indigo-600/20 group-hover:bg-indigo-600/20',
  violet: 'bg-violet-600/10 text-violet-400 border-violet-600/20 group-hover:bg-violet-600/20',
  sky: 'bg-sky-600/10 text-sky-400 border-sky-600/20 group-hover:bg-sky-600/20',
}

const tagColorMap = {
  blue: 'bg-blue-600/10 text-blue-400',
  indigo: 'bg-indigo-600/10 text-indigo-400',
  violet: 'bg-violet-600/10 text-violet-400',
  sky: 'bg-sky-600/10 text-sky-400',
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8"
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
          <span className="text-blue-500 text-sm font-semibold tracking-widest uppercase">
            Ce que nous faisons
          </span>
          <h2
            id="services-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-slate-100"
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
            return (
              <motion.article
                key={service.title}
                role="listitem"
                className="group relative p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`inline-flex p-3 rounded-xl border transition-colors duration-300 mb-5 ${colorMap[service.color]}`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">
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
