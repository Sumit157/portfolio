import { useGSAP } from '@/animations/gsap/useGSAP';
import { useEffect, useRef } from 'react';

export function useScrollReveal(
  selector: string,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    end?: string;
  }
) {
  const { gsap, ScrollTrigger, prefersReducedMotion } = useGSAP();
  const elementsRef = useRef<Element[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const elements = Array.from(document.querySelectorAll(selector));
    elementsRef.current = elements;

    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          y: options?.y ?? 60,
          opacity: options?.opacity ?? 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: options?.duration ?? 1.2,
          delay: index * (options?.stagger ?? 0.1),
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? 'top 85%',
            end: options?.end ?? 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      elements.forEach((el) => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger === el) st.kill();
        });
        gsap.killTweensOf(el);
      });
    };
  }, [selector, prefersReducedMotion, gsap, ScrollTrigger, options]);

  return elementsRef;
}

export function useParallax(
  selector: string,
  options?: {
    speed?: number;
    start?: string;
    end?: string;
  }
) {
  const { gsap, ScrollTrigger, prefersReducedMotion } = useGSAP();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      gsap.to(el, {
        yPercent: options?.speed ?? -20,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? 'top bottom',
          end: options?.end ?? 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      elements.forEach((el) => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger === el) st.kill();
        });
        gsap.killTweensOf(el);
      });
    };
  }, [selector, prefersReducedMotion, gsap, ScrollTrigger, options]);
}

export function usePin(
  selector: string,
  options?: {
    pinSpacing?: boolean;
    start?: string;
    end?: string;
  }
) {
  const { ScrollTrigger, prefersReducedMotion } = useGSAP();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = document.querySelector(selector);
    if (!element) return;

    const st = ScrollTrigger.create({
      trigger: element,
      pin: true,
      pinSpacing: options?.pinSpacing ?? true,
      start: options?.start ?? 'top top',
      end: options?.end ?? 'bottom bottom',
    });

    return () => st.kill();
  }, [selector, prefersReducedMotion, ScrollTrigger, options]);
}

export function useHorizontalScroll(
  selector: string,
  options?: {
    start?: string;
    end?: string;
  }
) {
  const { gsap, ScrollTrigger, prefersReducedMotion } = useGSAP();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = document.querySelector(selector);
    if (!container) return;

    const items = container.querySelectorAll('[data-horizontal-item]');
    if (!items.length) return;

    const totalWidth = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth, 0);
    const containerWidth = container.clientWidth;
    const scrollDistance = totalWidth - containerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: options?.start ?? 'top top',
        end: () => `+=${scrollDistance}`,
      },
    });

    tl.to(items, {
      x: -scrollDistance,
      ease: 'none',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) st.kill();
      });
    };
  }, [selector, prefersReducedMotion, gsap, ScrollTrigger, options]);
}