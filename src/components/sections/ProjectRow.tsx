import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/projects'
import { ProjectVisual } from './ProjectVisual'
import { Tag } from '../ui/Tag'

interface ProjectRowProps {
  project: Project
  index: number
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const reversed = index % 2 === 1

  useGSAP(
    () => {
      const visual = rootRef.current?.querySelector('[data-project-visual]')
      const text = rootRef.current?.querySelectorAll('[data-project-text]')

      if (visual) {
        gsap.fromTo(
          visual,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
          }
        )
      }
      if (text) {
        gsap.fromTo(
          text,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
          }
        )
      }
      return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    },
    { scope: rootRef }
  )

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-1 gap-10 border-b border-line py-16 md:grid-cols-2 md:gap-16 md:py-24"
    >
      <div className={`flex flex-col justify-center gap-6 ${reversed ? 'md:order-2' : ''}`}>
        <div data-project-text className="flex items-center gap-3 font-mono text-sm text-accent">
          <span>{project.number}</span>
          <span className="h-px w-8 bg-accent-dim" aria-hidden="true" />
        </div>
        <h3 data-project-text className="font-display text-3xl sm:text-4xl text-ink text-balance">
          {project.title}
        </h3>
        <p data-project-text className="max-w-md text-muted leading-relaxed">
          {project.description}
        </p>
        <div data-project-text className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div data-project-text className="flex flex-wrap items-center gap-6 pt-2">
          {project.github && (
            <a
              href={project.github}
              className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:text-accent transition-colors"
            >
              <Code2 size={16} /> Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:text-accent transition-colors"
            >
              Live demo <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>

      <div className={`${reversed ? 'md:order-1' : ''}`}>
        <div
          data-project-visual
          className="flex aspect-[4/3] items-center justify-center border border-line bg-surface p-8"
        >
          <ProjectVisual index={index} />
        </div>
      </div>
    </div>
  )
}
