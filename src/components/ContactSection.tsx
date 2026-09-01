import type { SiteProfile } from '../store'
import { profileName } from '../store'
import { useLang } from '../i18n'

interface Props {
  profile: SiteProfile
}

export default function ContactSection({ profile }: Props) {
  const { lang } = useLang()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="contact" className="border-t border-line bg-cream">
      <div
        data-reveal
        className="px-[clamp(20px,4vw,64px)] py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-20"
      >
        {/* Left: contact info */}
        <div>
          <h2 className="font-display font-medium text-[clamp(28px,3.4vw,42px)] text-ink tracking-[-0.022em] leading-[1.08] mb-6">
            {lang === 'vi' ? 'Liên hệ' : 'Get in touch'}
          </h2>
          <div className="space-y-2.5">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="block font-ui font-medium text-[11px] tracking-[0.14em] uppercase text-ink-soft hover:text-ink transition-colors"
              >
                {profile.email}
              </a>
            )}
            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/\./g, '')}`}
                className="block font-ui font-medium text-[11px] tracking-[0.14em] uppercase text-ink-soft hover:text-ink transition-colors"
              >
                {profile.phone}
              </a>
            )}
            <p className="font-ui font-light text-[14px] text-muted">Ho Chi Minh City, Vietnam</p>
          </div>
        </div>

        {/* Center: navigation */}
        <div>
          <p className="font-ui font-medium text-[10.5px] tracking-[0.18em] uppercase text-gold mb-6">
            {lang === 'vi' ? 'Điều hướng' : 'Navigation'}
          </p>
          <div className="space-y-2.5">
            {[
              { label: lang === 'vi' ? 'DỰ ÁN' : 'WORK', id: 'portfolio' },
              { label: lang === 'vi' ? 'GIỚI THIỆU' : 'ABOUT', id: 'about' },
              { label: lang === 'vi' ? 'DỊCH VỤ' : 'SERVICES', id: 'services' },
              { label: lang === 'vi' ? 'LIÊN HỆ' : 'CONTACT', id: 'contact' },
            ].map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block font-ui font-medium text-[11px] tracking-[0.14em] uppercase text-ink-soft hover:text-ink transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: social */}
        <div>
          <p className="font-ui font-medium text-[10.5px] tracking-[0.18em] uppercase text-gold mb-6">
            {lang === 'vi' ? 'Kết nối' : 'Connect'}
          </p>
          <div className="space-y-2.5">
            {profile.instagram && (
              <a
                href={`https://instagram.com/${profile.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-ui font-medium text-[11px] tracking-[0.14em] uppercase text-ink-soft hover:text-ink transition-colors"
              >
                Instagram
              </a>
            )}
            {profile.facebook && (
              <a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-ui font-medium text-[11px] tracking-[0.14em] uppercase text-ink-soft hover:text-ink transition-colors"
              >
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line px-[clamp(20px,4vw,64px)] py-5 flex items-center justify-between">
        <span className="font-ui font-medium text-[10px] tracking-[0.22em] uppercase text-muted">
          {profileName(profile, lang)}
        </span>
        <span className="font-ui font-medium text-[10px] tracking-[0.22em] uppercase text-muted">
          © {new Date().getFullYear()}
        </span>
      </div>
    </section>
  )
}
