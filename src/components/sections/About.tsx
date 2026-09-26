import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const interests = [
  'Backend Engineering',
  'DevOps',
  'Cloud Computing',
  'Distributed Systems',
  'Machine Learning',
]

export function About() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      targets.forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        )
      })

      const items = gsap.utils.toArray<HTMLElement>('[data-interest]')
      gsap.fromTo(
        items,
        { autoAlpha: 0, x: -12 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
          },
        }
      )

      return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    },
    { scope: rootRef }
  )

  return (
    <section id="about" ref={rootRef} className="border-b border-line py-28 md:py-40">
      <div className="container-edge grid grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-2">
          <div data-reveal className="flex items-center gap-3 font-mono text-sm text-accent">
            <span>02</span>
            <span className="h-px w-8 bg-accent-dim" aria-hidden="true" />
            <span className="text-muted">About</span>
          </div>
        </div>

        <div className="md:col-span-7">
          <p
            data-reveal
            className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.25] tracking-tight text-ink text-balance"
          >
            I'm a Computer Science graduate currently pursuing an MSc in Computer Science.
            I like building practical software — backend systems, cloud infrastructure,
            and the developer-focused tools that make shipping easier.
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col justify-between gap-10">
          <p data-reveal className="text-muted leading-relaxed">
            Most of what I build sits somewhere between infrastructure and application —
            the parts of a system that have to work quietly and correctly.
          </p>
          <ul className="flex flex-col gap-3" aria-label="Areas of interest">
            {interests.map((interest) => (
              <li
                key={interest}
                data-interest
                className="flex items-center gap-3 font-mono text-sm text-muted border-t border-line pt-3 first:border-t-0 first:pt-0"
              >
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
