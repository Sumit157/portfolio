export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export type ProjectStatus = 'published' | 'placeholder';

/* Three compositions so the page never falls into a repeated card rhythm */
export type ProjectLayout = 'inline' | 'flip' | 'wide';

/* Large/medium rhythm — drives padding and figure width, never type scale */
export type ProjectSize = 'large' | 'medium';

export type ProjectType = 'Case Study' | 'Project';

export interface Project {
  id: string;
  number: string;
  title: string;
  status: ProjectStatus;
  type: ProjectType;
  layout: ProjectLayout;
  size: ProjectSize;
  /* Discipline tag and subject domain — both read in the meta rail */
  category: string;
  domain: string;
  /* One strong sentence. Required: every published project has one. */
  overview: string;
  /* Approach-level paragraph — omitted where no verified approach is on file */
  approach?: string;
  /* Key/value rows under "Technical Details" — omitted rather than invented */
  technicalDetails?: ProjectSpec[];
  /* Grouped so the rail and the case study can read category-neutral items */
  technologies: { category: string; items: string[] }[];
  links: ProjectLink[];
}

/*
  Content rules (AGENTS.md §10):
  - Titles and overview lines are the owner's, verbatim where supplied.
  - Entries 02 and 03 are written from their repositories:
    github.com/Sumit157/expenseiq and github.com/Sumit157/VeriFactAudit.
  - Entries 01, 04, 05 and 06 carry only the owner-supplied facts —
    no metrics, datasets, AWS services, libraries or results are invented,
    and projects without a verified repository carry no link.
  - Figures are presentation: they are selected by project id in
    components/projects/figures, not stored here.
*/
export const projects: Project[] = [
  {
    id: 'autonomous-car-navigation',
    number: '01',
    title: 'Autonomous Car Navigation Using NEAT',
    status: 'published',
    type: 'Case Study',
    layout: 'inline',
    size: 'large',
    category: 'Neuroevolution',
    domain: 'Autonomous Navigation',
    overview:
      'A simulated car whose driving controller is evolved with NEAT rather than programmed.',
    approach:
      'NEAT (NeuroEvolution of Augmenting Topologies) evolves both the structure and the weights of a network. It begins with minimal genomes and increases complexity over generations, adding nodes and connections only when selection finds them useful. Applied to a car on a track, the network maps sensor input to driving control with no hand-written rules — the behaviour has to be discovered rather than specified.',
    technicalDetails: [
      { label: 'Simulation', value: 'Virtual 2D track — no physical vehicle' },
      { label: 'Input', value: 'Radar-style sensor readings' },
      { label: 'Fitness', value: 'Distance covered and time survived' },
      { label: 'Termination', value: 'Collision ends a run' },
    ],
    technologies: [
      { category: 'Approach', items: ['NEAT'] },
      { category: 'Language', items: ['Python'] },
      { category: 'Environment', items: ['Pygame'] },
    ],
    links: [],
  },
  {
    id: 'expense-tracker-v2',
    number: '02',
    title: 'ExpenseIQ V2 / Personal Expense Tracker',
    status: 'published',
    type: 'Case Study',
    layout: 'flip',
    size: 'medium',
    category: 'Full-Stack Web',
    domain: 'Personal Finance',
    overview:
      'A multi-user expense tracker with accounts, protected sessions and spending charts — the web build that follows an earlier command-line tracker.',
    approach:
      'Passwords are hashed with bcrypt at twelve salt rounds and exchanged for a seven-day JWT. A verification middleware guards every expense route, every query filters by user id so one account never reaches another’s data, and a toJSON() override keeps the stored hash out of every response. The interface is plain HTML, Tailwind CSS and JavaScript calling an Express API backed by MongoDB Atlas, with Chart.js drawing the charts; Vercel serves the frontend and Render the API.',
    technicalDetails: [
      { label: 'Architecture', value: 'Static frontend against a REST API' },
      { label: 'Sessions', value: 'JWT, seven-day expiry' },
      { label: 'Isolation', value: 'Queries filtered by user id' },
      { label: 'Hosting', value: 'Vercel frontend · Render backend' },
    ],
    technologies: [
      { category: 'Frontend', items: ['HTML', 'Tailwind CSS', 'JavaScript'] },
      { category: 'Charts', items: ['Chart.js'] },
      { category: 'Backend', items: ['Node.js', 'Express'] },
      { category: 'Database', items: ['MongoDB Atlas'] },
      { category: 'Authentication', items: ['JWT', 'bcryptjs'] },
      { category: 'Deployment', items: ['Vercel', 'Render'] },
    ],
    links: [
      {
        label: 'View repository',
        href: 'https://github.com/Sumit157/expenseiq',
        external: true,
      },
    ],
  },
  {
    id: 'verifact-ai',
    number: '03',
    title: 'VeriFact AI',
    status: 'published',
    type: 'Case Study',
    layout: 'wide',
    size: 'large',
    category: 'Web Application',
    domain: 'Fact Verification',
    overview:
      'A fact-checking application: a claim goes in, and a verdict, a credibility reading and its sources come back out.',
    approach:
      'The interface is a React application written in TypeScript and built with Vite. A claim is passed to the Google Gemini API through a dedicated service module, and the response settles into a structured view — a credibility gauge, a verdict badge, per-source cards and a documentation panel. The API key arrives as an environment variable, and the static build deploys to Vercel, Netlify or GitHub Pages.',
    technicalDetails: [
      { label: 'Model access', value: 'Gemini API key via environment variable' },
      { label: 'Response view', value: 'Gauge · verdict · source cards · documentation' },
      { label: 'Build', value: 'Vite static bundle' },
    ],
    technologies: [
      { category: 'Language', items: ['TypeScript'] },
      { category: 'Interface', items: ['React', 'Vite'] },
      { category: 'Model', items: ['Google Gemini'] },
      { category: 'Deployment', items: ['Vercel', 'Netlify'] },
    ],
    links: [
      {
        label: 'View repository',
        href: 'https://github.com/Sumit157/VeriFactAudit',
        external: true,
      },
    ],
  },
  {
    id: 'rppg-deepfake-detector',
    number: '04',
    title: 'rPPG Deepfake Detector',
    status: 'published',
    type: 'Project',
    layout: 'inline',
    size: 'medium',
    category: 'Signal Analysis',
    domain: 'Deepfake Detection',
    overview:
      'Detecting deepfakes by reading the pulse signal a real face leaves in a video.',
    approach:
      'Remote photoplethysmography (rPPG) reads blood flow as light. Across video frames, a region of interest on the face is sampled from the green channel, and its brightness over time resolves into a pulse trace — the analysis runs on that signal rather than on the rendered texture of the face.',
    technicalDetails: [
      { label: 'Input', value: 'Facial region across video frames' },
      { label: 'Signal', value: 'Green-channel brightness over time' },
      { label: 'Reading', value: 'Pulse trace' },
    ],
    technologies: [
      { category: 'Approach', items: ['rPPG', 'Green-channel sampling'] },
      { category: 'Field', items: ['Deepfake detection'] },
    ],
    links: [],
  },
  {
    id: 'distributed-file-system',
    number: '05',
    title: 'Distributed File System on AWS',
    status: 'published',
    type: 'Case Study',
    layout: 'flip',
    size: 'large',
    category: 'Cloud & Storage',
    domain: 'Distributed Systems',
    overview: 'A file system that spreads storage across nodes, built on AWS.',
    approach:
      'Files are split into chunks before they leave the client, which talks to the server over sockets. The server writes chunks to storage on AWS, and metadata records where every chunk lives. Replicas are kept across storage nodes, and the system was exercised through upload, download, replication and recovery runs.',
    technicalDetails: [
      { label: 'Interface', value: 'Socket-based client-server' },
      { label: 'Data path', value: 'Chunked upload and download' },
      { label: 'Replication', value: 'Copies held across storage nodes' },
      { label: 'Metadata', value: 'Records where each chunk lives' },
      { label: 'Testing', value: 'Replication and recovery runs' },
    ],
    technologies: [
      { category: 'Language', items: ['Python'] },
      { category: 'Cloud', items: ['AWS'] },
      { category: 'Mechanisms', items: ['Chunking', 'Replication', 'Metadata management'] },
      { category: 'Transport', items: ['Sockets'] },
    ],
    links: [],
  },
  {
    id: 'research-agent',
    number: '06',
    title: 'Research Agent using Ollama and Groq',
    status: 'published',
    type: 'Project',
    layout: 'wide',
    size: 'medium',
    category: 'AI Engineering',
    domain: 'AI Agents',
    overview: 'A research agent that works a topic end to end, using Ollama and Groq.',
    approach:
      'Two inference backends sit behind the agent: Ollama runs models on the local machine, while Groq serves models through its hosted API. The project is written against both rather than a single provider.',
    technologies: [
      { category: 'Runtime', items: ['Ollama'] },
      { category: 'API', items: ['Groq'] },
    ],
    links: [],
  },
];
