import { useState } from 'react'
import { login, getProfile, profileName } from '../store'
import { useLang } from '../i18n'

interface Props {
  onLogin: () => void
  onBack: () => void
}

export default function LoginPage({ onLogin, onBack }: Props) {
  const { lang, t } = useLang()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const profile = getProfile()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (login(password)) {
        onLogin()
      } else {
        setError(t('wrongPassword'))
        setLoading(false)
      }
    }, 400)
  }

  return (
    <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute border-t border-line"
            style={{ top: `${10 + i * 12}%`, left: 0, right: 0 }}
          />
        ))}
      </div>

      <div className="w-full max-w-sm relative">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition-colors mb-12"
        >
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M8 1L3 5l5 4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('backToPortfolio')}
        </button>

        {/* Logo */}
        <div className="mb-10">
          <p className="font-display text-xl tracking-[0.25em] uppercase text-ink mb-1">
            {profileName(profile, lang)}
          </p>
          <p className="text-[10px] tracking-[0.4em] uppercase text-ink-soft">{t('ownerDashboard')}</p>
        </div>

        <div className="w-8 h-px bg-gold/60 mb-10" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-password"
              className="block text-[10px] tracking-[0.4em] uppercase text-ink-soft mb-3"
            >
              {t('password')}
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder={t('passwordPlaceholder')}
              className="w-full bg-cream-2 border border-line text-ink text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder:text-ink-soft/50 transition-colors"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-red-700/80 text-xs tracking-wide">{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full border border-line hover:border-gold bg-cream-2 text-ink-soft hover:text-gold-deep text-[10px] tracking-[0.35em] uppercase py-3.5 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? t('verifying') : t('enterDashboard')}
          </button>
        </form>

        <p className="mt-8 text-[10px] text-ink-soft/70 tracking-widest text-center">
          {t('defaultPassword')}
        </p>
      </div>
    </div>
  )
}
