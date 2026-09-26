import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const gsapConfig = {
  defaults: {
    ease: 'power3.out',
    duration: 1,
  },
  scrollTrigger: {
    markers: false,
  },
};

export function useGSAP() {
  const ctxRef = useRef<gsap.Context | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});

    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, []);

  const createContext = (scope?: Element | string) => {
    return gsap.context(() => {}, scope);
  };

  const animate = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars,
    scope?: Element | string
  ) => {
    if (prefersReducedMotion) {
      gsap.set(target, { ...vars, immediateRender: true });
      return gsap.to(target, { duration: 0, ...vars });
    }

    const ctx = scope ? gsap.context(() => {}, scope) : ctxRef.current;
    // add() runs its callback now and registers what it returns with the
    // context, so it must be the only place the tween is created. Creating a
    // second tween on the next line used to run both at once.
    return ctx ? ctx.add(() => gsap.to(target, vars)) : gsap.to(target, vars);
  };

  const animateFrom = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars,
    scope?: Element | string
  ) => {
    if (prefersReducedMotion) {
      gsap.set(target, { ...vars, immediateRender: false });
      return gsap.from(target, { duration: 0, ...vars });
    }

    const ctx = scope ? gsap.context(() => {}, scope) : ctxRef.current;
    return ctx ? ctx.add(() => gsap.from(target, vars)) : gsap.from(target, vars);
  };

  /*
    Both factories must be called from inside a gsap.context() callback.

    gsap records every animation created while its context is active and kills
    it on revert, and ScrollTrigger stores itself on `animation.scrollTrigger`
    (ScrollTrigger.js:1072), so the context tears the trigger down too.

    Do NOT register them with context.add(fn): add() executes fn immediately
    (gsap-core.js:3903), so `add(() => tl.kill())` detached each timeline from
    the global timeline the instant it was created. The .from() tweens still
    applied their start states, so content hid at frame 0 and nothing ever
    animated — a black page.
  */
  const createTimeline = (vars?: gsap.TimelineVars) => {
    if (prefersReducedMotion) {
      const tl = gsap.timeline({ ...vars, paused: true });
      tl.progress(1);
      return tl;
    }

    return gsap.timeline(vars);
  };

  const createScrollTrigger = (vars: ScrollTrigger.StaticVars) => {
    if (prefersReducedMotion) {
      return null;
    }

    return ScrollTrigger.create(vars);
  };

  return {
    gsap,
    ScrollTrigger,
    createContext,
    animate,
    animateFrom,
    createTimeline,
    createScrollTrigger,
    prefersReducedMotion,
    context: ctxRef.current,
  };
}

export function useScrollReveal(
  trigger: Element | string,
  animation: (tl: gsap.core.Timeline) => void,
  options?: Omit<ScrollTrigger.Vars, 'animation' | 'toggleActions'>
) {
  const { createTimeline, createScrollTrigger, prefersReducedMotion } = useGSAP();
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const tl = createTimeline({ paused: true });
    animation(tl);
    animationRef.current = tl;

    const st = createScrollTrigger({
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      animation: tl,
      ...options,
    } as ScrollTrigger.Vars);

    return () => {
      st?.kill();
      tl.kill();
      animationRef.current = null;
    };
  }, [trigger, prefersReducedMotion, createTimeline, createScrollTrigger, options]);

  return animationRef.current;
}

export function useReveal(
  target: Element | string,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
  }
) {
  const { animateFrom, prefersReducedMotion } = useGSAP();
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element || prefersReducedMotion) return;

    elementRef.current = element;

    animateFrom(
      element,
      {
        y: options?.y ?? 40,
        opacity: options?.opacity ?? 0,
        duration: options?.duration ?? 1,
        delay: options?.delay ?? 0,
        stagger: options?.stagger,
        ease: 'power3.out',
      }
    );
  }, [target, prefersReducedMotion, animateFrom, options]);

  return elementRef;
}