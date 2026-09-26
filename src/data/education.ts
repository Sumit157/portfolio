export interface EducationItem {
  degree: string
  institution: string
  affiliation?: string
  period: string
  status: 'complete' | 'in-progress'
}

export const education: EducationItem[] = [
  {
    degree: 'BSc Computer Science',
    institution: 'Modern College of Arts, Science and Commerce',
    affiliation: 'Savitribai Phule Pune University',
    period: '2025',
    status: 'complete',
  },
  {
    degree: 'MSc Computer Science',
    institution: 'MIT World Peace University',
    period: 'Expected 2027',
    status: 'in-progress',
  },
]
