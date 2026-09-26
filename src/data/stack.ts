export interface StackGroup {
  index: string;
  label: string;
  items: string[];
}

/*
  The owner's own list, grouped exactly as supplied. No proficiency scores,
  no years, no tool that was not named (AGENTS.md §10).
*/
export const stackGroups: StackGroup[] = [
  {
    index: '01',
    label: 'Languages',
    items: ['Python', 'C', 'Java', 'TypeScript', 'JavaScript'],
  },
  {
    index: '02',
    label: 'Backend',
    items: ['Node.js', 'Flask'],
  },
  {
    index: '03',
    label: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'SQLite'],
  },
  {
    index: '04',
    label: 'Machine Learning',
    items: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'YOLO', 'NEAT'],
  },
  {
    index: '05',
    label: 'Cloud / DevOps',
    items: [
      'Linux',
      'Docker',
      'AWS',
      'Jenkins',
      'GitHub Actions',
      'Kubernetes',
      'Terraform',
    ],
  },
  {
    index: '06',
    label: 'Data / Tools',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Streamlit', 'Tkinter', 'Pygame'],
  },
];
