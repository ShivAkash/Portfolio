import { skills } from '@/data/content'

export function TechStack() {
  return (
    <dl className="space-y-4">
      {Object.entries(skills).map(([group, items]) => (
        <div
          key={group}
          className="grid gap-1 border-b border-[var(--border)] pb-4 last:border-0 sm:grid-cols-[200px_1fr] sm:gap-6"
        >
          <dt className="mono-meta pt-0.5">{group}</dt>
          <dd className="text-sm text-[var(--text)]">{items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  )
}
