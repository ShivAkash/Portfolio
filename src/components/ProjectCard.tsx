import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/content'
import { StatRow } from '@/components/ui/StatChip'
import { Tags } from '@/components/ui/Tags'
import { cn } from '@/lib/utils'

export function ProjectCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className={cn(
        'group block rounded-md hairline bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)] no-underline',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
            {project.title}
          </h3>
          {project.dateRange ? (
            <p className="mono-meta mt-0.5">{project.dateRange}</p>
          ) : null}
        </div>
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="mt-1 shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)]"
          aria-hidden
        />
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">{project.oneLiner}</p>
      <div className="mt-3 space-y-2">
        <StatRow stats={project.stats} />
        <Tags tags={project.tags} />
      </div>
    </Link>
  )
}

export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group flex flex-col gap-2 border-b border-[var(--border)] py-5 no-underline last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
            {project.title}
          </h2>
          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
            className="text-[var(--muted)] opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        </div>
        <p className="mt-1 text-sm text-[var(--muted)]">{project.oneLiner}</p>
        <Tags tags={project.tags} className="mt-2" />
      </div>
      {project.dateRange ? (
        <p className="mono-meta shrink-0 sm:text-right">{project.dateRange}</p>
      ) : null}
    </Link>
  )
}
