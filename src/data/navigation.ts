export const navigationItems = [
  { label: 'Sumit Dilip Babar', href: '#hero', id: 'hero' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Work', href: '#projects', id: 'projects' },
  { label: 'Lab', href: '#lab', id: 'lab' },
  { label: 'Contact', href: '#contact', id: 'contact' },
] as const;

export type NavigationItem = (typeof navigationItems)[number];
