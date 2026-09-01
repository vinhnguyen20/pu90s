import type { Project, CategoryDef } from '../store'
import { getCategoryLabel, projectTitle } from '../store'
import { useLang } from '../i18n'

interface Props {
  projects: Project[]
  categories: CategoryDef[]
  onProjectClick: (project: Project) => void
}

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1784031208107-f489c769e1f9?w=600&h=800&fit=crop&auto=format'

export default function PortfolioSection({ projects, categories, onProjectClick }: Props) {
  const { lang } = useLang()

  return (
    <section id="portfolio" className="py-12 lg:py-16 border-t border-line bg-cream">
      {/* Header */}
      <div data-reveal className="px-[clamp(20px,4vw,64px)] mb-8">
        <p className="font-ui font-medium text-[10.5px] tracking-[0.18em] uppercase text-gold mb-3">
          {lang === 'vi' ? 'Dự án' : 'Projects'}
        </p>
        <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-ink tracking-wide">
          {lang === 'vi' ? 'DỰ ÁN' : 'PROJECTS'}
        </h2>
      </div>

      {/* Horizontal scroll */}
      <div data-reveal className="flex gap-5 overflow-x-auto px-[clamp(20px,4vw,64px)] pb-2">
        {projects.map(project => (
          <article
            key={project.id}
            className="flex-shrink-0 w-40 sm:w-48 lg:w-52 cursor-pointer group"
            onClick={() => onProjectClick(project)}
            onKeyDown={e => { if (e.key === 'Enter') onProjectClick(project) }}
            tabIndex={0}
            role="button"
          >
            <div className="aspect-[2/3] overflow-hidden mb-3 bg-cream-3">
              <img
                src={project.coverImage}
                alt={projectTitle(project, lang)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={e => { ;(e.target as HTMLImageElement).src = FALLBACK_COVER }}
              />
            </div>
            <p className="font-ui font-medium text-[10.5px] tracking-[0.18em] uppercase text-gold mb-1">
              {getCategoryLabel(categories, project.category, lang)}
            </p>
            <p className="font-display font-normal text-[19px] tracking-[-0.005em] leading-[1.32] text-ink truncate mb-0.5">
              {projectTitle(project, lang)}
            </p>
            <p className="font-ui font-light text-[12px] tracking-[0.04em] text-muted tabular-nums">{project.date}</p>
          </article>
        ))}

        {projects.length === 0 && (
          <p className="text-sm text-ink-soft/60 italic">
            {lang === 'vi' ? 'Chưa có dự án nào.' : 'No projects yet.'}
          </p>
        )}
      </div>
    </section>
  )
}
