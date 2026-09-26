import type { ReactNode } from 'react'

interface SectionHeadingProps {
  index: string
  title: string
  description?: ReactNode
  align?: 'left' | 'right'
}

export function SectionHeading({ index, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-5 ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
      <div className="flex items-center gap-3 font-mono text-sm text-accent">
        <span>{index}</span>
        <span className="h-px w-8 bg-accent-dim" aria-hidden="true" />
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink text-balance max-w-2xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-md text-muted text-base leading-relaxed">{description}</p>
      )}
    </div>
  )
}
