import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LenisContext, type LenisScrollEvent } from '../../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

type ScrollListener = (event: LenisScrollEvent) => void

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const listenersRef = useRef<Set<ScrollListener>>(new Set())

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const instance = new Lenis({
      duration: prefersReducedMotion ? 0.1 : 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.4,
    })

    lenisRef.current = instance

    const handleScroll = (event: LenisScrollEvent) => {
      ScrollTrigger.update()
      listenersRef.current.forEach((listener) => listener(event))
    }
    instance.on('scroll', handleScroll)

    const tick = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      instance.off('scroll', handleScroll)
      instance.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number }
  ) => {
    lenisRef.current?.scrollTo(target, { offset: options?.offset ?? 0 })
  }

  const onScroll = (callback: ScrollListener) => {
    listenersRef.current.add(callback)
    return () => {
      listenersRef.current.delete(callback)
    }
  }

  return (
    <LenisContext.Provider value={{ scrollTo, onScroll }}>
      {children}
    </LenisContext.Provider>
  )
}
