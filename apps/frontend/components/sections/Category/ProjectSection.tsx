"use client"

// Section components
import LinkProject from "@/components/projects/LinkProject";

// Types
import type { ProjectInterface } from "@/types/project.interface";

interface ProjectSectionInterface {
  projects: ProjectInterface[]
}

export default function ProjectSection({ projects }: ProjectSectionInterface) {
  return (
    <section id="project" className="mb-10 md:mb-20">
      <ul className="flex flex-col gap-8">
        {projects?.map((project, index) => (
          <li key={project.id}>
            <LinkProject project={project} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}