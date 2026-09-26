import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from './useReducedMotion'

/** Subtle magnetic pull toward the cursor. Desktop pointer only. */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const quickX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const quickY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      quickX(relX * strength)
      quickY(relY * strength)
    }

    const handleLeave = () => {
      quickX(0)
      quickY(0)
    }

    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [strength, reducedMotion])

  return ref
}
