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
      <ul className="flex flex-col">
        {projects?.map((project, index) => (
          <li
            key={project.id}
            className="flex flex-col gap-8 pt-8 first:pt-0 last:pb-0"
          >
            <LinkProject project={project} index={index} />

            {index < (projects?.length ?? 0) - 1 && (
              <span
                className="h-px w-[70%] lg:w-[50%] mx-auto bg-primary"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}