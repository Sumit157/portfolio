import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis, { type LenisOptions, type ScrollToOptions } from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenis(): LenisContextValue {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenis must be used within a ScrollProvider');
  }
  return context;
}

interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    } satisfies LenisOptions);

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.addEventListener('refresh', () => lenis.resize());

    gsap.ticker.add((time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.removeEventListener('refresh', () => lenis.resize());
      gsap.ticker.remove((time: number) => {
        if (lenisRef.current) {
          lenisRef.current.raf(time * 1000);
        }
      });
    };
  }, [prefersReducedMotion]);

  const scrollTo = (target: string | number | HTMLElement, options?: ScrollToOptions) => {
    if (lenisRef.current && !prefersReducedMotion) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}