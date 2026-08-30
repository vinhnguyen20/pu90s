import { useEffect, useRef } from 'react'
import type { SiteProfile } from '../store'
import { profileName, profileBio } from '../store'
import { useLang } from '../i18n'

interface Props {
  profile: SiteProfile
}


export default function Hero({ profile }: Props) {
  const { lang, t } = useLang()
  const heroRef = useRef<HTMLDivElement>(null)
  const [bio1, bio2] = profileBio(profile, lang)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handler = () => {
      el.style.setProperty('--scroll', String(window.scrollY * 0.3))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* ── Hero / About ── */}
      <section
        id="about"
        ref={heroRef}
        className="relative min-h-screen bg-cream flex items-center overflow-hidden pt-16"
      >
        {/* Decorative starburst top-right */}
        <div className="absolute top-24 right-8 lg:right-24 opacity-20 pointer-events-none">
          <StarburstSVG size={120} />
        </div>

        {/* Decorative circles bottom-left */}
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-line/70 pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-line/50 pointer-events-none"
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center py-24 relative">
          {/* Left col: text */}
          <div className="max-w-xl">
            <p className="min-h-[4.5rem] text-ink-soft/70 text-[10px] tracking-[0.4em] leading-[2.2] uppercase italic mb-10 animate-fade-in-up stagger-1 opacity-0">
              {t('heroQuote')}
            </p>

            <p className="text-[10px] tracking-[0.5em] uppercase text-gold font-display mb-3 animate-fade-in-up stagger-1 opacity-0">
              {t('aboutMe')}
            </p>
            <div className="w-12 h-px bg-gold/60 mb-8 animate-fade-in-up stagger-2 opacity-0" />

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight mb-2 animate-fade-in-up stagger-2 opacity-0">
              {profileName(profile, lang)}
            </h1>
            <p className="font-display text-gold-deep text-lg tracking-[0.35em] mb-2 animate-fade-in-up stagger-2 opacity-0">
              ({profile.nickname})
            </p>
            <p className="text-[10px] tracking-[0.45em] uppercase text-ink-soft/80 mb-10 animate-fade-in-up stagger-3 opacity-0">
              {t('role')}
            </p>

            <div className="min-h-[10rem] space-y-5 animate-fade-in-up stagger-3 opacity-0">
              <p className="text-ink/80 text-sm leading-[1.9] font-light italic">{bio1}</p>
              <p className="text-ink-soft text-sm leading-[1.9] font-light italic">{bio2}</p>
            </div>

          </div>

          {/* Right col: photo */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up stagger-3 opacity-0">
            <div className="relative">
              <div className="absolute -inset-3 border border-line" />
              <div className="absolute -inset-6 border border-line/60" />
              <div className="relative w-64 sm:w-72 lg:w-80 aspect-[3/4] overflow-hidden bg-cream-3">
                <img
                  src={profile.profilePhoto}
                  alt={profileName(profile, lang)}
                  className="w-full h-full object-cover object-top"
                  onError={e => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                {/* Gold corner accents */}
                <span className="absolute top-0 left-0 w-6 h-px bg-gold" />
                <span className="absolute top-0 left-0 w-px h-6 bg-gold" />
                <span className="absolute bottom-0 right-0 w-6 h-px bg-gold" />
                <span className="absolute bottom-0 right-0 w-px h-6 bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Introduction strip ── */}
      <section className="bg-cream-2 border-t border-line py-12 md:py-16 lg:py-24">
        <div data-reveal className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Photo */}
          <div className="flex-shrink-0 relative">
            <div className="absolute -inset-3 border border-line" />
            <div className="absolute -inset-6 border border-line/60" />
            <div className="w-48 lg:w-60 aspect-[3/4] overflow-hidden bg-cream-3 relative">
              <img
                src={profile.profilePhoto}
                alt={profileName(profile, lang)}
                className="w-full h-full object-cover object-top"
                onError={e => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <span className="absolute top-0 left-0 w-5 h-px bg-gold" />
              <span className="absolute top-0 left-0 w-px h-5 bg-gold" />
              <span className="absolute bottom-0 right-0 w-5 h-px bg-gold" />
              <span className="absolute bottom-0 right-0 w-px h-5 bg-gold" />
            </div>
          </div>

          <div>
            <p className="text-ink/75 text-sm leading-[2] italic max-w-lg mb-5">{t('introText1')}</p>
            <p className="text-ink-soft text-sm italic">{t('introText2')}</p>
          </div>
        </div>
      </section>

    </>
  )
}


function StarburstSVG({ size }: { size: number }) {
  const lines = Array.from({ length: 16 }, (_, i) => i)
  const cx = size / 2
  const cy = size / 2
  const r1 = size * 0.42
  const r2 = size * 0.18

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden>
      {lines.map(i => {
        const angle = (i / lines.length) * 2 * Math.PI - Math.PI / 2
        const x1 = cx + r2 * Math.cos(angle)
        const y1 = cy + r2 * Math.sin(angle)
        const x2 = cx + r1 * Math.cos(angle)
        const y2 = cy + r1 * Math.sin(angle)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#a48752"
            strokeWidth={i % 4 === 0 ? '1.5' : '0.5'}
          />
        )
      })}
      <circle cx={cx} cy={cy} r={4} stroke="#a48752" strokeWidth="0.8" fill="none" />
    </svg>
  )
}
