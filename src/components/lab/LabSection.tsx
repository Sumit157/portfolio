import { useRef } from 'react';
import { useSectionReveal } from '@/animations/gsap/useSectionReveal';
import { SectionBand } from '@/components/ui/SectionBand';
import { labEntries } from '@/data/lab';
import { clsx } from '@/utils/clsx';

export function LabSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef, { stagger: 0.07, y: 24 });

  return (
    <section id="lab" ref={sectionRef} className="lab" aria-labelledby="lab-heading">
      <SectionBand id="lab-heading" title="Lab" meta="Unshipped" />

      <div className="container">
        <p className="lab__note t-body t-pretty" data-reveal>
          Experiments and concepts — unshipped by definition, and never presented as
          finished work.
        </p>

        <ol className="lab__list">
          {labEntries.map((entry, position) => (
            <li
              key={entry.id}
              className={clsx('lab__entry', position % 2 === 1 && 'lab__entry--offset')}
              data-reveal
            >
              <span className="lab__index t-index" aria-hidden="true">
                {entry.index}
              </span>

              <h3 className="lab__title t-display-project t-balance">{entry.title}</h3>

              <span className="lab__kind t-meta">{entry.kind}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
