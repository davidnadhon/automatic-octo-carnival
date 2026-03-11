import { motion } from 'framer-motion'
import { Award, Code2, Cloud, Network, Lock, Database } from 'lucide-react'

const certifications = [
  { name: 'OSCP', description: 'Offensive Security Certified Professional', issuer: 'Offensive Security' },
  { name: 'CISSP', description: 'Certified Information Systems Security Professional', issuer: 'ISC²' },
  { name: 'CEH', description: 'Certified Ethical Hacker', issuer: 'EC-Council' },
  { name: 'ISO 27001', description: 'Lead Implementer', issuer: 'BSI' },
  { name: 'CISM', description: 'Certified Information Security Manager', issuer: 'ISACA' },
  { name: 'GPEN', description: 'GIAC Penetration Tester', issuer: 'GIAC' },
]

const skills = [
  { icon: Code2, label: 'Sécurité Applicative', level: 95 },
  { icon: Network, label: 'Sécurité Réseau', level: 92 },
  { icon: Cloud, label: 'Sécurité Cloud (AWS/Azure/GCP)', level: 88 },
  { icon: Lock, label: 'Cryptographie & PKI', level: 90 },
  { icon: Database, label: 'Sécurité des Données', level: 85 },
  { icon: Award, label: 'Gestion de la Conformité', level: 93 },
]

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
      aria-labelledby="expertise-heading"
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
            Notre savoir-faire
          </span>
          <h2
            id="expertise-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-slate-100"
          >
            Expertise &amp; Certifications
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-lg">
            Une équipe de professionnels certifiés et reconnus dans l&apos;industrie de la cybersécurité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-slate-200 mb-6">
              Compétences Techniques
            </h3>
            <div className="space-y-5" role="list" aria-label="Compétences techniques">
              {skills.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <div key={skill.label} role="listitem">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-blue-400" aria-hidden="true" />
                        <span className="text-sm font-medium text-slate-300">
                          {skill.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-blue-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-2 bg-slate-800 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.label}: ${skill.level}%`}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-slate-200 mb-6">
              Certifications Reconnues
            </h3>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              role="list"
              aria-label="Certifications"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  role="listitem"
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-600/50 transition-colors group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors" aria-hidden="true">
                      <Award className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-100 text-sm">{cert.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{cert.description}</div>
                      <div className="text-xs text-blue-500 mt-1 font-medium">{cert.issuer}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
