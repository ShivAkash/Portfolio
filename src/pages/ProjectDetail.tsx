import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { getAdjacentProjects, getProjectBySlug } from '@/data/content'
import { Seo } from '@/components/Seo'
import { StatRow } from '@/components/ui/StatChip'
import { Tags } from '@/components/ui/Tags'
import { LinkButton } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { NotFound } from '@/pages/NotFound'

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  if (!children) return null
  return (
    <section className="py-6">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
        {title}
      </h2>
      <div className="text-[var(--text)]">{children}</div>
    </section>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) return <NotFound />

  const { prev, next } = getAdjacentProjects(project.slug)
  const links = [
    project.links.github
      ? { label: 'GitHub', href: project.links.github }
      : null,
    project.links.paper
      ? { label: 'Paper', href: project.links.paper }
      : null,
    project.links.live
      ? { label: 'Live', href: project.links.live }
      : null,
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <>
      <Seo
        title={project.title}
        description={project.oneLiner}
        path={`/work/${project.slug}`}
      />
      <article className="content-width py-16 sm:py-20">
        <Reveal>
          <Link
            to="/work"
            className="inline-flex items-center gap-1 text-sm text-[var(--muted)] no-underline hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
            All work
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            {project.title}
          </h1>
          {project.dateRange ? (
            <p className="mono-meta mt-2">{project.dateRange}</p>
          ) : null}
          <p className="mt-4 text-lg text-[var(--muted)]">{project.oneLiner}</p>
          <div className="mt-4 space-y-2">
            <StatRow stats={project.stats} />
            <Tags tags={project.tags} />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {project.overview && (
              <Section title="Overview">
                <p className="text-[var(--muted)]">{project.overview}</p>
              </Section>
            )}
            {project.problem && (
              <Section title="Problem">
                <p className="text-[var(--muted)]">{project.problem}</p>
              </Section>
            )}
            {project.whatIBuilt.length > 0 && (
              <Section title="What I built">
                <ul className="space-y-2 text-[var(--muted)]">
                  {project.whatIBuilt.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {project.results.length > 0 && (
              <Section title="Key results">
                <div className="space-y-3">
                  <StatRow stats={project.stats} />
                  <ul className="space-y-2 text-[var(--muted)]">
                    {project.results.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]"
                          aria-hidden
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            )}
            {project.stack.length > 0 && (
              <Section title="Tech stack">
                <p className="font-mono text-sm text-[var(--muted)]">
                  {project.stack.join(' · ')}
                </p>
              </Section>
            )}
            {links.length > 0 && (
              <Section title="Links">
                <div className="flex flex-wrap gap-2">
                  {links.map((l) => (
                    <LinkButton
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="default"
                    >
                      {l.label}
                      <ExternalLink size={14} strokeWidth={1.5} aria-hidden />
                    </LinkButton>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </Reveal>

        <nav
          className="mt-12 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6"
          aria-label="Adjacent projects"
        >
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="inline-flex items-center gap-1 text-sm no-underline hover:text-[var(--accent)]"
            >
              <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/work/${next.slug}`}
              className="inline-flex items-center gap-1 text-sm no-underline hover:text-[var(--accent)]"
            >
              {next.title}
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </>
  )
}
