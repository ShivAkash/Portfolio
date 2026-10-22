import { useMemo, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import {
  filterProjectsByCategory,
  getProjectFilters,
  profile,
  type ProjectCategory,
} from '@/data/content'
import { Seo } from '@/components/Seo'
import { ProjectRow } from '@/components/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

type Filter = 'All' | ProjectCategory

export function Work() {
  const filters = useMemo(() => getProjectFilters(), [])
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = useMemo(
    () => filterProjectsByCategory(filter),
    [filter],
  )

  return (
    <>
      <Seo
        title="Work"
        description="Selected projects in machine learning, audio systems, and full-stack products."
        path="/work"
      />
      <div className="content-width py-16 sm:py-20">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight">Work</h1>
          <p className="mt-2 text-[var(--muted)]">
            Projects across ML systems, audio, and full-stack products.
          </p>
        </Reveal>

        <LayoutGroup>
          <div
            className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-b border-[var(--border)] pb-3"
            role="tablist"
            aria-label="Filter projects"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  'relative pb-2 font-mono text-xs transition-colors',
                  filter === f
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]',
                )}
              >
                {f}
                {filter === f && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-x-0 -bottom-[13px] h-px bg-[var(--accent-solid)]"
                    transition={{ duration: 0.15 }}
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>

        <div className="mt-2">
          {filtered.length === 0 ? (
            <p className="py-12 text-sm text-[var(--muted)]">
              No projects in this category yet.
            </p>
          ) : (
            <LayoutGroup>
              {filtered.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  <ProjectRow project={p} />
                </motion.div>
              ))}
            </LayoutGroup>
          )}
        </div>

        <p className="mt-10">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-meta no-underline hover:text-[var(--accent)]"
          >
            More on GitHub →
          </a>
        </p>
      </div>
    </>
  )
}
