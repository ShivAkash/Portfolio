import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '@/data/content'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LinkButton } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useResume } from '@/components/ResumeViewer'

export function Nav({
  onOpenCommand,
  onOpenResume,
}: {
  onOpenCommand: () => void
  onOpenResume: (opener?: HTMLElement) => void
}) {
  const [open, setOpen] = useState(false)
  const { openResume } = useResume()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm transition-colors',
      isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--text)]',
    )

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="content-width-wide flex h-12 items-center justify-between gap-4">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight no-underline hover:text-[var(--text)]"
        >
          {profile.shortName}
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink key={l.href} to={l.href} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--muted)] hairline lg:inline-flex"
            aria-label="Open command palette"
          >
            ⌘K
          </button>
          <ThemeToggle className="rounded-md p-1.5 text-[var(--muted)] hover:text-[var(--text)]" />
          <LinkButton
            href="#resume"
            variant="default"
            className="!py-1.5 !text-xs"
            onClick={(event) => {
              event.preventDefault()
              onOpenResume(event.currentTarget)
            }}
          >
            Resume
          </LinkButton>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="rounded-md p-1.5 text-[var(--muted)] hover:text-[var(--text)]" />
          <button
            type="button"
            className="rounded-md p-1.5 text-[var(--muted)] hover:text-[var(--text)]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-12 bottom-0 z-40 bg-[var(--bg)] md:hidden">
          <nav className="content-width flex flex-col gap-1 py-6" aria-label="Mobile">
            {navLinks.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-3 text-base no-underline',
                    isActive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text)]',
                  )
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="#resume"
              className="rounded-md px-3 py-3 text-base no-underline"
              onClick={(event) => {
                event.preventDefault()
                setOpen(false)
                openResume(event.currentTarget)
              }}
            >
              Resume
            </a>
            <button
              type="button"
              className="rounded-md px-3 py-3 text-left text-base text-[var(--muted)]"
              onClick={() => {
                setOpen(false)
                onOpenCommand()
              }}
            >
              Command palette (⌘K)
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
