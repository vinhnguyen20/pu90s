import { useState, useMemo } from 'react'
import type { Project, CategoryDef } from '../store'
import { getArtists, projectTitle, projectDescription, getCategoryLabel } from '../store'
import { useLang } from '../i18n'
import type { Lang } from '../i18n'

interface Props {
  projects: Project[]
  categories: CategoryDef[]
  onProjectClick: (project: Project) => void
}

type ViewMode = 'category' | 'artist'

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1784031208107-f489c769e1f9?w=600&h=800&fit=crop&auto=format'

export default function PortfolioSection({ projects, categories, onProjectClick }: Props) {
  const { lang, t } = useLang()
  const [viewMode, setViewMode] = useState<ViewMode>('category')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeArtist, setActiveArtist] = useState<string | 'all'>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const artists = useMemo(() => getArtists(projects), [projects])

  const filteredProjects = useMemo(() => {
    if (viewMode === 'category') {
      return activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory)
    }
    return activeArtist === 'all'
      ? projects.filter(p => p.artist)
      : projects.filter(p => p.artist === activeArtist)
  }, [projects, viewMode, activeCategory, activeArtist])

  const groupedByCategory = useMemo(() => {
    if (viewMode !== 'category' || activeCategory !== 'all') return null
    const map = new Map<string, Project[]>()
    categories.forEach(c => map.set(c.id, []))
    projects.forEach(p => {
      if (map.has(p.category)) map.get(p.category)!.push(p)
      else map.set(p.category, [p])
    })
    return map
  }, [projects, categories, viewMode, activeCategory])

  return (
    <section id="portfolio" className="bg-cream py-20 lg:py-28 border-t border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        {/* Section header */}
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold font-display mb-3">
              {t('portfolio')}
            </p>
            <div className="w-10 h-px bg-gold/60 mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-ink tracking-wide min-w-[16rem]">
              {t('selectedWorks')}
            </h2>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center border border-line">
            {(['category', 'artist'] as ViewMode[]).map((mode, i) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`text-[10px] tracking-[0.25em] uppercase w-[7.5rem] text-center py-2.5 transition-all duration-300 ${
                  i === 0 ? 'border-r border-line' : ''
                } ${
                  viewMode === mode
                    ? 'bg-gold/20 text-gold-deep'
                    : 'text-ink-soft hover:text-ink hover:bg-gold/8'
                }`}
              >
                {mode === 'category' ? t('byCategory') : t('byArtist')}
              </button>
            ))}
          </div>
        </div>

        {/* Filter pills */}
        <div id="artists" className="scroll-mt-24">
          {viewMode === 'category' ? (
            <div className="flex flex-wrap gap-2 mb-12">
              <FilterPill
                active={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
                label={t('all')}
                fixedWidth="5.5rem"
              />
              {categories.map(cat => (
                <FilterPill
                  key={cat.id}
                  active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  label={lang === 'en' ? cat.en : cat.vi}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mb-12">
              <FilterPill
                active={activeArtist === 'all'}
                onClick={() => setActiveArtist('all')}
                label={t('allArtists')}
                fixedWidth="10rem"
              />
              {artists.map(artist => (
                <FilterPill
                  key={artist}
                  active={activeArtist === artist}
                  onClick={() => setActiveArtist(artist)}
                  label={artist}
                />
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        {groupedByCategory ? (
          <div className="space-y-16">
            {categories.map(cat => {
              const items = groupedByCategory.get(cat.id) || []
              if (!items.length) return null
              return (
                <div key={cat.id}>
                  <div className="flex items-center gap-4 mb-7">
                    <span className="text-[10px] tracking-[0.45em] uppercase text-gold-deep font-display">
                      {lang === 'en' ? cat.en : cat.vi}
                    </span>
                    <span className="flex-1 h-px bg-line" />
                    <span className="text-[10px] text-ink-soft/70">{items.length}</span>
                  </div>
                  <ProjectGrid
                    projects={items}
                    categories={categories}
                    lang={lang}
                    viewProjectLabel={t('viewProject')}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                    onProjectClick={onProjectClick}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <ProjectGrid
            projects={filteredProjects}
            categories={categories}
            lang={lang}
            viewProjectLabel={t('viewProject')}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            onProjectClick={onProjectClick}
          />
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-ink-soft/70 text-sm tracking-widest uppercase">
            {t('noProjects')}
          </div>
        )}
      </div>
    </section>
  )
}

function FilterPill({ active, onClick, label, fixedWidth }: { active: boolean; onClick: () => void; label: string; fixedWidth?: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={fixedWidth ? { width: fixedWidth } : undefined}
      className={`text-[10px] tracking-[0.22em] uppercase px-4 py-2 border transition-all duration-300 text-center whitespace-nowrap ${
        active
          ? 'border-gold text-gold-deep bg-gold/15'
          : 'border-line text-ink-soft hover:border-gold/70 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}

function ProjectGrid({
  projects,
  categories,
  lang,
  viewProjectLabel,
  hoveredId,
  setHoveredId,
  onProjectClick,
}: {
  projects: Project[]
  categories: CategoryDef[]
  lang: Lang
  viewProjectLabel: string
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  onProjectClick: (p: Project) => void
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          categories={categories}
          lang={lang}
          viewProjectLabel={viewProjectLabel}
          dimmed={hoveredId !== null && hoveredId !== project.id}
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  )
}

function ProjectCard({
  project,
  categories,
  lang,
  viewProjectLabel,
  dimmed,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  project: Project
  categories: CategoryDef[]
  lang: Lang
  viewProjectLabel: string
  dimmed: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}) {
  const description = projectDescription(project, lang)

  return (
    <article
      className={`group relative cursor-pointer overflow-hidden transition-all duration-500 ${
        dimmed ? 'opacity-45' : 'opacity-100'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() }
      }}
      tabIndex={0}
      role="button"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-3">
        <img
          src={project.coverImage}
          alt={projectTitle(project, lang)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={e => { ;(e.target as HTMLImageElement).src = FALLBACK_COVER }}
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/65 transition-all duration-500" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          {description && (
            <p className="text-cream/90 text-xs leading-relaxed mb-4 line-clamp-3">{description}</p>
          )}
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-cream">
            {viewProjectLabel}
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-[9px] tracking-[0.3em] uppercase bg-cream/85 text-ink px-2.5 py-1 backdrop-blur-sm border border-line">
            {getCategoryLabel(categories, project.category, lang)}
          </span>
        </div>
        {project.youtubeUrl && (
          <div className="absolute top-3 right-3">
            <span className="w-6 h-6 bg-cream/85 border border-line flex items-center justify-center">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="#3a2f18">
                <path d="M3.5 1.5l4 2.5-4 2.5V1.5z" />
              </svg>
            </span>
          </div>
        )}
      </div>
      <div className="pt-4 pb-2 border-b border-line">
        <p className="font-display text-sm text-ink tracking-wide mb-1 truncate">
          {projectTitle(project, lang)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-ink-soft italic">
            {project.artist || project.subtitle || ''}
          </span>
          <span className="text-[10px] text-ink-soft/70 tracking-widest">{project.date}</span>
        </div>
      </div>
    </article>
  )
}
