import type { ReactElement } from 'react';
import { AgentFigure } from './AgentFigure';
import { ExpenseFigure } from './ExpenseFigure';
import { FilesystemFigure } from './FilesystemFigure';
import { NeatFigure } from './NeatFigure';
import { RppgFigure } from './RppgFigure';
import { VerifactFigure } from './VerifactFigure';

/* Presentation stays out of the data layer: projects select a figure by id,
   and the figure number is handed down so nothing is hardcoded twice. */
export const projectFigures: Record<string, (props: { fig: string }) => ReactElement> = {
  'autonomous-car-navigation': NeatFigure,
  'expense-tracker-v2': ExpenseFigure,
  'verifact-ai': VerifactFigure,
  'rppg-deepfake-detector': RppgFigure,
  'distributed-file-system': FilesystemFigure,
  'research-agent': AgentFigure,
};
