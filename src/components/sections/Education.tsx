import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { education } from '../../data/education'
import { SectionHeading } from '../ui/SectionHeading'

export function Education() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const line = rootRef.current?.querySelector('[data-timeline-line]')
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top',
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.6,
            },
          }
        )
      }

      const items = gsap.utils.toArray<HTMLElement>('[data-edu-item]')
      gsap.fromTo(
        items,
        { autoAlpha: 0, x: -20 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        }
      )

      return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    },
    { scope: rootRef }
  )

  return (
    <section id="education" ref={rootRef} className="border-b border-line py-28 md:py-40">
      <div className="container-edge">
        <SectionHeading index="05" title="Education" />

        <div className="relative mt-16 max-w-2xl pl-8">
          <div className="absolute left-0 top-1 h-full w-px bg-line" aria-hidden="true">
            <div
              data-timeline-line
              className="h-full w-full origin-top bg-accent"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          <ul className="flex flex-col gap-14">
            {education.map((item) => (
              <li key={item.degree} data-edu-item className="relative">
                <span
                  className="absolute -left-[2.15rem] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-base"
                  aria-hidden="true"
                />
                <p className="font-mono text-xs text-accent">{item.period}</p>
                <h3 className="mt-2 font-display text-2xl text-ink">{item.degree}</h3>
                <p className="mt-1 text-muted">{item.institution}</p>
                {item.affiliation && (
                  <p className="text-sm text-faint">{item.affiliation}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
