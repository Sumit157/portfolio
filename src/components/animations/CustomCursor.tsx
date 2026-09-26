import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function isFinePointerDevice() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const [isFinePointer] = useState(isFinePointerDevice)
  const reducedMotion = useReducedMotion()
  const enabled = isFinePointer && !reducedMotion

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    if (!dot) return

    const quickX = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' })
    const quickY = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' })

    const move = (e: PointerEvent) => {
      quickX(e.clientX)
      quickY(e.clientY)
    }

    const growTargets = 'a, button, [data-cursor="grow"]'
    const onOver = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(growTargets)) {
        gsap.to(dot, { scale: 2.4, duration: 0.3, ease: 'power3.out' })
      }
    }
    const onOut = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(growTargets)) {
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power3.out' })
      }
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerout', onOut)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerout', onOut)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference"
    />
  )
}
