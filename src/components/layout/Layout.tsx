import { useState, type ReactNode } from 'react';
import { ScrollProvider } from './ScrollProvider';
import { navigationItems } from '@/data/navigation';
import { socialLinks } from '@/data/social';
import { stackGroups } from '@/data/stack';
import { Navigation } from '@/components/navigation/Navigation';
import { LogoLoop, type LogoLoopItem } from '@/components/ui/LogoLoop';
import { GlowCursor } from '@/components/ui/GlowCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LayoutProps {
  children: ReactNode;
}

const footerStack: LogoLoopItem[] = [
  ...new Set(['React', 'Vite', 'GSAP', 'Lenis', ...stackGroups.flatMap((group) => group.items)]),
].map((name) => ({ node: name }));

function useFinePointer(): boolean {
  const [fine] = useState(() => window.matchMedia('(pointer: fine)').matches);
  return fine;
}

export function Layout({ children }: LayoutProps) {
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();

  return (
    <ScrollProvider>
      <div className="page-wrapper">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navigation items={navigationItems} />

        <main id="main-content">{children}</main>

        <footer className="site-footer">
          <div className="site-footer__loop">
            <LogoLoop
              logos={footerStack}
              speed={reducedMotion ? 0 : 60}
              direction="left"
              gap={36}
              fadeOut
              fadeOutColor="var(--bg-primary)"
              ariaLabel="Technology stack"
            />
          </div>

          <div className="container site-footer__inner">
            <span className="site-footer__copy t-meta t-meta--primary">
              © {new Date().getFullYear()} Sumit Dilip Babar
            </span>

            <ul className="site-footer__links">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="t-meta"
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="site-footer__meta">
              <span className="t-meta">React</span>
              <span className="site-footer__sep t-meta" aria-hidden="true">
                /
              </span>
              <span className="t-meta">TypeScript</span>
              <span className="site-footer__sep t-meta" aria-hidden="true">
                /
              </span>
              <span className="t-meta">GSAP</span>
              <span className="site-footer__sep t-meta" aria-hidden="true">
                /
              </span>
              <span className="t-meta">Lenis</span>
            </div>
          </div>
        </footer>

        <div className="grain-overlay" aria-hidden="true" />

        {finePointer && !reducedMotion && (
          <GlowCursor
            className="glow-cursor--global"
            color="#f2f2f2"
            secondaryColor="#00e5a0"
          />
        )}
      </div>
    </ScrollProvider>
  );
}
