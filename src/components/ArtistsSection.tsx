import { useMemo } from 'react'
import type { Project } from '../store'
import { useLang } from '../i18n'

interface Props {
  projects: Project[]
}

const FALLBACK =
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&auto=format'

export default function ArtistsSection({ projects }: Props) {
  const { lang } = useLang()

  const artists = useMemo(() => {
    const map = new Map<string, string>()
    projects.forEach(p => {
      if (p.artist && !map.has(p.artist)) {
        map.set(p.artist, p.coverImage)
      }
    })
    return Array.from(map.entries()).map(([name, image]) => ({ name, image }))
  }, [projects])

  if (!artists.length) return null

  return (
    <section id="artists" className="py-12 lg:py-16 border-t border-line bg-cream scroll-mt-16">
      <div data-reveal className="px-[clamp(20px,4vw,64px)] mb-8">
        <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-ink tracking-wide">
          {lang === 'vi' ? 'NGHỆ SĨ' : 'ARTISTS'}
        </h2>
      </div>

      <div data-reveal className="flex gap-5 overflow-x-auto px-[clamp(20px,4vw,64px)] pb-2">
        {artists.map(({ name, image }) => (
          <div key={name} className="flex-shrink-0 w-36 sm:w-40 lg:w-44 group cursor-default">
            <div className="aspect-square overflow-hidden mb-3 bg-cream-3">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={e => { ;(e.target as HTMLImageElement).src = FALLBACK }}
              />
            </div>
            <p className="text-sm text-ink truncate">{name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
