// Project component
import ProjectContent from "@/components/projects/ProjectContent";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectMiniature from "@/components/projects/ProjectMiniature";

// Libs
import slugify from "slugify";

// Types
import type { ProjectInterface } from "@/types/project.interface";

interface LinkProjectInterface {
  project: ProjectInterface
}

export default async function LinkProject({ project }: LinkProjectInterface) {
  const articleId = slugify(
    project.name,
    { lower: true }
  )
  
  return (
    <article id={articleId}>
      <ProjectHeader name={project.name} date={project.active ? project.date : ""} />

      <div className="grid grid-cols-2 gap-4">
        <ProjectMiniature
          active={project.active}
          miniatureName={project.miniatureName}
          sourceType={project.sourceType}
          source={project.source}
          tags={project.tags}
        />
        <ProjectContent type="Un certain type" description={project.description} />
      </div>
    </article>
  );
}