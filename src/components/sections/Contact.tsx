import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { socialLinks } from '../../data/social'
import { MagneticButton } from '../ui/Button'

export function Contact() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        }
      )
      return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    },
    { scope: rootRef }
  )

  return (
    <section id="contact" ref={rootRef} className="py-28 md:py-40">
      <div className="container-edge">
        <div className="flex items-center gap-3 font-mono text-sm text-accent">
          <span>07</span>
          <span className="h-px w-8 bg-accent-dim" aria-hidden="true" />
          <span className="text-muted">Contact</span>
        </div>

        <h2
          data-reveal
          className="mt-8 font-display font-medium text-[12vw] leading-[0.95] tracking-tight text-ink sm:text-[8vw] lg:text-7xl text-balance max-w-4xl"
        >
          Let's build something useful.
        </h2>

        <div data-reveal className="mt-12">
          <MagneticButton href="mailto:hello@sumitbabar.dev" icon={<ArrowUpRight size={16} />}>
            Say hello
          </MagneticButton>
        </div>

        <div data-reveal className="mt-20 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-10">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="group flex flex-col gap-1"
            >
              <span className="font-mono text-xs text-faint">{s.label}</span>
              <span className="flex items-center gap-1.5 text-ink group-hover:text-accent transition-colors">
                {s.handle}
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>

        <p className="mt-20 font-mono text-xs text-faint">
          © {new Date().getFullYear()} Sumit Babar. Built with React, GSAP and Lenis.
        </p>
      </div>
    </section>
  )
}
