import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Small mono metadata label — not a rounded "pill" chip */
export function StatChip({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-[0.7rem] leading-none tracking-wide text-[var(--accent)]',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatRow({ stats }: { stats: string[] }) {
  if (!stats.length) return null
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {stats.map((s, i) => (
        <span key={s} className="inline-flex items-center gap-x-2">
          {i > 0 && (
            <span className="text-[var(--border)] select-none" aria-hidden>
              ·
            </span>
          )}
          <StatChip>{s}</StatChip>
        </span>
      ))}
    </p>
  )
}
