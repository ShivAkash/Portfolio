import { ExternalLink, Copy } from 'lucide-react'
import { publication } from '@/data/content'
import { LinkButton, Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { copyToClipboard } from '@/lib/utils'

export function PublicationCard() {
  const { toast } = useToast()

  const copyCitation = async () => {
    await copyToClipboard(publication.citation)
    toast('Citation copied')
  }

  const copyBibtex = async () => {
    await copyToClipboard(publication.bibtex)
    toast('BibTeX copied')
  }

  return (
    <article className="rounded-md hairline bg-[var(--surface)] p-5">
      <p className="mono-meta mb-2">Publication</p>
      <h3 className="text-base font-semibold leading-snug">{publication.title}</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {publication.authors.map((a, i) => (
          <span key={a}>
            {i > 0 && ', '}
            {i === publication.emphasizeAuthorIndex ? (
              <strong className="font-semibold text-[var(--text)]">{a}</strong>
            ) : (
              a
            )}
          </span>
        ))}
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">{publication.venue}</p>
      <p className="mono-meta mt-1">{publication.publishedNote}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <LinkButton
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="accent"
        >
          Read on IEEE Xplore
          <ExternalLink size={14} strokeWidth={1.5} aria-hidden />
        </LinkButton>
        <Button type="button" variant="default" onClick={copyCitation}>
          <Copy size={14} strokeWidth={1.5} aria-hidden />
          Copy citation
        </Button>
        <Button type="button" variant="ghost" onClick={copyBibtex}>
          BibTeX
        </Button>
      </div>
    </article>
  )
}
