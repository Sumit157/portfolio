import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { HeroVisual } from './HeroVisual'
import { MagneticButton } from '../ui/Button'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line] span')
      const fade = gsap.utils.toArray<HTMLElement>('[data-hero-fade]')

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(
        lines,
        { yPercent: 120 },
        { yPercent: 0, duration: 1.1, stagger: 0.08 }
      ).fromTo(
        fade,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 },
        '-=0.6'
      )
    },
    { scope: rootRef }
  )

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-line pt-24"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-full md:w-3/5">
        <HeroVisual />
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/60 to-transparent" />
      </div>

      <div className="container-edge relative z-10 flex flex-col gap-10">
        <p
          data-hero-fade
          className="font-mono text-sm text-accent"
        >
          Computer Science Student / Software Developer
        </p>

        <h1 className="font-display font-medium leading-[0.92] tracking-tight text-ink">
          <span data-hero-line className="block overflow-hidden">
            <span className="block text-[15vw] sm:text-[11vw] lg:text-[8rem]">SUMIT</span>
          </span>
          <span data-hero-line className="block overflow-hidden">
            <span className="block text-[15vw] sm:text-[11vw] lg:text-[8rem] text-muted">BABAR</span>
          </span>
        </h1>

        <p data-hero-fade className="max-w-md font-mono text-sm text-muted">
          Cloud <span className="text-faint">•</span> DevOps <span className="text-faint">•</span> Backend{' '}
          <span className="text-faint">•</span> Machine Learning
        </p>

        <div data-hero-fade className="flex flex-wrap items-center gap-4 pt-2">
          <MagneticButton
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#projects', { offset: -16 })
            }}
            icon={<ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#contact', { offset: -16 })
            }}
          >
            Contact Me
          </MagneticButton>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('#about', { offset: -16 })}
        aria-label="Scroll to About section"
        data-hero-fade
        className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted hover:text-accent transition-colors"
      >
        <span className="font-mono text-[0.65rem] tracking-widest">SCROLL</span>
        <ArrowDown size={14} className="animate-bounce motion-reduce:animate-none" />
      </button>
    </section>
  )
}
