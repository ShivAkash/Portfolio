import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText,
  Mail,
  Moon,
  Sun,
  Download,
  ArrowRight,
} from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import {
  activeProjects,
  certifications,
  navLinks,
  profile,
  publication,
} from '@/data/content'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/components/ui/Toast'
import { copyToClipboard, cn } from '@/lib/utils'
import { useResume } from '@/components/ResumeViewer'

type Item = {
  id: string
  label: string
  group: string
  hint?: string
  icon?: ReactNode
  run: () => void
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { toast } = useToast()
  const { openResume } = useResume()

  const items = useMemo<Item[]>(() => {
    const go = (path: string) => () => {
      navigate(path)
      onClose()
    }

    const list: Item[] = [
      {
        id: 'home',
        label: 'Home',
        group: 'Pages',
        hint: 'G H',
        icon: <ArrowRight size={14} strokeWidth={1.5} />,
        run: go('/'),
      },
      ...navLinks.map((l) => ({
        id: l.href,
        label: l.label,
        group: 'Pages',
        icon: <ArrowRight size={14} strokeWidth={1.5} />,
        run: go(l.href),
      })),
      ...activeProjects.map((p) => ({
        id: `p-${p.slug}`,
        label: p.title,
        group: 'Projects',
        hint: p.oneLiner,
        icon: <ArrowRight size={14} strokeWidth={1.5} />,
        run: go(`/work/${p.slug}`),
      })),
      {
        id: 'pub',
        label: publication.title,
        group: 'Publication',
        icon: <FileText size={14} strokeWidth={1.5} />,
        run: () => {
          window.open(publication.url, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      ...certifications.map((c) => ({
        id: `c-${c.id}`,
        label: c.title,
        group: 'Certificates',
        hint: c.issuer,
        icon: <FileText size={14} strokeWidth={1.5} />,
        run: go('/about'),
      })),
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        group: 'Actions',
        icon:
          theme === 'dark' ? (
            <Sun size={14} strokeWidth={1.5} />
          ) : (
            <Moon size={14} strokeWidth={1.5} />
          ),
        run: () => {
          toggleTheme()
          onClose()
        },
      },
      {
        id: 'email',
        label: 'Copy email',
        group: 'Actions',
        icon: <Mail size={14} strokeWidth={1.5} />,
        run: async () => {
          await copyToClipboard(profile.email)
          toast('Email copied')
          onClose()
        },
      },
      {
        id: 'gh',
        label: 'Open GitHub',
        group: 'Actions',
        icon: <GitHubIcon size={14} />,
        run: () => {
          window.open(profile.github, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'li',
        label: 'Open LinkedIn',
        group: 'Actions',
        icon: <LinkedInIcon size={14} />,
        run: () => {
          window.open(profile.linkedin, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'view-resume',
        label: 'View resume',
        group: 'Actions',
        icon: <FileText size={14} strokeWidth={1.5} />,
        run: () => {
          openResume()
          onClose()
        },
      },
      {
        id: 'download-resume',
        label: 'Download resume',
        group: 'Actions',
        icon: <Download size={14} strokeWidth={1.5} />,
        run: () => {
          window.open(profile.resume.downloadUrl, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
    ]
    return list
  }, [navigate, onClose, openResume, theme, toggleTheme, toast])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q) ||
        (i.hint?.toLowerCase().includes(q) ?? false),
    )
  }, [items, query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const t = window.setTimeout(() => inputRef.current?.focus(), 10)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        filtered[active]?.run()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, filtered, active])

  if (!open) return null

  let lastGroup = ''

  return (
    <div
      data-command-palette
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close command palette"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-md bg-[var(--bg)] hairline">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages, projects, actions…"
          className="w-full border-b border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[var(--muted)]"
          aria-label="Search"
        />
        <ul className="max-h-80 overflow-y-auto py-2" role="listbox">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-[var(--muted)]">
              No results
            </li>
          )}
          {filtered.map((item, i) => {
            const showGroup = item.group !== lastGroup
            lastGroup = item.group
            return (
              <li key={item.id}>
                {showGroup && (
                  <p className="mono-meta px-4 pb-1 pt-2">{item.group}</p>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-2 text-left text-sm',
                    i === active
                      ? 'bg-[var(--accent-soft)] text-[var(--text)]'
                      : 'text-[var(--muted)] hover:bg-[var(--accent-soft)]',
                  )}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => item.run()}
                >
                  <span className="shrink-0 text-[var(--muted)]">{item.icon}</span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.hint && (
                    <span className="hidden max-w-[40%] truncate font-mono text-[0.65rem] text-[var(--muted)] sm:block">
                      {item.hint}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
