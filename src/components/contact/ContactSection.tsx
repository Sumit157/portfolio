import { useRef } from 'react';
import { useSectionReveal } from '@/animations/gsap/useSectionReveal';
import { SectionBand } from '@/components/ui/SectionBand';
import { socialLinks } from '@/data/social';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef, { stagger: 0.1, y: 30 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact"
      aria-labelledby="contact-heading"
    >
      <SectionBand id="contact-heading" title="Contact" meta="Get in Touch" />

      <div className="container contact__body">
        <p className="contact__lead t-display-section t-balance" data-reveal>
          Let&rsquo;s build something.
        </p>

        <ul className="contact__list" data-reveal>
          {socialLinks.map((link) => (
            <li key={link.label} className="contact__item">
              <a
                className="contact__link"
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                <span className="contact__label t-meta">{link.label}</span>
                <span className="contact__value">{link.handle}</span>
                <svg
                  className="contact__arrow"
                  width="22"
                  height="22"
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
      </div>
    </section>
  );
}
