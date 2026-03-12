import { useState, useEffect } from 'react'
import { Shield, Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ScannerModal from './ScannerModal'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScannerOpen, setIsScannerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav
          role="navigation"
          aria-label="Navigation principale"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center justify-between h-16">
            <a
              href="#"
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              aria-label="CyberShield Solutions - Accueil"
            >
              <Shield className="w-7 h-7 text-emerald-400" aria-hidden="true" />
              <span className="text-xl font-bold tracking-tighter text-slate-100">
                Cyber<span className="bg-gradient-to-r from-emerald-400 to-violet-500 bg-clip-text text-transparent">Shield</span>
              </span>
            </a>

            <ul className="hidden md:flex items-center gap-8" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-emerald-400 transition-colors font-medium text-sm tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {/* Diagnostic Flash button */}
              <li>
                <button
                  onClick={() => setIsScannerOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 hover:border-emerald-500/50 text-slate-200 rounded-lg text-sm font-medium transition-all backdrop-blur-sm"
                  aria-label="Lancer un diagnostic Flash de sécurité"
                >
                  <Zap className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  Diagnostic Flash
                </button>
              </li>
              <li>
                <a
                  href="#contact"
                  className="relative px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #10b981, #8b5cf6)' }}
                  aria-label="Demander un audit gratuit"
                >
                  Audit Gratuit
                </a>
              </li>
            </ul>

            <button
              className="md:hidden text-slate-300 hover:text-white transition-colors p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-slate-700/50 bg-[#0f172a]/95 backdrop-blur-xl"
              >
                <ul className="flex flex-col py-4 gap-2" role="list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="block px-4 py-2 text-slate-300 hover:text-emerald-400 transition-colors font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                  {/* Mobile diagnostic Flash button */}
                  <li className="px-4 pt-1">
                    <button
                      onClick={() => { setIsMenuOpen(false); setIsScannerOpen(true) }}
                      className="flex items-center gap-2 w-full px-4 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 text-slate-200 rounded-lg text-sm font-medium transition-all"
                    >
                      <Zap className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                      Diagnostic Flash
                    </button>
                  </li>
                  <li className="px-4 pt-1">
                    <a
                      href="#contact"
                      className="block w-full text-center px-4 py-2 text-white rounded-lg text-sm font-semibold transition-all"
                      style={{ background: 'linear-gradient(135deg, #10b981, #8b5cf6)' }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Audit Gratuit
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Scanner modal rendered at root level to escape stacking contexts */}
      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </>
  )
}
