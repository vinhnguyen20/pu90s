import { useState, useEffect } from 'react'
import { useLang } from '../i18n'
import type { Lang } from '../i18n'
import { profileName } from '../store'
import type { SiteProfile } from '../store'

interface Props {
  profile: SiteProfile
  onLoginClick: () => void
  isAuthed: boolean
}

export default function Nav({ profile, onLoginClick, isAuthed }: Props) {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const start = window.scrollY
      const target = el.getBoundingClientRect().top + window.scrollY - 64
      const distance = target - start
      const duration = 900
      let startTime: number | null = null
      const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const step = (now: number) => {
        if (!startTime) startTime = now
        const elapsed = Math.min((now - startTime) / duration, 1)
        window.scrollTo(0, start + distance * ease(elapsed))
        if (elapsed < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, 100)
  }

  const navLinks = [
    { label: t('navAbout'), id: 'about', w: 'w-[5.5rem]' },
    { label: t('navServices'), id: 'services', w: 'w-[4.5rem]' },
    { label: t('navPortfolio'), id: 'portfolio', w: 'w-[4.5rem]' },
    { label: t('navArtists'), id: 'artists', w: 'w-[4rem]' },
    { label: t('navContact'), id: 'contact', w: 'w-[4rem]' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-nav-solid/95 backdrop-blur-md border-line'
          : 'bg-cream border-line'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-[11px] sm:text-sm tracking-[0.22em] sm:tracking-[0.3em] uppercase text-ink hover:text-gold transition-colors duration-300 whitespace-nowrap"
        >
          {profileName(profile, lang)}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`cursor-pointer text-[10px] tracking-[0.28em] uppercase text-ink-soft hover:text-gold-deep transition-colors duration-300 font-light text-center relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${link.w}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: language + login + hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <LangSwitch lang={lang} setLang={setLang} />

          <button
            onClick={onLoginClick}
            className="hidden md:block text-[10px] tracking-[0.28em] uppercase border border-line hover:border-gold text-ink-soft hover:text-gold-deep py-2 transition-all duration-300 text-center w-[7.5rem]"
          >
            {isAuthed ? t('dashboard') : t('login')}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={t('toggleMenu')}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-px bg-ink/70 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-5 h-px bg-ink/70 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-5 h-px bg-ink/70 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-nav-solid border-b border-line`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-xs tracking-[0.28em] uppercase text-ink-soft hover:text-ink transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false)
              onLoginClick()
            }}
            className="text-left text-xs tracking-[0.28em] uppercase text-gold-deep hover:text-ink transition-colors"
          >
            {isAuthed ? t('dashboard') : t('ownerLogin')}
          </button>
        </div>
      </div>
    </nav>
  )
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center border border-line overflow-hidden">
      {(['vi', 'en'] as Lang[]).map(code => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`text-[10px] tracking-[0.2em] uppercase px-2.5 py-1.5 transition-all duration-300 ${
            lang === code
              ? 'bg-gold/20 text-gold-deep'
              : 'text-ink-soft/70 hover:text-ink hover:bg-gold/10'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
