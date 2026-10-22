import { useState } from 'react'
import { experience, type ExperienceCompany } from '@/data/content'
import { cn } from '@/lib/utils'

function RoleDetails({
  bullets,
  link,
}: {
  bullets: string[]
  link?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        className="mt-1 font-mono text-[0.7rem] text-[var(--accent)] md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? 'Hide details' : 'Details'}
      </button>
      <ul
        className={cn(
          'mt-2 space-y-1.5 text-sm text-[var(--muted)]',
          open ? 'block' : 'hidden md:block',
        )}
      >
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" aria-hidden />
            <span>
              {b}
              {link && b.includes('Dropstone') && (
                <>
                  {' '}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)]"
                  >
                    dropstone.io
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CompanyBlock({ item }: { item: ExperienceCompany }) {
  const multi = item.roles.length > 1

  return (
    <article className="relative pl-6">
      <span
        className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border border-[var(--accent)] bg-[var(--bg)]"
        aria-hidden
      />
      <header className="mb-2">
        <h3 className="text-base font-semibold">{item.company}</h3>
        <p className="mono-meta">
          {item.dateRange} · {item.location}
        </p>
      </header>

      <div className={cn('space-y-4', multi && 'mt-3')}>
        {item.roles.map((role) => (
          <div key={role.title + role.dateRange}>
            {multi && (
              <div className="mb-1 flex flex-col gap-0.5 lg:flex-row lg:items-baseline lg:justify-between">
                <p className="text-sm font-medium">{role.title}</p>
                <p className="mono-meta lg:text-right">{role.dateRange}</p>
              </div>
            )}
            {!multi && (
              <div className="flex flex-col gap-0.5 lg:flex-row lg:items-baseline lg:justify-between">
                <p className="text-sm text-[var(--text)]">{role.title}</p>
                <p className="mono-meta lg:text-right">{role.dateRange}</p>
              </div>
            )}
            <RoleDetails bullets={role.bullets} link={role.link} />
          </div>
        ))}
      </div>
    </article>
  )
}

export function ExperienceTimeline({ className }: { className?: string }) {
  if (!experience.length) return null
  return (
    <div className={cn('relative space-y-8', className)}>
      <div
        className="absolute bottom-2 left-[4.5px] top-2 w-px bg-[var(--border)]"
        aria-hidden
      />
      {experience.map((item) => (
        <CompanyBlock key={item.company} item={item} />
      ))}
    </div>
  )
}
