import type { SiteProfile } from '../store'
import { profileName } from '../store'
import { useLang } from '../i18n'

interface Props {
  profile: SiteProfile
}

export default function Hero({ profile }: Props) {
  const { lang } = useLang()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-[1fr_0.92fr] min-h-[min(88vh,860px)] bg-cream">
      {/* Text — left column */}
      <div className="flex flex-col justify-center px-[clamp(20px,4vw,64px)] py-[clamp(48px,8vw,110px)] order-2 lg:order-1">
        <h1 className="font-display font-medium text-[clamp(44px,6.4vw,88px)] text-ink tracking-[-0.03em] leading-[0.94] mb-8">
          {lang === 'vi' ? (
            <>Phong cách<br />& <em className="italic font-normal">dấu ấn.</em></>
          ) : (
            <>Styling<br />Stories,<br />Visual<br /><em className="italic font-normal">Impact.</em></>
          )}
        </h1>
        <p className="font-ui font-light text-[15px] text-ink-soft leading-[1.78] mb-12 max-w-[34ch]">
          {lang === 'vi'
            ? 'Stylist tại Việt Nam. Chuyên tạo phong cách cho editorial, thương mại, nghệ sĩ & nhiều hơn nữa.'
            : 'Stylist based in Vietnam. Specialized in fashion styling for editorial, commercial, artists & more.'}
        </p>
        <button
          onClick={() => scrollTo('portfolio')}
          className="self-start inline-flex items-center gap-3 font-ui font-medium text-[11px] tracking-[0.16em] uppercase text-ink border-b border-ink pb-1.5 hover:text-ink-soft hover:border-ink-soft transition-colors duration-300 group"
        >
          {lang === 'vi' ? 'Xem dự án' : 'View work'}
          <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300">→</span>
        </button>
      </div>

      {/* Image — right column */}
      <div className="relative overflow-hidden order-1 lg:order-2 aspect-[4/3] lg:aspect-auto">
        <img
          src={profile.profilePhoto}
          alt={profileName(profile, lang)}
          className="w-full h-full object-cover object-[center_18%]"
        />
        {/* Gradient fade left on desktop */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{ background: 'linear-gradient(90deg, #fdf9ec 0%, rgba(253,249,236,.55) 20%, rgba(253,249,236,0) 58%)' }}
        />
        {/* Gradient fade bottom on mobile */}
        <div className="absolute bottom-0 inset-x-0 h-24 lg:hidden"
          style={{ background: 'linear-gradient(180deg, rgba(253,249,236,0) 0%, #fdf9ec 100%)' }}
        />
      </div>
    </section>
  )
}
