import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield } from 'lucide-react'

/**
 * LegalModal – Mentions Légales & RGPD modal.
 * Provides the legally required information for French/EU websites.
 */
export default function LegalModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

          {/* Modal panel */}
          <motion.div
            className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-400" aria-hidden="true" />
                <h2
                  id="legal-modal-title"
                  className="text-lg font-bold text-slate-100"
                >
                  Mentions Légales &amp; RGPD
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                aria-label="Fermer les mentions légales"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto text-sm text-slate-400 leading-relaxed space-y-5">
              {/* Éditeur */}
              <section>
                <h3 className="text-slate-200 font-semibold mb-2">
                  1. Éditeur du site
                </h3>
                <p>
                  <strong className="text-slate-300">CyberShield Solutions</strong>
                  <br />
                  Société par actions simplifiée (SAS) au capital de 50 000 €<br />
                  Siège social : 12 rue de la Cybersécurité, 75001 Paris, France<br />
                  SIREN : 123 456 789 · RCS Paris<br />
                  Directeur de la publication : Jean-Luc Dubois<br />
                  Contact : contact@cybershield.fr
                </p>
              </section>

              {/* Hébergement */}
              <section>
                <h3 className="text-slate-200 font-semibold mb-2">
                  2. Hébergement
                </h3>
                <p>
                  Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
                  Covina, CA 91723, États-Unis – <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">vercel.com</a>.
                </p>
              </section>

              {/* Propriété intellectuelle */}
              <section>
                <h3 className="text-slate-200 font-semibold mb-2">
                  3. Propriété intellectuelle
                </h3>
                <p>
                  L&apos;ensemble du contenu de ce site (textes, images, logos, code
                  source) est la propriété exclusive de CyberShield Solutions et est
                  protégé par le droit d&apos;auteur français et international. Toute
                  reproduction, représentation ou diffusion, totale ou partielle, sans
                  autorisation écrite préalable est strictement interdite.
                </p>
              </section>

              {/* RGPD */}
              <section>
                <h3 className="text-slate-200 font-semibold mb-2">
                  4. Protection des données personnelles (RGPD)
                </h3>
                <p>
                  Conformément au Règlement Général sur la Protection des Données
                  (RGPD – UE 2016/679) et à la loi Informatique et Libertés, vous
                  disposez des droits suivants sur vos données personnelles :
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-500">
                  <li>Droit d&apos;accès et de rectification</li>
                  <li>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d&apos;opposition et de limitation du traitement</li>
                </ul>
                <p className="mt-2">
                  Pour exercer ces droits, contactez notre DPO à :{' '}
                  <a
                    href="mailto:dpo@cybershield.fr"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    dpo@cybershield.fr
                  </a>
                  . Les données collectées via le formulaire de contact sont utilisées
                  uniquement pour répondre à vos demandes et ne sont jamais revendues
                  à des tiers. Elles sont conservées 3 ans maximum.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h3 className="text-slate-200 font-semibold mb-2">
                  5. Cookies
                </h3>
                <p>
                  Ce site n&apos;utilise pas de cookies de traçage ou publicitaires.
                  Seuls des cookies strictement nécessaires au fonctionnement du site
                  peuvent être déposés. Aucun consentement préalable n&apos;est requis
                  pour ces cookies.
                </p>
              </section>

              {/* Loi applicable */}
              <section>
                <h3 className="text-slate-200 font-semibold mb-2">
                  6. Loi applicable & juridiction
                </h3>
                <p>
                  Les présentes mentions légales sont régies par le droit français.
                  En cas de litige, et après tentative de résolution amiable, les
                  tribunaux compétents du ressort de Paris seront seuls compétents.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
              <p className="text-xs text-slate-600">
                Dernière mise à jour : mars 2025
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
