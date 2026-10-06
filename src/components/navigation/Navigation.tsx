import { useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/layout/ScrollProvider';
import type { NavigationItem } from '@/data/navigation';
import { clsx } from '@/utils/clsx';

interface NavigationProps {
  items: readonly NavigationItem[];
}

export function Navigation({ items }: NavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo } = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const navItems = items.slice(1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const inertTargets = [
      document.querySelector('main'),
      document.querySelector('footer'),
      document.querySelector('.masthead__inner'),
    ] as (Element | null)[];
    inertTargets.forEach((el) => {
      if (el instanceof HTMLElement) el.inert = true;
    });
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      inertTargets.forEach((el) => {
        if (el instanceof HTMLElement) el.inert = false;
      });
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (drawerOpen) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
  }, [drawerOpen]);

  const handleNavClick = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setDrawerOpen(false);
    scrollTo(href, { offset: -60, duration: 1.2 });
  };

  return (
    <nav
      className={clsx('masthead', scrolled && 'is-scrolled')}
      aria-label="Main navigation"
    >
      <div className="masthead__inner">
        <a
          href="#hero"
          className="masthead__brand"
          onClick={(event) => handleNavClick('#hero', event)}
          aria-current={activeSection === 'hero' ? 'page' : undefined}
        >
          <span className="masthead__mark" aria-hidden="true" />
          <span className="masthead__id">
            <span className="masthead__name">{items[0].label}</span>
            <span className="masthead__role">Software Engineer</span>
          </span>
        </a>

        <ul className="masthead__links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={clsx('masthead__link', activeSection === item.id && 'is-active')}
                aria-current={activeSection === item.id ? 'page' : undefined}
                onClick={(event) => handleNavClick(item.href, event)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="masthead__toggle"
          onClick={() => setDrawerOpen((open) => !open)}
          aria-expanded={drawerOpen}
          aria-controls={drawerOpen ? 'nav-drawer' : undefined}
        >
          {drawerOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {drawerOpen && (
        <div
          id="nav-drawer"
          className="nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="nav-drawer__head">
            <span className="masthead__name">{items[0].label}</span>
            <button
              ref={closeRef}
              type="button"
              className="nav-drawer__close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          <ul className="nav-drawer__list">
            {navItems.map((item, index) => (
              <li key={item.id} className="nav-drawer__item">
                <a
                  href={item.href}
                  className={clsx(
                    'nav-drawer__link',
                    activeSection === item.id && 'is-active'
                  )}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  onClick={(event) => handleNavClick(item.href, event)}
                >
                  <span className="nav-drawer__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="nav-drawer__label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-drawer__foot">
            <span className="t-meta">Portfolio — Edition 2026</span>
            <span className="t-meta">{items[0].label}</span>
          </div>
        </div>
      )}
    </nav>
  );
}
