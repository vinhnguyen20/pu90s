import type { SiteProfile } from '../store'
import { profileName } from '../store'
import { useLang } from '../i18n'


interface Props {
  profile: SiteProfile
}

export default function ContactSection({ profile }: Props) {
  const { lang, t } = useLang()
  const heading = t('contactHeading')

  return (
    <section
      id="contact"
      className="bg-cream-2 border-t border-line relative overflow-hidden"
    >
      {/* Decorative starburst top-right */}
      <div className="absolute top-10 right-12 opacity-20 pointer-events-none">
        <StarburstSVG size={100} />
      </div>

      <div data-reveal className="max-w-7xl mx-auto px-6 lg:px-14 py-10 lg:py-15 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: photo */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative">
            <div className="absolute -inset-3 border border-line" />
            <div className="absolute -inset-6 border border-line/60" />
            <div className="relative w-64 lg:w-80 aspect-[3/4] overflow-hidden bg-cream-3">
              <img
                src={profile.profilePhoto}
                alt={profileName(profile, lang)}
                className="w-full h-full object-cover object-top"
                onError={e => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <span className="absolute top-0 left-0 w-6 h-px bg-gold" />
              <span className="absolute top-0 left-0 w-px h-6 bg-gold" />
              <span className="absolute bottom-0 right-0 w-6 h-px bg-gold" />
              <span className="absolute bottom-0 right-0 w-px h-6 bg-gold" />
            </div>
          </div>
        </div>

        {/* Right: contact */}
        <div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.15] mb-12 tracking-wide">
            {heading[0]}
            <br />
            {heading[1]}
          </h2>

          <div className="space-y-6">
            <ContactItem
              label={t('labelEmail')}
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactItem
              label={t('labelPhone')}
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\./g, '')}`}
            />
            <ContactItem
              label={t('labelInstagram')}
              value={`@${profile.instagram}`}
              href={`https://instagram.com/${profile.instagram}`}
            />
            <ContactItem label={t('labelFacebook')} value={profile.facebook} href={profile.facebook} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-5 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-sm tracking-[0.3em] uppercase text-ink-soft">
          {profileName(profile, lang)}
        </span>
        <span className="text-[10px] tracking-widest uppercase text-ink-soft/80">
          © {new Date().getFullYear()} — {profileName(profile, lang)} — {t('footerRole')}
        </span>
      </div>
    </section>
  )
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-1.5">{label}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink-soft hover:text-ink transition-colors text-sm tracking-wide italic break-all"
      >
        {value}
      </a>
    </div>
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
      <circle cx={cx} cy={cy} r={3} stroke="#a48752" strokeWidth="0.8" fill="none" />
    </svg>
  )
}
