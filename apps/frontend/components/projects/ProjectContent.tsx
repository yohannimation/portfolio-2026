// Types
import type { TypeInterface } from "@/types/type.interface";

interface ProjectContentInterface {
  type: TypeInterface,
  description: string
}

export default function ProjectContent({ type, description }: ProjectContentInterface) {
  return (
    <div
      className="
        flex flex-col gap-1
        mx-auto
        w-full max-w-[650px]
        h-full
        md:aspect-6/5
      "
    >
      <p>Projet <span>{type.value}</span></p>
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}