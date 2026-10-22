import { Link } from 'react-router-dom'
import { Mail, Download, ArrowRight } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import {
  achievements,
  featuredProjects,
  profile,
} from '@/data/content'
import { Seo } from '@/components/Seo'
import { SignalStrip } from '@/components/SignalStrip'
import { LiveClock } from '@/components/LiveClock'
import { ProjectCard } from '@/components/ProjectCard'
import { PublicationCard } from '@/components/PublicationCard'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { TechStack } from '@/components/TechStack'
import { Reveal } from '@/components/ui/Reveal'
import { Button, LinkButton } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { copyToClipboard } from '@/lib/utils'
import { useResume } from '@/components/ResumeViewer'

export function Home() {
  const { toast } = useToast()
  const { openResume } = useResume()

  return (
    <>
      <Seo path="/" />

      <section className="content-width pt-14 pb-10 sm:py-20">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-start sm:gap-8">
            <img
              src={profile.photo}
              alt="Portrait of Shiv Akash S M"
              width={112}
              height={112}
              decoding="async"
              fetchPriority="high"
              className="order-first h-24 w-24 rounded-full border border-[var(--accent)] object-contain object-center sm:order-last sm:ml-auto sm:h-28 sm:w-28"
            />
            <div className="min-w-0 flex-1">
              <p className="mono-meta">{profile.label}</p>
              <div className="relative mt-3">
                <div
                  className="pointer-events-none absolute -left-8 -top-6 h-32 w-48 rounded-full opacity-[0.06]"
                  style={{
                    background:
                      'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                  }}
                  aria-hidden
                />
                <h1 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
                  {profile.name}
                </h1>
              </div>
              <p className="mt-3 text-lg text-[var(--text)]">{profile.role}</p>
              <p className="mt-4 max-w-[640px] text-[var(--muted)]">{profile.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                <LinkButton href={`mailto:${profile.email}`} variant="accent">
                  <Mail size={14} strokeWidth={1.5} aria-hidden />
                  Email
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
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon size={14} />
                  LinkedIn
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
              </div>

              <LiveClock className="mt-5 block" />
            </div>
          </div>
          <SignalStrip className="mt-8 opacity-80" />
        </Reveal>
      </section>

      {featuredProjects.length > 0 && (
        <section className="content-width py-10 sm:py-20">
          <Reveal>
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold">Selected work</h2>
              <Link
                to="/work"
                className="inline-flex items-center gap-1 text-sm text-[var(--accent)] no-underline"
              >
                View all work
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
              </Link>
            </div>
            <div className="grid gap-5 min-[700px]:grid-cols-2">
              {featuredProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <section className="content-width py-10 sm:py-20">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold">Publication</h2>
          <PublicationCard />
        </Reveal>
      </section>

      <section className="content-width py-10 sm:py-20">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold">Experience</h2>
          <ExperienceTimeline />
        </Reveal>
      </section>

      {achievements.length > 0 && (
        <section className="content-width py-10 sm:py-20">
          <Reveal>
            <h2 className="mb-6 text-xl font-semibold">Achievements</h2>
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li
                  key={a.title}
                  className="flex flex-col gap-0.5 border-b border-[var(--border)] pb-3 last:border-0 sm:flex-row sm:justify-between sm:gap-6"
                >
                  <span className="text-sm font-medium">{a.title}</span>
                  <span className="text-sm text-[var(--muted)] sm:text-right">
                    {a.detail}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      <section className="content-width py-10 sm:py-20">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold">Tech stack</h2>
          <TechStack />
        </Reveal>
      </section>

      <section className="content-width py-10 pb-20 sm:py-20 sm:pb-24">
        <Reveal>
          {/* <p className="text-lg text-[var(--muted)]">
            Open to internships and collaborations in ML systems and full-stack
            product work.
          </p> */}
          <div className="mt-5 flex flex-wrap gap-2">
            <LinkButton href={`mailto:${profile.email}`} variant="accent">
              Say hello
            </LinkButton>
            <Button
              type="button"
              onClick={async () => {
                await copyToClipboard(profile.email)
                toast('Email copied')
              }}
            >
              Copy email
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
