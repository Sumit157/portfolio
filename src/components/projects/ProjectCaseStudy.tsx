import { useLayoutEffect, useRef } from 'react';
import { useGSAP } from '@/animations/gsap/useGSAP';
import { clsx } from '@/utils/clsx';
import type { Project } from '@/data/projects';
import { ProjectFigure } from './ProjectFigure';

interface ProjectCaseStudyProps {
  project: Project;
  /* Zero-padded project count — the head counter reads 01 / 06 */
  total: string;
}

export function ProjectCaseStudy({ project, total }: ProjectCaseStudyProps) {
  const { gsap, createTimeline, createScrollTrigger, prefersReducedMotion } = useGSAP();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = createTimeline();

      tl.from('.case__index', { y: 40, opacity: 0, duration: 0.9 })
        .from('.case__title', { y: 48, opacity: 0, duration: 1 }, '-=0.6')
        .from('.case__meta', { y: 24, opacity: 0, duration: 0.7 }, '-=0.55')
        .from('.case__text > *', { y: 26, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.45')
        .from(
          '.case__plate',
          { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'power3.out' },
          '-=0.95'
        );

      createScrollTrigger({
        trigger: sectionRef.current,
        start: 'top 78%',
        animation: tl,
        toggleActions: 'play none none none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, createTimeline, createScrollTrigger, gsap]);

  /* Discipline first, subject second, then the leading technology group */
  const metaItems = [
    project.category,
    project.domain,
    ...(project.technologies[0]?.items ?? []),
  ];

  return (
    <section
      ref={sectionRef}
      id={project.id}
      className={clsx('case', `case--${project.layout}`, `case--${project.size}`)}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="case__head">
        <div className="case__index t-index" aria-hidden="true">
          <span className="case__index-num">{project.number}</span>
          <span className="case__index-total">{`/ ${total}`}</span>
        </div>

        <div className="case__title-wrap">
          <h3 className="case__title t-display-project t-balance" id={`${project.id}-title`}>
            {project.title}
          </h3>

          <div className="case__meta">
            {metaItems.map((item, index) => (
              <span key={item} className="t-meta t-meta--primary">
                {item}
                {index < metaItems.length - 1 && (
                  <span className="case__meta-sep" aria-hidden="true">
                    {' / '}
                  </span>
                )}
              </span>
            ))}
            <span className="case__meta-tail t-meta">{project.type}</span>
          </div>
        </div>
      </div>

      <div className="case__body">
        <div className="case__text">
          <p className="case__label t-meta">Overview</p>
          <p className="case__lead t-statement">{project.overview}</p>

          {project.approach && <p className="case__desc t-body t-pretty">{project.approach}</p>}

          {project.technicalDetails && (
            <div className="case__block">
              <p className="case__label t-meta">Technical Details</p>
              <dl className="case__spec">
                {project.technicalDetails.map((row) => (
                  <div className="case__spec-row" key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="case__block">
            <p className="case__label t-meta">Technologies</p>
            <dl className="case__spec">
              {project.technologies.map((group) => (
                <div className="case__spec-row" key={group.category}>
                  <dt>{group.category}</dt>
                  <dd>{group.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </div>

          {project.links.length > 0 && (
            <ul className="case__links">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    className="link-arrow"
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                  >
                    {link.label}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="case__plate">
          <ProjectFigure projectId={project.id} number={project.number} />
        </div>
      </div>
    </section>
  );
}
