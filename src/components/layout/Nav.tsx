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
  const { openResume, closeResume } = useResume()

  useEffect(() => {
    const main = document.querySelector('main')
    const previousAriaHidden = main?.getAttribute('aria-hidden')
    const previousInert = main?.inert

    document.body.style.overflow = open ? 'hidden' : ''
    if (main) {
      main.inert = open
      if (open) main.setAttribute('aria-hidden', 'true')
      else if (previousAriaHidden === null) main.removeAttribute('aria-hidden')
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    if (open) {
      document.addEventListener('keydown', closeOnEscape)
      window.addEventListener('resize', closeOnDesktop)
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktop)
      if (main) {
        main.inert = previousInert ?? false
        if (previousAriaHidden === null) main.removeAttribute('aria-hidden')
        else if (previousAriaHidden) main.setAttribute('aria-hidden', previousAriaHidden)
      }
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm transition-colors',
      isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--text)]',
    )

  return (
    <header className="no-print sticky top-0 z-[80] border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="content-width flex h-12 items-center justify-between gap-4">
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
            onClick={() => {
              if (!open) closeResume()
              setOpen((v) => !v)
            }}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-12 z-40 h-[calc(100dvh-3rem)] overflow-y-auto border-b border-[var(--border)] bg-[var(--bg)] md:hidden">
          <nav className="flex w-full flex-col px-5 py-4" aria-label="Mobile">
            {navLinks.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                className={({ isActive }) =>
                  cn(
                    'flex min-h-12 items-center border-b border-[var(--border)] text-base no-underline transition-opacity',
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
              className="flex min-h-12 items-center border-b border-[var(--border)] text-base no-underline transition-opacity"
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
              className="flex min-h-12 items-center text-left text-base text-[var(--muted)] transition-opacity"
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
