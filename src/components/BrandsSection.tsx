import { useLang } from '../i18n'

const BRANDS = [
  'CELINE', 'ZARA', 'MARC JACOBS', 'COACH', "LEVI'S", 'H&M',
  'CHARLES & KEITH', 'GUCCI', 'DIOR', 'CHANEL',
]

export default function BrandsSection() {
  const { lang } = useLang()

  return (
    <section className="py-10 lg:py-12 border-t border-line bg-cream">
      <div data-reveal className="px-[clamp(20px,4vw,64px)]">
        <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-ink tracking-wide mb-8">
          {lang === 'vi' ? 'THƯƠNG HIỆU' : 'BRANDS'}
        </h2>
        <div className="flex items-center gap-8 lg:gap-14 overflow-x-auto pb-2 flex-wrap lg:flex-nowrap">
          {BRANDS.map(brand => (
            <span
              key={brand}
              className="text-sm lg:text-base tracking-[0.18em] uppercase text-ink/45 hover:text-ink transition-colors duration-300 whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
