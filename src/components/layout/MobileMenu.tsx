import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { navItems } from '../../data/nav'
import { socialLinks } from '../../data/social'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      const panel = panelRef.current
      if (!panel) return
      const links = panel.querySelectorAll('[data-menu-link]')

      if (open) {
        gsap.set(panel, { display: 'flex' })
        gsap.fromTo(
          panel,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power4.inOut' }
        )
        gsap.fromTo(
          links,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            delay: 0.2,
            ease: 'power3.out',
          }
        )
      } else {
        gsap.to(panel, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(panel, { display: 'none' }),
        })
      }
    },
    { dependencies: [open] }
  )

  const handleNav = (href: string) => {
    onClose()
    scrollTo(href, { offset: -16 })
  }

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      className="fixed inset-0 z-40 hidden flex-col justify-between bg-base container-edge pt-28 pb-10 md:hidden"
      style={{ display: 'none' }}
    >
      <nav aria-label="Mobile" className="flex flex-col gap-1">
        {navItems.map((item) => (
          <a
            key={item.href}
            data-menu-link
            href={item.href}
            onClick={(e) => {
              e.preventDefault()
              handleNav(item.href)
            }}
            className="border-b border-line py-5 font-display text-4xl text-ink hover:text-accent transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div data-menu-link className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
        {socialLinks.map((s) => (
          <a key={s.label} href={s.href} className="hover:text-accent transition-colors">
            {s.label}
          </a>
        ))}
      </div>
    </div>
  )
}
