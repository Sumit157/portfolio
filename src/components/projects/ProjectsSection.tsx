import { projects } from '@/data/projects';
import { SectionBand } from '@/components/ui/SectionBand';
import { ProjectCaseStudy } from './ProjectCaseStudy';

const published = projects.filter((project) => project.status === 'published');

export function ProjectsSection() {
  /* Every counter derives from the data — band reads "06 Projects" */
  const total = String(published.length).padStart(2, '0');

  return (
    <section id="projects" className="work" aria-labelledby="work-heading">
      <SectionBand id="work-heading" title="Selected Work" meta={`${total} Projects`} />

      <div className="container">
        {published.map((project) => (
          <ProjectCaseStudy key={project.id} project={project} total={total} />
        ))}
      </div>
    </section>
  );
}
