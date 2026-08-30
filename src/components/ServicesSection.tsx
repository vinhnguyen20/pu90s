import { useState } from 'react'
import { useLang } from '../i18n'

const SERVICES = [
  {
    id: 'photoshoot',
    vi: {
      title: 'Chụp hình & Hợp tác',
      desc: 'Mỗi bức ảnh là một câu chuyện — mình mang đến phong cách độc đáo, phù hợp với concept và nhân vật, giúp tạo nên hình ảnh ấn tượng và nhất quán.',
    },
    en: {
      title: 'Photoshoot & Collaboration',
      desc: 'Every image tells a story. I bring a distinct visual language to each shoot — curating looks that speak to the concept and elevate the final result.',
    },
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop&auto=format',
  },
  {
    id: 'mv',
    vi: {
      title: 'Tạo kiểu MV & Quảng cáo',
      desc: 'Hợp tác với nghệ sĩ và đội ngũ sản xuất để xây dựng hình ảnh nhân vật từ ý tưởng đến hiện thực — sáng tạo, chuyên nghiệp và đúng deadline.',
    },
    en: {
      title: 'Music Video & Commercial',
      desc: 'Working closely with artists and production teams to build character looks from concept to execution — creative, precise, and always on schedule.',
    },
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=900&fit=crop&auto=format',
  },
  {
    id: 'brand',
    vi: {
      title: 'Chiến dịch thương hiệu',
      desc: 'Xây dựng bộ nhận diện hình ảnh nhất quán cho thương hiệu — từ lookbook đến campaign, mỗi chi tiết đều được chọn lọc để truyền tải đúng thông điệp.',
    },
    en: {
      title: 'Brand Campaign',
      desc: 'Building a consistent visual identity for brands — from lookbooks to full campaigns, every detail is crafted to communicate the right message.',
    },
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=900&fit=crop&auto=format',
  },
  {
    id: 'personal',
    vi: {
      title: 'Tư vấn phong cách cá nhân',
      desc: 'Giúp bạn tìm ra phong cách riêng — từ việc chọn trang phục phù hợp vóc dáng, đến xây dựng tủ đồ capsule thể hiện đúng cá tính của bạn.',
    },
    en: {
      title: 'Personal Styling',
      desc: 'Helping you define your personal style — from selecting silhouettes that work for your figure, to building a capsule wardrobe that feels authentically you.',
    },
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=900&fit=crop&auto=format',
  },
]

export default function ServicesSection() {
  const { lang } = useLang()
  const [active, setActive] = useState(0)

  const current = SERVICES[active]
  const text = lang === 'en' ? current.en : current.vi

  return (
    <section id="services" className="bg-cream border-t border-line py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        {/* Heading */}
        <div data-reveal className="mb-12 lg:mb-16">
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold font-display mb-4">
            {lang === 'vi' ? 'Dịch vụ' : 'Services'}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl text-ink tracking-wide leading-[1.05] uppercase">
            {lang === 'vi' ? (
              <>
                DỊCH VỤ<br />
                CUNG CẤP
              </>
            ) : (
              <>
                WHAT I<br />
                PROVIDE
              </>
            )}
          </h2>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-line">
          {/* Left: image */}
          <div className="lg:col-span-3 aspect-[4/3] lg:aspect-auto overflow-hidden relative">
            {SERVICES.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt={lang === 'en' ? s.en.title : s.vi.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          {/* Right: service list */}
          <div className="lg:col-span-2 flex flex-col bg-cream-2">
            {SERVICES.map((s, i) => {
              const t = lang === 'en' ? s.en : s.vi
              const isActive = i === active
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`text-left flex-1 px-8 py-7 lg:py-8 border-b border-line last:border-b-0 transition-all duration-300 group ${
                    isActive ? 'bg-cream' : 'hover:bg-cream/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-[9px] tracking-[0.4em] uppercase transition-colors duration-300 ${
                            isActive ? 'text-gold' : 'text-ink-soft/50'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`flex-1 h-px transition-colors duration-300 ${
                            isActive ? 'bg-gold/60' : 'bg-line'
                          }`}
                        />
                      </div>
                      <h3
                        className={`font-display text-base lg:text-lg tracking-wide transition-colors duration-300 mb-2 ${
                          isActive ? 'text-ink' : 'text-ink-soft'
                        }`}
                      >
                        {t.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed transition-all duration-500 ${
                          isActive
                            ? 'text-ink/70 max-h-40 opacity-100'
                            : 'text-ink-soft/60 max-h-0 opacity-0 overflow-hidden'
                        }`}
                      >
                        {t.desc}
                      </p>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className={`flex-shrink-0 mt-1 transition-all duration-300 ${
                        isActive
                          ? 'text-gold rotate-90'
                          : 'text-ink-soft/30 group-hover:text-ink-soft/60'
                      }`}
                    >
                      <path
                        d="M7 1v12M1 7l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
