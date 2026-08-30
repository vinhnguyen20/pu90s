import { useState, useEffect, useCallback } from 'react'
import type { Project } from '../store'
import { CATEGORY_LABELS, projectTitle, projectDescription } from '../store'
import { useLang } from '../i18n'

interface Props {
  project: Project
  onClose: () => void
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1784031208107-f489c769e1f9?w=900&h=1200&fit=crop&auto=format'

export default function Lightbox({ project, onClose }: Props) {
  const { lang, t } = useLang()
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const youtubeId = project.youtubeUrl ? extractYoutubeId(project.youtubeUrl) : null
  const imgCount = project.images.length
  const totalSlides = imgCount + (youtubeId ? 1 : 0)
  const isVideoSlide = youtubeId ? current === imgCount : false

  const goTo = useCallback((i: number) => {
    setImgLoaded(false)
    setPlaying(false)
    setCurrent(i)
  }, [])

  const prev = useCallback(() => {
    if (!totalSlides) return
    goTo((current - 1 + totalSlides) % totalSlides)
  }, [totalSlides, current, goTo])

  const next = useCallback(() => {
    if (!totalSlides) return
    goTo((current + 1) % totalSlides)
  }, [totalSlides, current, goTo])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const description = projectDescription(project, lang)

  return (
    <div className="fixed inset-0 z-[100] bg-cream/98 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      {/* Close button */}
      <button
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-line bg-cream-2 text-ink-soft hover:text-ink hover:border-gold transition-all duration-200"
        onClick={onClose}
        aria-label={t('close')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="h-full flex flex-col lg:flex-row" onClick={e => e.stopPropagation()}>
        {/* ── Main panel ── */}
        <div className="relative flex-1 flex items-center justify-center p-6 lg:p-10 min-h-0">
          {/* Prev arrow */}
          {totalSlides > 1 && (
            <button
              className="absolute left-4 lg:left-6 z-10 w-10 h-10 flex items-center justify-center border border-line text-ink-soft hover:text-ink hover:border-gold transition-all bg-cream-2/90"
              onClick={prev}
              aria-label={t('previous')}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Content */}
          <div className="relative max-h-full max-w-full flex items-center justify-center w-full">
            {isVideoSlide ? (
              /* Video slide — wrapper size never changes; iframe overlays thumbnail */
              <div className="relative w-full aspect-video overflow-hidden shadow-[0_10px_40px_rgba(58,47,24,0.22)]">
                {/* Thumbnail layer — always in DOM, hidden when playing */}
                <div
                  className={`absolute inset-0 cursor-pointer group transition-opacity duration-300 ${playing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  onClick={() => setPlaying(true)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                    alt={projectTitle(project, lang)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => {
                      ;(e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                    }}
                  />
                  <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/45 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-cream/90 group-hover:bg-cream flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="#856828">
                        <path d="M10 6l14 8-14 8V6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* iframe — only mounted when playing */}
                {playing && (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title={projectTitle(project, lang)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            ) : imgCount > 0 ? (
              <div className="relative">
                {!imgLoaded && (
                  <div className="absolute inset-0 bg-cream-3 animate-pulse" style={{ minWidth: 300, minHeight: 400 }} />
                )}
                <img
                  key={current}
                  src={project.images[current]}
                  alt={`${projectTitle(project, lang)} — ${current + 1}`}
                  className="max-h-[75vh] max-w-full object-contain animate-fade-in shadow-[0_10px_40px_rgba(58,47,24,0.18)]"
                  onLoad={() => setImgLoaded(true)}
                  onError={e => {
                    ;(e.target as HTMLImageElement).src = FALLBACK_IMAGE
                    setImgLoaded(true)
                  }}
                />
              </div>
            ) : (
              <div className="w-72 h-96 bg-cream-3 border border-line" />
            )}
          </div>

          {/* Next arrow */}
          {totalSlides > 1 && (
            <button
              className="absolute right-4 lg:right-6 z-10 w-10 h-10 flex items-center justify-center border border-line text-ink-soft hover:text-ink hover:border-gold transition-all bg-cream-2/90"
              onClick={next}
              aria-label={t('next')}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Dots */}
          {totalSlides > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 ${
                    i === current
                      ? 'bg-gold-deep scale-125 w-1.5 h-1.5 rounded-full'
                      : 'bg-ink/25 hover:bg-ink/50 w-1.5 h-1.5 rounded-full'
                  } ${youtubeId && i === imgCount ? 'rounded-sm!' : ''}`}
                  aria-label={youtubeId && i === imgCount ? 'Video' : `${t('photos')} ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Info panel ── */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-line bg-cream-2 flex flex-col">
          <div className="flex-1 overflow-y-auto p-7 lg:p-8 space-y-6">
            <p className="text-[9px] tracking-[0.5em] uppercase text-gold">
              {CATEGORY_LABELS[project.category]}
            </p>
            <div>
              <h2 className="font-display text-xl lg:text-2xl text-ink leading-tight tracking-wide mb-2">
                {projectTitle(project, lang)}
              </h2>
              {project.subtitle && <p className="text-ink-soft text-sm italic">{project.subtitle}</p>}
            </div>
            <div className="w-8 h-px bg-gold/60" />
            <div className="space-y-2">
              {project.artist && (
                <div className="flex gap-3 text-xs">
                  <span className="text-ink-soft/80 tracking-widest uppercase w-20 flex-shrink-0">{t('artist')}</span>
                  <span className="text-ink">{project.artist}</span>
                </div>
              )}
              {project.brand && (
                <div className="flex gap-3 text-xs">
                  <span className="text-ink-soft/80 tracking-widest uppercase w-20 flex-shrink-0">{t('labelBrand')}</span>
                  <span className="text-ink">{project.brand}</span>
                </div>
              )}
              <div className="flex gap-3 text-xs">
                <span className="text-ink-soft/80 tracking-widest uppercase w-20 flex-shrink-0">{t('year')}</span>
                <span className="text-ink">{project.date}</span>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="text-ink-soft/80 tracking-widest uppercase w-20 flex-shrink-0">{t('photos')}</span>
                <span className="text-ink">{imgCount}</span>
              </div>
            </div>
            {description && <p className="text-ink/80 text-sm leading-[1.85] italic">{description}</p>}
          </div>

          {/* Thumbnail strip */}
          {totalSlides > 1 && (
            <div className="border-t border-line p-4 flex gap-2 overflow-x-auto">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`flex-shrink-0 w-12 h-16 overflow-hidden border transition-all duration-200 ${
                    i === current && !isVideoSlide ? 'border-gold' : 'border-line opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover"
                    onError={e => { ;(e.target as HTMLImageElement).style.opacity = '0' }} />
                </button>
              ))}
              {youtubeId && (
                <button
                  onClick={() => goTo(imgCount)}
                  className={`flex-shrink-0 w-12 h-16 overflow-hidden border relative transition-all duration-200 ${
                    isVideoSlide ? 'border-gold' : 'border-line opacity-60 hover:opacity-90'
                  }`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                    alt="Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                      <path d="M3 1.5l5 3.5-5 3.5V1.5z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function extractYoutubeId(url: string): string | null {
  if (!url) return null
  const patterns = [/youtu\.be\/([^?&]+)/, /[?&]v=([^?&]+)/, /youtube\.com\/embed\/([^?&]+)/]
  for (const re of patterns) {
    const m = url.match(re)
    if (m) return m[1]
  }
  return null
}
