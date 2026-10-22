import { Helmet } from 'react-helmet-async'
import { profile } from '@/data/content'

export function Seo({
  title,
  description,
  path = '',
}: {
  title?: string
  description?: string
  path?: string
}) {
  const pageTitle = title
    ? `${title} · ${profile.shortName}`
    : `${profile.name} — ML & Full-stack`
  const desc =
    description ??
    'Computer Science undergraduate building machine learning systems and AI-powered products. Audio ML, LLM pipelines, full-stack.'
  const url = `${profile.siteUrl}${path}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: profile.siteUrl,
    email: profile.email,
    image: `${profile.siteUrl}${profile.photo}`,
    sameAs: [profile.github, profile.linkedin],
    jobTitle: 'Computer Science Student',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: profile.education.school,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressCountry: 'IN',
    },
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${profile.siteUrl}${profile.photo}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${profile.siteUrl}${profile.photo}`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
