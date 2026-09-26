export type LabKind = 'experiment' | 'concept';

export interface LabEntry {
  id: string;
  index: string;
  title: string;
  kind: LabKind;
}

/*
  Lab entries are unshipped. They are never described as finished products,
  and no scope, stack or outcome is attached that the owner did not supply
  (AGENTS.md §10).
*/
export const labEntries: LabEntry[] = [
  { id: 'memecam', index: '01', title: 'MemeCam', kind: 'experiment' },
  {
    id: 'android-daily-life',
    index: '02',
    title: 'Android Health & Daily-Life Application',
    kind: 'concept',
  },
  {
    id: 'campus-animal-tagging',
    index: '03',
    title: 'Campus Animal Tagging Application',
    kind: 'concept',
  },
  {
    id: 'cartoon-streaming',
    index: '04',
    title: 'Old-Cartoon Streaming Platform',
    kind: 'concept',
  },
  {
    id: 'music-app',
    index: '05',
    title: 'Music Application Experiments',
    kind: 'experiment',
  },
];
