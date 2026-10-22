import { useState } from 'react'
import { Award, FileCheck, ExternalLink } from 'lucide-react'
import { certifications, type Certification } from '@/data/content'
import { Modal } from '@/components/ui/Modal'
import { LinkButton } from '@/components/ui/Button'

function CertCard({
  cert,
  onOpen,
}: {
  cert: Certification
  onOpen: () => void
}) {
  const Icon = cert.type === 'experience-letter' ? FileCheck : Award
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full flex-col items-start gap-3 rounded-md hairline bg-[var(--surface)] p-4 text-left transition-colors hover:border-[var(--accent)]"
    >
      <Icon size={18} strokeWidth={1.5} className="text-[var(--accent)]" aria-hidden />
      <div>
        <p className="text-sm font-medium">{cert.title}</p>
        <p className="mono-meta mt-1">
          {cert.issuer} · {cert.date}
        </p>
      </div>
    </button>
  )
}

export function CertificateGallery() {
  const [active, setActive] = useState<Certification | null>(null)

  if (!certifications.length) return null

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {certifications.map((c) => (
          <CertCard key={c.id} cert={c} onOpen={() => setActive(c)} />
        ))}
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title ?? ''}
      >
        {active && (
          <div className="space-y-4">
            <p className="mono-meta">
              {active.issuer} · {active.date}
              {active.expires ? ` · Expires ${active.expires}` : ''}
            </p>
            <div className="overflow-hidden rounded-md hairline bg-[var(--surface)]">
              <img
                src={active.image}
                alt={`${active.title} certificate`}
                className="mx-auto max-h-[50vh] w-full object-contain"
                loading="lazy"
                onError={(e) => {
                  const t = e.currentTarget
                  t.style.display = 'none'
                  const fallback = t.nextElementSibling as HTMLElement | null
                  if (fallback) fallback.hidden = false
                }}
              />
              <p
                hidden
                className="px-4 py-12 text-center text-sm text-[var(--muted)]"
              >
                Certificate image placeholder — add {active.image}
              </p>
            </div>
            {active.verifyUrl && (
              <LinkButton
                href={active.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="accent"
              >
                Verify
                <ExternalLink size={14} strokeWidth={1.5} aria-hidden />
              </LinkButton>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}
