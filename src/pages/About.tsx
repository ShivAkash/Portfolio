import { achievements, profile } from '@/data/content'
import { Seo } from '@/components/Seo'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { CertificateGallery } from '@/components/CertificateGallery'
import { Reveal } from '@/components/ui/Reveal'

const facts = [
  { label: 'Role / Currently', value: 'B.Tech CSE student · building ML systems & products' },
  {
    label: 'Education',
    value: `${profile.education.degree}, ${profile.education.school} (${profile.education.period}) · CGPA ${profile.education.cgpa}`,
  },
  { label: 'Location', value: profile.location },
  { label: 'Languages', value: 'Python, C++, C, JavaScript' },
  { label: 'Focus areas', value: profile.focusAreas.join(', ') },
]

export function About() {
  return (
    <>
      <Seo
        title="About"
        description={`About ${profile.name} — Computer Science student at SRM IST working on ML systems and full-stack products.`}
        path="/about"
      />
      <div className="content-width print-resume py-14 sm:py-20">
        <div className="print-only mb-6">
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <p className="text-sm">
            {profile.email} · {profile.github} · {profile.linkedin}
          </p>
        </div>

        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight no-print">About</h1>
          <img
            src={profile.photo}
            alt="Portrait of Shiv Akash S M"
            width={120}
            height={120}
            loading="lazy"
            decoding="async"
            className="mt-8 h-[120px] w-[120px] rounded-full border border-[var(--accent)] object-contain object-center"
          />
          <dl className="mt-8 space-y-4">
            {facts.map((f) => (
              <div
                key={f.label}
                className="grid gap-1 border-b border-[var(--border)] pb-4 sm:grid-cols-[160px_1fr] sm:gap-6"
              >
                <dt className="mono-meta">{f.label}</dt>
                <dd className="text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">Bio</h2>
            <p className="max-w-[640px] whitespace-pre-line text-[var(--muted)]">{profile.about}</p>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">Education</h2>
            <div className="rounded-md hairline bg-[var(--surface)] p-5">
              <p className="font-medium">{profile.education.degree}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {profile.education.school}
              </p>
              <p className="mono-meta mt-2">
                {profile.education.campus} · {profile.education.period} · CGPA{' '}
                {profile.education.cgpa}
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-semibold">Experience</h2>
            <ExperienceTimeline />
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-semibold">
              Certifications & verified internships
            </h2>
            <CertificateGallery />
          </section>
        </Reveal>

        {achievements.length > 0 && (
          <Reveal>
            <section className="mt-12">
              <h2 className="mb-6 text-xl font-semibold">Achievements</h2>
              <ul className="space-y-3">
                {achievements.map((a) => (
                  <li
                    key={a.title}
                    className="border-b border-[var(--border)] pb-3 last:border-0"
                  >
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="mt-0.5 text-sm text-[var(--muted)]">{a.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}
      </div>
    </>
  )
}
