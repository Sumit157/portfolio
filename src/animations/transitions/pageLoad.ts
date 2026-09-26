import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useEffect, useRef } from 'react';

export function usePageLoadAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.set('.page-load-overlay', { display: 'flex', opacity: 1 })
      .from('.page-load-indicator', {
        duration: 1.5,
        scaleX: 0,
        transformOrigin: 'left center',
        ease: 'power3.inOut',
      })
      .from('[data-load="title"]', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
      }, '-=0.8')
      .from('[data-load="subtext"]', {
        y: 40,
        opacity: 0,
        duration: 1,
      }, '-=0.6')
      .from('[data-load="meta"]', {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.4')
      .to('.page-load-overlay', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          const overlay = document.querySelector('.page-load-overlay');
          if (overlay) {
            overlay.classList.add('page-load-overlay--hidden');
          }
        },
      }, '-=0.2');

    tlRef.current = tl;

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [prefersReducedMotion]);

  return tlRef.current;
}

export function createPageLoadTimeline(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    const tl = gsap.timeline();
    tl.progress(1);
    return tl;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.set('.page-load-overlay', { display: 'flex', opacity: 1 })
    .from('.page-load-indicator', {
      duration: 1.5,
      scaleX: 0,
      transformOrigin: 'left center',
      ease: 'power3.inOut',
    })
    .from('[data-load="title"]', {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.08,
    }, '-=0.8')
    .from('[data-load="subtext"]', {
      y: 40,
      opacity: 0,
      duration: 1,
    }, '-=0.6')
    .from('[data-load="meta"]', {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, '-=0.4')
    .to('.page-load-overlay', {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        const overlay = document.querySelector('.page-load-overlay');
        if (overlay) {
          overlay.classList.add('page-load-overlay--hidden');
        }
      },
    }, '-=0.2');

  return tl;
}