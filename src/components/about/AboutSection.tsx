import { useRef } from 'react';
import { useSectionReveal } from '@/animations/gsap/useSectionReveal';
import { SectionBand } from '@/components/ui/SectionBand';
import { education } from '@/data/education';

const interests = [
  'Backend Engineering',
  'DevOps',
  'Cloud Computing',
  'Distributed Systems',
  'Machine Learning',
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef, { stagger: 0.09 });

  return (
    <section id="about" ref={sectionRef} className="about" aria-labelledby="about-heading">
      <SectionBand id="about-heading" title="About" meta="Profile" />

      <div className="container about__grid">
        <p className="about__lead t-balance" data-reveal>
          I&rsquo;m a Computer Science graduate currently pursuing an MSc in Computer
          Science. I like building practical software — backend systems, cloud
          infrastructure, and the developer-focused tools that make shipping easier.
        </p>

        <div className="about__aside" data-reveal>
          <p className="about__note t-body t-pretty">
            Most of what I build sits somewhere between infrastructure and application —
            the parts of a system that have to work quietly and correctly.
          </p>

          <ul className="about__interests" aria-label="Areas of interest">
            {interests.map((interest) => (
              <li key={interest} className="t-meta">
                {interest}
              </li>
            ))}
          </ul>
        </div>

        <dl className="about__education" data-reveal>
          {education.map((item) => (
            <div className="about__edu-row" key={`${item.degree}-${item.institution}`}>
              <dt className="about__edu-degree t-body">{item.degree}</dt>
              <dd className="about__edu-place t-body">
                {item.institution}
                {item.affiliation && (
                  <span className="about__edu-affiliation"> — {item.affiliation}</span>
                )}
              </dd>
              <dd className="about__edu-period t-meta">{item.period}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
