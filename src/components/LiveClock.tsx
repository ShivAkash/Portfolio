import { useLocalTime } from '@/hooks/useLocalTime'
import { cn } from '@/lib/utils'

export function LiveClock({ className }: { className?: string }) {
  const label = useLocalTime()
  return (
    <time className={cn('mono-meta', className)} dateTime={new Date().toISOString()}>
      {label}
    </time>
  )
}
