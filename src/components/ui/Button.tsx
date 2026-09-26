import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

type Variant = 'primary' | 'ghost'

const base =
  'group relative inline-flex items-center gap-2.5 font-mono text-sm tracking-tight px-6 py-3.5 transition-colors duration-300 focus-visible:outline-offset-4'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-base hover:bg-ink border border-accent',
  ghost:
    'border border-line text-ink hover:border-accent hover:text-accent',
}

interface CommonProps {
  variant?: Variant
  icon?: ReactNode
  children: ReactNode
}

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function MagneticButton(props: AsButton | AsAnchor) {
  const { variant = 'primary', icon, children, className = '', ...rest } = props
  const ref = useMagnetic<HTMLAnchorElement | HTMLButtonElement>(0.3)
  const classes = `${base} ${variants[variant]} ${className}`

  if ('href' in props && props.href !== undefined) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...anchorRest}
      >
        <span>{children}</span>
        {icon}
      </a>
    )
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...buttonRest}
    >
      <span>{children}</span>
      {icon}
    </button>
  )
}
