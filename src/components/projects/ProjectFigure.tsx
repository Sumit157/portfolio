import { projectFigures } from './figures';

interface ProjectFigureProps {
  projectId: string;
  /* Figure number follows the project's counter — 01 / 06, never hardcoded */
  number: string;
}

export function ProjectFigure({ projectId, number }: ProjectFigureProps) {
  const Figure = projectFigures[projectId];

  if (!Figure) return null;

  return <Figure fig={number} />;
}
