import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Lock, Mail, User, MessageSquare, Phone, CheckCircle2 } from 'lucide-react'

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const initialErrors = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function validate(fields) {
  const errors = { ...initialErrors }
  if (!fields.name.trim()) {
    errors.name = 'Le nom est requis.'
  }
  if (!fields.email.trim()) {
    errors.email = "L'adresse email est requise."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "L'adresse email n'est pas valide."
  }
  if (!fields.subject.trim()) {
    errors.subject = 'Le sujet est requis.'
  }
  if (!fields.message.trim()) {
    errors.message = 'Le message est requis.'
  } else if (fields.message.trim().length < 20) {
    errors.message = 'Le message doit contenir au moins 20 caractères.'
  }
  return errors
}

function hasErrors(errors) {
  return Object.values(errors).some((e) => e !== '')
}

export default function Contact() {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState(initialErrors)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xzdjyalj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        setSubmitted(true)
        setForm(initialFormState)
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.")
      }
    } catch (error) {
      alert("Erreur réseau. Vérifiez votre connexion.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section
        id="contact"
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle2 className="w-20 h-20 text-green-400" aria-hidden="true" />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tighter text-slate-100 mb-4">Message envoyé !</h2>
          <p className="text-slate-400 text-lg mb-8">
            Merci pour votre message. Notre équipe vous contactera dans les 24 heures.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 text-white rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
            style={{ background: 'linear-gradient(135deg, #10b981, #8b5cf6)' }}
          >
            Envoyer un autre message
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
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
            Parlons de votre sécurité
          </span>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tighter text-slate-100"
          >
            Contactez-Nous
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-lg">
            Obtenez un audit de sécurité gratuit. Notre équipe vous répondra sous 24h.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="p-8 rounded-2xl bg-slate-900 border border-slate-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-green-950/40 border border-green-800/40 text-green-400 text-sm" role="note" aria-label="Sécurité des données">
              <Lock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>Vos données sont chiffrées de bout en bout et ne seront jamais partagées avec des tiers.</span>
            </div>

            <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                    <User className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" aria-hidden="true" />
                    Nom complet <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                    placeholder="Jean Dupont"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                    <Mail className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" aria-hidden="true" />
                    Adresse email <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                    placeholder="jean@entreprise.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">
                    <Phone className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" aria-hidden="true" />
                    Téléphone <span className="text-slate-500 text-xs">(optionnel)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="+33 6 00 00 00 00"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">
                    <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" aria-hidden="true" />
                    Sujet <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    aria-invalid={!!errors.subject}
                    placeholder="Audit de sécurité"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                  {errors.subject && (
                    <p id="subject-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Message <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  aria-invalid={!!errors.message}
                  placeholder="Décrivez vos besoins en sécurité..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-800 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-slate-700 hover:border-slate-600'
                  }`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 text-white rounded-xl font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                style={isSubmitting ? {} : { background: 'linear-gradient(135deg, #10b981, #8b5cf6)' }}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
