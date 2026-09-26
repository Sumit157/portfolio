import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../data/nav'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { onScroll, scrollTo } = useSmoothScroll()
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    return onScroll(({ scroll }) => setScrolled(scroll > 40))
  }, [onScroll])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    scrollTo(href, { offset: -16 })
  }

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 bg-base/80 backdrop-blur-md border-b border-line' : 'py-6 border-b border-transparent'
        }`}
      >
        <div className="container-edge flex items-center justify-between">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              handleNav('#top')
            }}
            className="font-display text-lg font-medium tracking-tight text-ink"
            aria-label="Sumit Babar, back to top"
          >
            SUMIT<span className="text-accent">.</span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(item.href)
                }}
                className="font-mono text-xs tracking-tight text-muted hover:text-ink transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden text-ink"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
