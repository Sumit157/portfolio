import { projects } from '../../data/projects'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectRow } from './ProjectRow'

export function Projects() {
  return (
    <section id="projects" className="border-b border-line py-28 md:py-40">
      <div className="container-edge">
        <SectionHeading
          index="04"
          title="Selected projects"
          description="Five builds that pushed me to learn something I didn't already know."
        />
        <div className="mt-16">
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
