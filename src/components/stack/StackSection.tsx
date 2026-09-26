import { useRef } from 'react';
import { useSectionReveal } from '@/animations/gsap/useSectionReveal';
import { SectionBand } from '@/components/ui/SectionBand';
import { stackGroups } from '@/data/stack';

export function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef, { stagger: 0.06, y: 22 });

  const total = String(stackGroups.length).padStart(2, '0');

  return (
    <section id="stack" ref={sectionRef} className="stack" aria-labelledby="stack-heading">
      <SectionBand id="stack-heading" title="Technical Stack" meta={`${total} Groups`} />

      <div className="container">
        <ul className="stack__list">
          {stackGroups.map((group) => (
            <li className="stack__row" key={group.label} data-reveal>
              <span className="stack__index t-meta" aria-hidden="true">
                {group.index}
              </span>

              <h3 className="stack__label t-meta t-meta--primary">{group.label}</h3>

              <ul className="stack__items" aria-label={group.label}>
                {group.items.map((item) => (
                  <li className="stack__item t-body-small" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
