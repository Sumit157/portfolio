import type { ReactNode } from 'react';
import { clsx } from '@/utils/clsx';

interface SectionBandProps {
  /* id of the section heading — the section points aria-labelledby at it */
  id: string;
  title: string;
  /* Short apparatus value pinned to the right of the title */
  meta?: ReactNode;
  className?: string;
}

/* Section transition: title, counter, ticked rule (DESIGN.md §12) */
export function SectionBand({ id, title, meta, className }: SectionBandProps) {
  return (
    <div className={clsx('band', className)}>
      <div className="container band__inner">
        <h2 id={id} className="band__title t-display-section">
          {title}
        </h2>
        {meta && <span className="band__meta t-meta">{meta}</span>}
      </div>

      <div className="container band__ruler">
        <div className="ruler" aria-hidden="true" />
      </div>
    </div>
  );
}
