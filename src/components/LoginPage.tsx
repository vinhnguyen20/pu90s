import { useState } from 'react'
import { DEFAULT_PROFILE, profileName } from '../store'
import { useLang } from '../i18n'
import { ADMIN_EMAIL } from '../firebase'

interface Props {
  onLogin: () => Promise<void>
  onBack: () => void
}

export default function LoginPage({ onLogin, onBack }: Props) {
  const { lang, t } = useLang()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      await onLogin()
    } catch {
      setError(t('accessDenied'))
      setLoading(false)
    }
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
            <path d="M8 1L3 5l5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('backToPortfolio')}
        </button>

        {/* Logo */}
        <div className="mb-10">
          <p className="font-display text-xl tracking-[0.25em] uppercase text-ink mb-1">
            {profileName(DEFAULT_PROFILE, lang)}
          </p>
          <p className="text-[10px] tracking-[0.4em] uppercase text-ink-soft">{t('ownerDashboard')}</p>
        </div>

        <div className="w-8 h-px bg-gold/60 mb-10" />

        <div className="space-y-5">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-line hover:border-gold bg-cream-2 text-ink-soft hover:text-gold-deep text-[10px] tracking-[0.3em] uppercase py-4 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {!loading && (
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {loading ? t('signingIn') : t('signInWithGoogle')}
          </button>

          {error && <p className="text-red-700/80 text-xs tracking-wide text-center">{error}</p>}
        </div>

        <p className="mt-10 text-[10px] text-ink-soft/50 tracking-widest text-center">
          {ADMIN_EMAIL}
        </p>
      </div>
    </div>
  )
}
