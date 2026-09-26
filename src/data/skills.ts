export interface SkillGroup {
  id: string
  index: string
  title: string
  description: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    index: '01',
    title: 'Languages',
    description: 'What I think and write in.',
    items: ['C', 'Python', 'Java', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'backend',
    index: '02',
    title: 'Backend',
    description: 'Services, APIs and the logic that runs them.',
    items: ['Node.js', 'Express', 'Flask', 'REST APIs'],
  },
  {
    id: 'cloud-devops',
    index: '03',
    title: 'Cloud & DevOps',
    description: 'Shipping and running software reliably.',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins', 'Linux'],
  },
  {
    id: 'databases',
    index: '04',
    title: 'Databases',
    description: 'Where the state lives.',
    items: ['MySQL', 'PostgreSQL', 'SQLite'],
  },
  {
    id: 'machine-learning',
    index: '05',
    title: 'Machine Learning',
    description: 'Models, training and inference.',
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NumPy', 'Pandas'],
  },
]
