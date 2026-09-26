import { useLayoutEffect, type RefObject } from 'react';
import { useGSAP } from './useGSAP';

interface SectionRevealOptions {
  /* Selector scoped to the section element */
  targets?: string;
  /* Defaults to the section element itself */
  trigger?: string;
  start?: string;
  stagger?: number;
  y?: number;
}

/*
  One scroll reveal per section: the band and its content arrive as a single
  gesture instead of one trigger per element. Runs in a layout effect so the
  .from() start state is applied before the first paint — no flash of content
  waiting for ScrollTrigger.
*/
export function useSectionReveal(
  ref: RefObject<HTMLElement | null>,
  options: SectionRevealOptions = {}
) {
  const { gsap, createTimeline, createScrollTrigger, prefersReducedMotion } = useGSAP();
  const targets = options.targets ?? '[data-reveal]';
  const trigger = options.trigger;
  const start = options.start ?? 'top 78%';
  const stagger = options.stagger ?? 0.08;
  const y = options.y ?? 28;

  useLayoutEffect(() => {
    const element = ref.current;
    if (prefersReducedMotion || !element) return;

    const ctx = gsap.context(() => {
      const tl = createTimeline();
      tl.from(targets, { y, opacity: 0, duration: 0.9, stagger });

      createScrollTrigger({
        trigger: trigger ?? element,
        start,
        animation: tl,
        toggleActions: 'play none none none',
      });
    }, ref);

    return () => ctx.revert();
  }, [
    ref,
    targets,
    trigger,
    start,
    stagger,
    y,
    prefersReducedMotion,
    gsap,
    createTimeline,
    createScrollTrigger,
  ]);
}
