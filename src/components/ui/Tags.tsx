import { cn } from '@/lib/utils'

/**
 * Understated tag list — plain mono text with separators.
 * Intentionally not rounded "vibe" pills.
 */
export function Tags({
  tags,
  className,
}: {
  tags: string[]
  className?: string
}) {
  if (!tags.length) return null
  return (
    <p
      className={cn(
        'font-mono text-[0.7rem] tracking-wide text-[var(--muted)]',
        className,
      )}
    >
      {tags.join(' · ')}
    </p>
  )
}
