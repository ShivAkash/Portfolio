import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'

export function NotFound() {
  return (
    <>
      <Seo title="Not found" description="Page not found." path="/404" />
      <div className="content-width flex flex-col items-start py-24">
        <p className="mono-meta">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          That route doesn&apos;t exist. Head back home or browse work.
        </p>
        <div className="mt-6 flex gap-4 text-sm">
          <Link to="/" className="text-[var(--accent)]">
            Home
          </Link>
          <Link to="/work" className="text-[var(--accent)]">
            Work
          </Link>
        </div>
      </div>
    </>
  )
}
