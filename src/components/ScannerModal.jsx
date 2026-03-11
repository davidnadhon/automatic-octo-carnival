import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Terminal } from 'lucide-react'

// Lines simulated during the scan
const SCAN_LINES = [
  '[*] Initialisation du scanner CyberShield...',
  '[*] Détection de l\'environnement réseau...',
  '[+] Interface détectée : eth0',
  '[*] Vérification du certificat SSL/TLS...',
  '[+] Checking SSL... OK',
  '[*] Test de configuration du pare-feu...',
  '[+] Testing Firewall... Règles actives détectées',
  '[*] Recherche de vulnérabilités XSS...',
  '[+] Scanning for XSS... Aucune injection détectée',
  '[*] Analyse des en-têtes HTTP de sécurité...',
  '[+] CSP Header... Présent',
  '[*] Vérification des ports ouverts...',
  '[+] Port scan... 2 ports non critiques détectés',
  '[*] Analyse des dépendances obsolètes...',
  '[+] Dependency check... Complété',
  '[*] Compilation du rapport de sécurité...',
]

const FINAL_REPORT = [
  '',
  '════════════════════════════════════════',
  '  RAPPORT DE SÉCURITÉ – CyberShield     ',
  '════════════════════════════════════════',
  '',
  '  Score de sécurité local : 85 / 100    ',
  '',
  '  ✓ SSL/TLS           [OK]',
  '  ✓ Pare-feu          [ACTIF]',
  '  ✓ XSS Protection    [OK]',
  '  ⚠ Ports ouverts     [2 détectés]',
  '  ⚠ Config avancée    [À optimiser]',
  '',
  '  Contactez-nous pour un audit complet.',
  '════════════════════════════════════════',
]

/**
 * ScannerModal – simulates a cybersecurity terminal scan.
 * Opens when triggered from the Navbar button.
 */
export default function ScannerModal({ isOpen, onClose }) {
  const [displayedLines, setDisplayedLines] = useState([])
  const [showReport, setShowReport] = useState(false)
  const [scanDone, setScanDone] = useState(false)
  const endRef = useRef(null)

  // Reset and run scan animation whenever modal opens
  useEffect(() => {
    if (!isOpen) return

    setDisplayedLines([])
    setShowReport(false)
    setScanDone(false)

    let lineIndex = 0
    const interval = setInterval(() => {
      if (lineIndex < SCAN_LINES.length) {
        // Capture current value before incrementing to avoid stale-closure bug
        const currentLine = SCAN_LINES[lineIndex]
        lineIndex++
        setDisplayedLines((prev) => [...prev, currentLine])
      } else {
        clearInterval(interval)
        // Show final report after a brief pause
        setTimeout(() => {
          setShowReport(true)
          setScanDone(true)
        }, 400)
      }
    }, 160)

    return () => clearInterval(interval)
  }, [isOpen])

  // Auto-scroll to bottom as lines appear
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedLines, showReport])

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
        // Backdrop
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="Simulateur de scan cybersécurité"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

          {/* Terminal window */}
          <motion.div
            className="relative z-10 w-full max-w-2xl bg-gray-950 border border-green-900/50 rounded-xl shadow-2xl shadow-green-900/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-green-900/30">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" aria-hidden="true" />
                <span className="text-green-400 text-sm font-mono font-semibold">
                  CyberShield Scanner v2.4.1
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* Traffic-light dots */}
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label="Fermer le scanner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-4 h-96 overflow-y-auto font-mono text-xs leading-6 text-green-400 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-green-900">
              <p className="text-green-600 mb-3">
                root@cybershield:~# ./diagnostic-rapide.sh
              </p>

              {displayedLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={
                    line?.startsWith('[+]') ? 'text-green-400' : 'text-green-600'
                  }
                >
                  {line}
                </motion.p>
              ))}

              {/* Final report */}
              {showReport &&
                FINAL_REPORT.map((line, i) => (
                  <motion.p
                    key={`report-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.08, delay: i * 0.05 }}
                    className={
                      line?.includes('85 / 100')
                        ? 'text-yellow-400 font-bold'
                        : line?.startsWith('  ✓')
                        ? 'text-green-400'
                        : line?.startsWith('  ⚠')
                        ? 'text-yellow-500'
                        : line?.includes('═')
                        ? 'text-green-700'
                        : 'text-green-300'
                    }
                  >
                    {line || '\u00A0'}
                  </motion.p>
                ))}

              {/* Blinking cursor while scanning */}
              {!scanDone && (
                <motion.span
                  className="inline-block w-2 h-4 bg-green-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
                  aria-hidden="true"
                />
              )}

              <div ref={endRef} />
            </div>

            {/* Footer CTA */}
            {scanDone && (
              <motion.div
                className="px-4 py-3 bg-gray-900 border-t border-green-900/30 flex flex-col sm:flex-row items-center justify-between gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gray-400 text-xs font-mono">
                  Scan terminé · Des améliorations sont possibles.
                </p>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Demander un audit complet
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
