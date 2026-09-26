import { useLayoutEffect, useRef } from 'react';
import { useGSAP } from '@/animations/gsap/useGSAP';
import { useLenis } from '@/components/layout/ScrollProvider';
import { siteConfig } from '@/data/site';

const facts = [
  {
    label: 'Current',
    primary: 'MSc Computer Science',
    secondary: 'MIT World Peace University — Expected 2027',
  },
  {
    label: 'Previous',
    primary: 'BSc Computer Science',
    secondary: 'Savitribai Phule Pune University — 2025',
  },
  {
    label: 'Focus',
    primary: 'Software engineering',
    secondary: 'Backend · Cloud & DevOps · Machine learning',
  },
];

export function Hero() {
  const { gsap, createTimeline, prefersReducedMotion } = useGSAP();
  const { scrollTo } = useLenis();
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = createTimeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero__name-word', {
        yPercent: 118,
        duration: 1.25,
        stagger: 0.1,
      })
        .from(
          '[data-hero-fade]',
          { y: 26, opacity: 0, duration: 0.9, stagger: 0.09 },
          '-=0.75'
        )
        .from('.hero__register', { opacity: 0, duration: 0.8 }, '-=0.55');
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, createTimeline, gsap]);

  return (
    <section id="hero" ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__body container">
        <div className="hero__top">
          <dl className="hero__facts" data-hero-fade>
            {facts.map((fact) => (
              <div className="hero__fact" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>
                  <span className="hero__fact-value hero__fact-value--primary">
                    {fact.primary}
                  </span>
                  <span className="hero__fact-value">{fact.secondary}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="hero__statement" data-hero-fade>
            <p className="hero__statement-label">Statement</p>
            <p className="hero__statement-text t-statement">{siteConfig.statement}</p>
          </div>
        </div>

        <h1 className="hero__name" id="hero-title">
          <span className="hero__name-line hero__name-line--step">
            <span className="hero__name-word">SUMIT</span>
          </span>
          <span className="hero__name-line">
            <span className="hero__name-word">DILIP BABAR</span>
          </span>
        </h1>
      </div>

      <div className="hero__register">
        <div className="hero__register-inner">
          <a
            className="hero__scroll"
            href="#projects"
            onClick={(event) => {
              event.preventDefault();
              scrollTo('#projects', { offset: -60, duration: 1.2 });
            }}
          >
            Scroll
            <span className="hero__scroll-mark" aria-hidden="true">
              &darr;
            </span>
          </a>

          <a
            className="link-arrow"
            href="#projects"
            onClick={(event) => {
              event.preventDefault();
              scrollTo('#projects', { offset: -60, duration: 1.2 });
            }}
          >
            Selected Work
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
        </div>
      </div>
    </section>
  );
}
