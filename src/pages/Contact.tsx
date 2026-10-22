import { Mail, Copy, Download, Check } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { useState } from 'react'
import { profile } from '@/data/content'
import { Seo } from '@/components/Seo'
import { Button, LinkButton } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { useToast } from '@/components/ui/Toast'
import { copyToClipboard } from '@/lib/utils'
import { useResume } from '@/components/ResumeViewer'

export function Contact() {
  const { openResume } = useResume()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await copyToClipboard(profile.email)
    setCopied(true)
    toast('Copied')
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      <Seo
        title="Contact"
        description={`Get in touch with ${profile.name}.`}
        path="/contact"
      />
      <div className="content-width py-16 sm:py-24">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-3 max-w-md text-[var(--muted)]">
            The fastest way to reach me is email. Happy to talk about internships,
            ML systems, or interesting problems.
          </p>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-10 flex w-full items-center justify-between gap-4 rounded-md hairline bg-[var(--surface)] px-5 py-5 text-left transition-colors hover:border-[var(--accent)] sm:px-6"
            aria-label={`Copy email ${profile.email}`}
          >
            <span className="flex items-center gap-3 min-w-0">
              <Mail size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
              <span className="truncate text-lg font-medium sm:text-xl">
                {profile.email}
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-[var(--muted)]">
              {copied ? (
                <>
                  <Check size={14} strokeWidth={1.5} aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} strokeWidth={1.5} aria-hidden />
                  Copy
                </>
              )}
            </span>
          </button>

          <div className="mt-6 flex flex-wrap gap-2">
            <LinkButton
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon size={14} />
              LinkedIn
            </LinkButton>
            <LinkButton
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon size={14} />
              GitHub
            </LinkButton>
            <LinkButton
              href="#resume"
              onClick={(event) => {
                event.preventDefault()
                openResume(event.currentTarget)
              }}
            >
              <Download size={14} strokeWidth={1.5} aria-hidden />
              Resume
            </LinkButton>
            <Button type="button" variant="ghost" onClick={copyEmail}>
              Copy email
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  )
}
