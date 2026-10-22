import { Mail } from 'lucide-react'
import { profile } from '@/data/content'
import { LiveClock } from '@/components/LiveClock'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="no-print mt-auto border-t border-[var(--border)] py-8">
      <div className="content-width-wide flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="mono-meta">
            © {year} {profile.name}
          </p>
          <LiveClock />
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-md p-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <GitHubIcon size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <LinkedInIcon size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-md p-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <Mail size={16} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  )
}
