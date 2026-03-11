import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, Activity, Globe } from 'lucide-react'

/**
 * Animated counter that counts up from 0 to `target` once the element enters the viewport.
 */
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          const startTime = performance.now()
          const tick = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count.toLocaleString('fr-FR')}</span>
}

/**
 * Pulsing activity bar – a row of bars that animate independently to simulate live traffic.
 * Heights and durations are pre-computed outside the component to keep renders pure.
 */
const BAR_COUNT = 20
const BAR_CONFIGS = Array.from({ length: BAR_COUNT }, (_, i) => ({
  maxHeight: 40 + ((i * 37 + 13) % 60),          // deterministic pseudo-random height
  duration: 0.8 + ((i * 17 + 7) % 80) / 100,     // 0.80–1.60 s
  delay: i * 0.07,
}))

function ActivityBar() {
  return (
    <div className="flex items-end gap-0.5 h-8" aria-hidden="true">
      {BAR_CONFIGS.map((cfg, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-sm bg-emerald-400"
          animate={{
            height: ['30%', `${cfg.maxHeight}%`, '30%'],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: cfg.duration,
            repeat: Infinity,
            delay: cfg.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/**
 * StatsBar – three live-stats widgets displayed as a glassmorphic banner:
 *  1. OSINT: public IP + geolocation via ipapi.co
 *  2. Animated counter of threats blocked today
 *  3. SLA uptime with pulsing activity bar
 */
export default function StatsBar() {
  const [geoData, setGeoData] = useState(null)
  const [geoLoading, setGeoLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then((json) => {
        setGeoData({
          ip: json.ip || '—',
          location: json.city ? `${json.city}, ${json.country_code || ''}` : '—',
        })
        setGeoLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setGeoData({ ip: 'N/A', location: 'N/A' })
          setGeoLoading(false)
        }
      })
    return () => controller.abort()
  }, [])

  // A fixed simulated count – realistically high, seeded to look credible
  const baseThreatCount = 14_253

  return (
    <motion.section
      aria-label="Statistiques en direct"
      className="relative py-6 px-4 sm:px-6 lg:px-8 border-y border-slate-700/40 bg-[#0f172a]/80 backdrop-blur-xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/40 gap-0">

          {/* Widget 1 – OSINT: IP + geolocation */}
          <div className="flex items-center gap-4 px-4 py-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <Globe className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-0.5">
                Votre exposition publique
              </p>
              {geoLoading ? (
                <p className="text-sm text-slate-400 animate-pulse">Chargement…</p>
              ) : (
                <p className="text-sm font-semibold text-slate-200">
                  <span className="text-emerald-400 font-mono">{geoData?.ip}</span>
                  <span className="text-slate-500 mx-1.5">·</span>
                  {geoData?.location}
                </p>
              )}
            </div>
          </div>

          {/* Widget 2 – Animated counter: threats blocked today */}
          <div className="flex items-center gap-4 px-4 py-3">
            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 shrink-0">
              <ShieldAlert className="w-5 h-5 text-violet-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-0.5">
                Menaces bloquées aujourd&apos;hui
              </p>
              <p className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
                <AnimatedCounter target={baseThreatCount} />
              </p>
            </div>
          </div>

          {/* Widget 3 – SLA + pulsing activity bar */}
          <div className="flex items-center gap-4 px-4 py-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <Activity className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                  SLA Uptime
                </p>
                <span className="text-xs font-bold text-emerald-400">99.9 %</span>
              </div>
              <ActivityBar />
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  )
}
