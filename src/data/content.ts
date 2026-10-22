/**
 * Single source of truth for all portfolio content.
 * Edit this file to update the site — components only render from here.
 */

export type ProjectCategory = 'ML / AI' | 'Web' | 'Systems' | 'Security / Safety'

/** Preferred filter order; chips only appear if at least one project uses the tag/category */
const FILTER_ORDER: ProjectCategory[] = [
  'ML / AI',
  'Web',
  'Systems',
  'Security / Safety',
]

export interface ProjectLinks {
  github?: string
  live?: string
  paper?: string
}

export interface Project {
  slug: string
  title: string
  oneLiner: string
  dateRange: string
  tags: string[]
  categories: ProjectCategory[]
  featured: boolean
  /** Set false (or omit from activeProjects) to hide from the site */
  published: boolean
  overview: string
  problem: string
  whatIBuilt: string[]
  results: string[]
  stats: string[]
  stack: string[]
  links: ProjectLinks
}

export interface ExperienceRole {
  title: string
  dateRange: string
  bullets: string[]
  link?: string
}

export interface ExperienceCompany {
  company: string
  location: string
  dateRange: string
  roles: ExperienceRole[]
}

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  expires?: string
  verifyUrl?: string
  image: string
  type: 'certification' | 'experience-letter'
}

export interface Achievement {
  title: string
  detail: string
}

export interface Publication {
  title: string
  authors: string[]
  /** Index of the portfolio owner in authors[] — emphasized in UI */
  emphasizeAuthorIndex: number
  venue: string
  publishedNote: string
  url: string
  bibtex: string
  citation: string
}

export const profile = {
  name: 'Shiv Akash S M',
  shortName: 'Shiv Akash',
  monogram: 'SA',
  role: 'AI/ML & GenAI Engineer · Software Engineer',
  label: 'B.Tech CSE · SRM Institute of Science & Technology',
  summary:
    "I'm a Computer Science student at SRM Institute of Science and Technology who enjoys turning ideas into software people can actually use. I've interned at Blankline and Yaale Technologies, and recently co-authored a research paper published on IEEE Xplore.",
  about:
    "I'm a Computer Science and Engineering student at SRM Institute of Science and Technology. I like working on problems where careful engineering makes something noticeably easier to use, and I learn best by building things and seeing how they hold up.\n\nOver the past couple of years I've interned at Blankline and Yaale Technologies. At Blankline, I worked on AI-powered automation tools, including Dropstone, and shared product ideas alongside engineers and the wider team. At Yaale, I worked on a website redesign and a chatbot for client projects. Working closely with different teams taught me to build for the people who will use a product, not just for the spec.\n\nOutside of coursework, I take part in hackathons and work on personal projects. I enjoy building technology that simplifies complex tasks and cuts down repetitive work.",
  email: 'shivakash.2k6@gmail.com',
  location: 'Chennai, India',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST',
  github: 'https://github.com/ShivAkash',
  linkedin: 'https://www.linkedin.com/in/shiv-akash-murugan/',
  resume: {
    driveId: '1hMxTEe8QuXvyzzmc69xpq9GWhwbOCc3V',
    previewUrl:
      'https://drive.google.com/file/d/1hMxTEe8QuXvyzzmc69xpq9GWhwbOCc3V/preview',
    downloadUrl:
      'https://drive.google.com/uc?export=download&id=1hMxTEe8QuXvyzzmc69xpq9GWhwbOCc3V',
    viewUrl:
      'https://drive.google.com/file/d/1hMxTEe8QuXvyzzmc69xpq9GWhwbOCc3V/view?usp=drive_link',
  },
  photo: '/photo.png',
  education: {
    degree: 'Bachelor of Technology, Computer Science and Engineering (core)',
    school: 'SRM Institute of Science & Technology',
    campus: 'Kattankulathur, Tamil Nadu, India',
    period: '2023 – 2027',
    cgpa: '9.37/10',
  },
  focusAreas: ['Machine Learning', 'Audio ML', 'LLM systems', 'Full-stack products'],
  siteUrl: 'https://shivakash.dev',
} as const

export const experience: ExperienceCompany[] = [
  {
    company: 'Yaale Technologies',
    location: 'Tamil Nadu, India',
    dateRange: 'May 2025 – Jun 2025',
    roles: [
      {
        title: 'Summer Intern',
        dateRange: 'May 2025 – Jun 2025',
        bullets: [
          'Redesigned and prototyped 30+ pages of a legacy client website to modern UI/UX standards, improving usability and visual appeal.',
          "Built a business chatbot by integrating LLM-driven NLU with Rasa's CALM system, improving task resolution by 40%.",
          'Coordinated cross-functional teams in an Agile setup for end-to-end delivery of a WordPress-based web solution for a major MNC, keeping brand consistency and performance.',
        ],
      },
    ],
  },
  {
    company: 'Blankline',
    location: 'Chennai, India',
    dateRange: 'Jul 2024 – Mar 2025',
    roles: [
      {
        title: 'Software Development Engineer (SDE) Intern',
        dateRange: 'Oct 2024 – Mar 2025',
        bullets: [
          'Designed and built scalable backend systems and AI-powered automation tools, cutting development cycles by 25% for beta tools LawyerX and DoctorX through component-based UIs with auto-inferred API routes.',
          'Optimized system performance and integrated compliance-aware validation pipelines for faster product readiness.',
          'Implemented technical SEO (server-side rendering, dynamic metadata generation), improving site performance and search discoverability.',
          'Proposed product and feature ideas and co-developed investor pitch decks, presented to a venture capital firm.',
        ],
      },
      {
        title: 'Summer Intern',
        dateRange: 'Jul 2024 – Oct 2024',
        bullets: [
          'Worked on Dropstone, improving and building automation workflows for AI-based products.',
          'Implemented prompt-driven full-stack generation workflows and modular schema orchestration, contributing to a 30% increase in feature deployment velocity.',
        ],
        link: 'https://www.dropstone.io/',
      },
    ],
  },
]

export const projects: Project[] = [
  {
    slug: 'thirdear',
    title: 'ThirdEar',
    oneLiner:
      'Real-time, on-device audio pattern detection using a lightweight CNN on Mel-spectrogram features.',
    dateRange: 'May 2025 – Jan 2026',
    tags: ['ML / AI', 'Audio', 'Edge'],
    categories: ['ML / AI', 'Systems'],
    featured: true,
    published: true,
    overview:
      'Real-time, on-device audio detection using a lightweight CNN on Mel-spectrogram features to identify critical environmental sounds (alarms, speech cues).',
    problem:
      'Headphone users often miss important environmental sounds. Cloud-based detection adds latency and privacy risk; an on-device solution needs to stay fast on modest CPUs.',
    whatIBuilt: [
      'End-to-end pipeline: audio acquisition, preprocessing (noise reduction, normalization, silence removal), and STFT-based feature extraction.',
      'Lightweight CNN classifier trained on Mel-spectrogram features for critical environmental sounds.',
      'Confidence-based decision mechanism with temporal smoothing (threshold plus cooldown).',
      'TFLite-quantized inference targeting ~120 ms latency on CPU.',
    ],
    results: [
      '~120 ms end-to-end latency with TFLite-quantized inference on CPU.',
      'Published at IEEE ICITIIT 2026 / IEEE Xplore.',
    ],
    stats: ['~120 ms latency', 'On-device CPU', 'IEEE published'],
    stack: ['Python', 'TensorFlow / TFLite', 'Librosa', 'NumPy'],
    links: {
      github: 'https://github.com/ShivAkash/ThirdEar',
      paper: 'https://ieeexplore.ieee.org/abstract/document/11499663',
    },
  },
  {
    slug: 'automata',
    title: 'Automata',
    oneLiner:
      'Web platform that extracts structured requirements from PDFs using a fine-tuned Qwen-2B model with ARAG.',
    dateRange: 'Mar 2025 – Apr 2025',
    tags: ['ML / AI', 'Web', 'LLM'],
    categories: ['ML / AI', 'Web'],
    featured: true,
    published: true,
    overview:
      'Web platform that extracts structured requirements from PDFs using a fine-tuned Qwen-2B model with ARAG, reducing API latency by 20%.',
    problem:
      'Turning unstructured PDF requirements into structured specs is slow and error-prone. Existing LLM pipelines were latency-heavy and produced inconsistent extractions.',
    whatIBuilt: [
      'Qwen-2B + ARAG pipeline with CUDA-accelerated fine-tuning and prompt-guided chunk ranking.',
      'SEDM (Secure Export Document Management) with Markdown/Word export and user auth.',
      'FastAPI backend and React frontend for the extraction workflow.',
    ],
    results: [
      'F1 score improved from 0.71 to 0.83.',
      'API latency reduced by 20%.',
      'SEDM improved early adoption and document workflows.',
    ],
    stats: ['F1 0.71 → 0.83', '-20% API latency'],
    stack: ['Next.js', 'FastAPI', 'TypeScript', 'Python', 'Qwen2-VL', 'ARAG'],
    links: {
      github: 'https://github.com/ShivAkash/Automata',
    },
  },
  {
    slug: 'map-assist',
    title: 'Map Assist',
    oneLiner:
      'A location-aware chat app for exploring places and getting directions in plain language.',
    dateRange: '',
    tags: ['ML / AI', 'Web'],
    categories: ['ML / AI', 'Web'],
    featured: false,
    published: true,
    overview:
      'A chat application that helps users navigate and explore their surroundings using natural language. It combines mapping services, mobility data and a language model to answer location-based queries.',
    problem: '',
    whatIBuilt: [
      "Interactive map interface showing the user's current location and planned routes on an OpenStreetMap-powered map.",
      'Natural-language chat for nearby places, directions and mobility options (for example "Where is the nearest coffee shop?" or "Show me bike routes to the park").',
      'Location discovery for points of interest, amenities and services nearby.',
      'Accessibility information, such as wheelchair accessibility of places.',
    ],
    results: [],
    stats: ['Natural-language routing', 'POI discovery', 'Open-source (MIT)'],
    stack: [
      'Next.js 15',
      'React 19',
      'TailwindCSS',
      'Leaflet.js',
      'OpenStreetMap (Overpass API, Nominatim)',
      'OSRM',
      'Hugging Face API (Mistral-7B-Instruct)',
    ],
    links: {
      github: 'https://github.com/ShivAkash/Map-Assist',
    },
  },
  {
    slug: 'deception-detection',
    title: 'Deception Detection',
    oneLiner:
      'A Chrome extension that warns you when a page uses deceptive wording.',
    dateRange: '',
    tags: ['Web', 'Security / Safety'],
    categories: ['Web', 'Security / Safety'],
    featured: false,
    published: true,
    overview:
      'A browser extension that scans the text of the current webpage for known deceptive words associated with dark patterns and misleading practices, and warns the user when it finds them.',
    problem: '',
    whatIBuilt: [
      'Content-scanning logic that checks page text against a list of deceptive words.',
      'Extension popup that shows whether deceptive words were found on the current page.',
      'Background and page communication between the extension and the webpage.',
      'Loads as an unpacked Chrome extension (Manifest-based).',
    ],
    results: [],
    stats: ['Chrome extension', 'Dark-pattern detection'],
    stack: [
      'JavaScript',
      'HTML',
      'Chrome Extension (manifest.json, popup, content scripts)',
    ],
    links: {
      github: 'https://github.com/ShivAkash/Deception-Detection',
    },
  },
  // ---------------------------------------------------------------------------
  // PLACEHOLDER — future project. Set published: true and fill fields to show.
  // This entry is intentionally unpublished and will not render on the site.
  // ---------------------------------------------------------------------------
  {
    slug: 'future-project',
    title: '[PLACEHOLDER] Future Project',
    oneLiner: 'Replace this one-liner when you add a new project.',
    dateRange: '',
    tags: [],
    categories: [],
    featured: false,
    published: false,
    overview: '',
    problem: '',
    whatIBuilt: [],
    results: [],
    stats: [],
    stack: [],
    links: {},
  },
]

/** Projects that appear on the site */
export const activeProjects = projects.filter((p) => p.published)

export const featuredProjects = activeProjects.filter((p) => p.featured)

function projectMatchesFilter(project: Project, filter: ProjectCategory): boolean {
  return (
    project.categories.includes(filter) || project.tags.includes(filter)
  )
}

/** Filter chips derived from data — only categories used by at least one published project */
export function getProjectFilters(): Array<'All' | ProjectCategory> {
  const used = new Set<ProjectCategory>()
  for (const p of activeProjects) {
    for (const c of FILTER_ORDER) {
      if (projectMatchesFilter(p, c)) used.add(c)
    }
  }
  return ['All', ...FILTER_ORDER.filter((c) => used.has(c))]
}

export const publication: Publication = {
  title:
    'Real-Time Audio Pattern Detection for Enhancing Situational Awareness in Headphone Users Using Deep Learning',
  authors: ['Shiv Akash S M', 'Dheeraj Konakalla', 'Dr. Pavithra Guru R'],
  emphasizeAuthorIndex: 0,
  venue:
    'Proceedings of the 7th International Conference on Innovative Trends in Information Technology (ICITIIT 2026), Indian Institute of Information Technology Kottayam, March 2026.',
  publishedNote: 'Published on IEEE Xplore, May 2026.',
  url: 'https://ieeexplore.ieee.org/abstract/document/11499663',
  bibtex: `@inproceedings{akash2026thirdear,
  title={Real-Time Audio Pattern Detection for Enhancing Situational Awareness in Headphone Users Using Deep Learning},
  author={Akash S M, Shiv and Konakalla, Dheeraj and Guru R, Pavithra},
  booktitle={Proceedings of the 7th International Conference on Innovative Trends in Information Technology (ICITIIT 2026)},
  year={2026},
  organization={IEEE}
}`,
  citation:
    'Shiv Akash S M, Dheeraj Konakalla, Dr. Pavithra Guru R. "Real-Time Audio Pattern Detection for Enhancing Situational Awareness in Headphone Users Using Deep Learning." Proceedings of ICITIIT 2026, IIIT Kottayam, March 2026. IEEE Xplore, May 2026.',
}

export const certifications: Certification[] = [
  {
    id: 'sap-genai',
    title: 'SAP Generative AI Developer',
    issuer: 'SAP',
    date: 'Mar 12, 2026',
    expires: 'Mar 13, 2027',
    verifyUrl:
      'https://www.credly.com/badges/ae33fafa-a537-494a-9844-97ac5c3f96db',
    image: '/certs/sap-genai.svg',
    type: 'certification',
  },
  {
    id: 'nptel-ml',
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL, IIT Kharagpur',
    date: 'Jul – Sep 2025',
    image: '/certs/nptel-ml.svg',
    type: 'certification',
  },
  {
    id: 'blankline-sde',
    title: 'SDE Intern — Verified internship',
    issuer: 'Blankline',
    date: '3 Oct 2024 – 31 Mar 2025',
    image: '/certs/blankline-sde.svg',
    type: 'experience-letter',
  },
  {
    id: 'blankline-summer',
    title: 'Summer Intern — Verified internship',
    issuer: 'Blankline',
    date: '1 Jul 2024 – 1 Oct 2024',
    image: '/certs/blankline-summer.svg',
    type: 'experience-letter',
  },
  {
    id: 'yaale',
    title: 'Summer Intern — Verified internship',
    issuer: 'Yaale Technologies',
    date: '2 Jun 2025 – 30 Jun 2025',
    image: '/certs/yaale.svg',
    type: 'experience-letter',
  },
]

export const achievements: Achievement[] = [
  {
    title: 'HackQuest 2024',
    detail: 'Winner (organized by Code Dolt, Mar 2024)',
  },
  {
    title: 'Innovate 2025 Hackathon',
    detail:
      'Innovation Award (organized by MANIT Bhopal, Thapar Institute and Modi Institute of Technology)',
  },
  {
    title: 'Advent of Code 2024',
    detail: 'Global Score 144 (50 challenges completed)',
  },
  {
    title: 'STEP employability assessment',
    detail: 'Ranked 202nd (intra-institute ranking)',
  },
]

export const skills = {
  Languages: ['Python', 'C++', 'C', 'JavaScript'],
  'Frameworks and libraries': [
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Librosa',
    'NumPy',
    'Pandas',
    'React.js',
    'Flask',
    'FastAPI',
    'Django',
  ],
  'Infra and tools': [
    'Docker',
    'Git',
    'Bash',
    'Ansible',
    'Linux',
    'SQL',
    'RESTful APIs',
    'Figma',
    'PowerPoint',
  ],
  Certification: ['SAP Generative AI Developer', 'NPTEL Introduction to Machine Learning'],
} as const

export const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export function getProjectBySlug(slug: string): Project | undefined {
  return activeProjects.find((p) => p.slug === slug)
}

export function filterProjectsByCategory(
  filter: 'All' | ProjectCategory,
): Project[] {
  if (filter === 'All') return activeProjects
  return activeProjects.filter((p) => projectMatchesFilter(p, filter))
}

export function getAdjacentProjects(slug: string): {
  prev?: Project
  next?: Project
} {
  const i = activeProjects.findIndex((p) => p.slug === slug)
  if (i < 0) return {}
  return {
    prev: i > 0 ? activeProjects[i - 1] : undefined,
    next: i < activeProjects.length - 1 ? activeProjects[i + 1] : undefined,
  }
}
