import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { currentFocus } from '../../data/focus'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CurrentFocus() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track || reducedMotion) return

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 22,
        repeat: -1,
        ease: 'none',
      })

      return () => {
        tween.kill()
      }
    },
    { scope: trackRef, dependencies: [reducedMotion] }
  )

  const items = [...currentFocus, ...currentFocus]

  return (
    <section className="border-b border-line bg-surface py-24 md:py-32">
      <div className="container-edge mb-12 flex items-center gap-3 font-mono text-sm text-accent">
        <span>06</span>
        <span className="h-px w-8 bg-accent-dim" aria-hidden="true" />
        <span className="text-muted">Currently focused on</span>
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center gap-12 whitespace-nowrap">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-5xl sm:text-6xl md:text-7xl text-faint [&:nth-child(odd)]:text-ink"
            >
              {item}
              <span className="mx-6 text-accent-dim" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
