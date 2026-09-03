// Project component
import ProjectContent from "@/components/projects/ProjectContent";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectMiniature from "@/components/projects/ProjectMiniature";

// Animation components
import AnimatedContent from "../AnimatedContent";

// Libs
import slugify from "slugify";

// Types
import type { ProjectInterface } from "@/types/project.interface";

interface LinkProjectInterface {
  project: ProjectInterface
  index: number
}

export default function LinkProject({ project, index }: LinkProjectInterface) {
  const articleId = slugify(
    project.name,
    { lower: true }
  )
  const isOdd = index % 2 === 1;
  
  return (
    <AnimatedContent
      duration={0.8}
      ease="expo.out"
      delay={0.25}
    >
      <article id={articleId}>
        <ProjectHeader name={project.name} date={project.active ? project.date : ""} />

        <div className={`flex gap-4 flex-col ${isOdd ? "md:flex-row-reverse" : "md:flex-row"}`}>
          <ProjectMiniature
            active={project.active}
            name={project.name}
            miniatureName={project.miniatureName}
            sourceType={project.sourceType}
            source={project.source}
            tags={project.tags}
            isOdd={isOdd}
          />
          <ProjectContent type={project.type} description={project.description} />
        </div>
      </article>
    </AnimatedContent>
  );
}