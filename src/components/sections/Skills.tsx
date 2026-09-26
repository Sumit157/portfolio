import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups } from '../../data/skills'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-skill-row]')
      gsap.fromTo(
        rows,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        }
      )
      return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    },
    { scope: rootRef }
  )

  return (
    <section id="skills" ref={rootRef} className="border-b border-line py-28 md:py-40">
      <div className="container-edge">
        <SectionHeading
          index="03"
          title="What I build with"
          description="Grouped by where it sits in a system, not how impressive it sounds."
        />

        <div className="mt-16 border-t border-line">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              data-skill-row
              className="group grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors md:grid-cols-12 md:gap-8 md:py-10 hover:bg-surface"
            >
              <div className="md:col-span-1 font-mono text-sm text-accent">{group.index}</div>
              <div className="md:col-span-3">
                <h3 className="font-display text-2xl text-ink">{group.title}</h3>
                <p className="mt-1 text-sm text-muted">{group.description}</p>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-x-6 gap-y-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-sm text-muted transition-colors group-hover:text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
