import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, X, AlertTriangle } from 'lucide-react'

/**
 * Detect the user's browser name from the user-agent string.
 */
function detectBrowser() {
  const ua = navigator.userAgent
  if (ua.includes('Edg/')) return 'Microsoft Edge'
  if (ua.includes('Chrome/') && !ua.includes('Chromium/')) return 'Google Chrome'
  if (ua.includes('Firefox/')) return 'Mozilla Firefox'
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Apple Safari'
  if (ua.includes('OPR/') || ua.includes('Opera/')) return 'Opera'
  return 'Navigateur inconnu'
}

/**
 * Detect the user's OS from the user-agent string.
 */
function detectOS() {
  const ua = navigator.userAgent
  if (ua.includes('Windows NT 10')) return 'Windows 10/11'
  if (ua.includes('Windows NT')) return 'Windows'
  if (ua.includes('Mac OS X')) return 'macOS'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
  if (ua.includes('Linux')) return 'Linux'
  return 'OS inconnu'
}

/**
 * OsintWidget – OSINT / Privacy Awareness component.
 *
 * Fetches the user's public IP and geolocation from ipapi.co,
 * then displays it alongside browser/OS data to raise awareness
 * about information exposed to potential attackers.
 */
export default function OsintWidget() {
  const [isVisible, setIsVisible] = useState(true)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then((json) => {
        setData({
          ip: json.ip || 'Inconnue',
          city: json.city ? `${json.city}, ${json.country_name || ''}` : 'Inconnue',
        })
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(true)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [])

  const browser = detectBrowser()
  const os = detectOS()

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-y border-slate-700/40"
        aria-labelledby="osint-heading"
      >
        <div className="max-w-4xl mx-auto relative">
          {/* Dismiss button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-0 right-0 text-slate-500 hover:text-slate-300 transition-colors p-1"
            aria-label="Masquer le module de sensibilisation"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Section header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Eye className="w-5 h-5 text-amber-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-amber-500 font-semibold tracking-widest uppercase mb-0.5">
                OSINT / Privacy Awareness
              </p>
              <h2
                id="osint-heading"
                className="text-lg font-bold text-slate-100"
              >
                Ce qu&apos;un attaquant voit de vous
              </h2>
            </div>
          </div>

          {/* Data grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              {
                label: 'Adresse IP',
                value: loading ? '…' : error ? 'N/A' : data?.ip,
              },
              {
                label: 'Localisation',
                value: loading ? '…' : error ? 'N/A' : data?.city,
              },
              {
                label: 'Navigateur',
                value: browser,
              },
              {
                label: 'Système OS',
                value: os,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60"
              >
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-200 break-all">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Warning banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle
              className="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-sm text-amber-200 leading-relaxed">
              <span className="font-semibold text-amber-400">
                C&apos;est ce qu&apos;un attaquant voit en premier.
              </span>{' '}
              Ces informations sont accessibles publiquement sans aucun outil
              spécialisé. Protégez-vous avec{' '}
              <a
                href="#contact"
                className="underline decoration-amber-400/50 hover:text-amber-300 transition-colors font-medium"
              >
                CyberShield
              </a>
              .
            </p>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
