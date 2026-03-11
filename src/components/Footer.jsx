import { useState } from 'react'
import { Shield, Linkedin, Twitter, Github } from 'lucide-react'
import LegalModal from './LegalModal'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const [isLegalOpen, setIsLegalOpen] = useState(false)

  return (
    <>
      <footer className="bg-slate-900 border-t border-slate-800" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <a
                href="#"
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors w-fit mb-4"
                aria-label="CyberShield Solutions - Retour en haut"
              >
                <Shield className="w-6 h-6" aria-hidden="true" />
                <span className="text-lg font-bold text-slate-100">
                  Cyber<span className="text-blue-500">Shield</span>
                </span>
              </a>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Votre partenaire de confiance en cybersécurité. Nous protégeons votre
                organisation avec une expertise certifiée et une vigilance constante.
              </p>
              <div className="flex gap-4 mt-5" aria-label="Réseaux sociaux">
                {[
                  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                  { Icon: Twitter, label: 'Twitter / X', href: '#' },
                  { Icon: Github, label: 'GitHub', href: '#' },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-blue-400 transition-colors"
                    aria-label={label}
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">
                Services
              </h3>
              <ul className="space-y-2.5" role="list">
                {[
                  'Audit & Conformité',
                  "Tests d'Intrusion",
                  'Réponse sur Incident',
                  'Sensibilisation',
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">
                Légal &amp; Sécurité
              </h3>
              <ul className="space-y-2.5" role="list">
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    Politique de Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    Conditions d&apos;Utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    Politique Cookies
                  </a>
                </li>
                {/* Mentions Légales & RGPD – opens modal */}
                <li>
                  <button
                    onClick={() => setIsLegalOpen(true)}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors text-left"
                  >
                    Mentions Légales &amp; RGPD
                  </button>
                </li>
                <li>
                  <a
                    href="/.well-known/security.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                  >
                    Security Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} CyberShield Solutions. Tous droits réservés.
            </p>
            <p className="text-slate-600 text-xs">
              Construit avec ❤️ et sécurisé par design
            </p>
          </div>
        </div>
      </footer>

      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
    </>
  )
}
