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
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      {stats.map((s) => (
        <StatChip key={s}>{s}</StatChip>
      ))}
    </p>
  )
}
