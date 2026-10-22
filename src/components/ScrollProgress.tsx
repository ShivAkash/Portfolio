import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      data-scroll-progress
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-[var(--accent-solid)] transition-[width] duration-75"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
