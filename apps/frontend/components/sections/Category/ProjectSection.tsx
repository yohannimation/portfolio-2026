"use client"

// Section components
import LinkProject from "@/components/projects/LinkProject";

// Types
import type { ProjectInterface } from "@/types/project.interface";

interface ProjectSectionInterface {
  projects: ProjectInterface[]
}

export default function ProjectSection({ projects }: ProjectSectionInterface) {
  console.log(projects)

  return (
    <section id="project" className="mt-10">
      <ul className="flex flex-col gap-8">
        {projects?.map((project) => (
          <li key={project.id}>
            <LinkProject project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}