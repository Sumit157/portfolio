import type { ReactNode } from 'react';
import { ScrollProvider } from './ScrollProvider';
import { navigationItems } from '@/data/navigation';
import { socialLinks } from '@/data/social';
import { Navigation } from '@/components/navigation/Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ScrollProvider>
      <div className="page-wrapper">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navigation items={navigationItems} />

        <main id="main-content">{children}</main>

        <footer className="site-footer">
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
      </div>
    </ScrollProvider>
  );
}
