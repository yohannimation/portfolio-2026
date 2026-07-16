import Image from "next/image";

// Types
import type { ProjectSourceTypeInterface } from "@/types/project.interface";
import type { TagInterface } from "@/types/tag.interface";

interface ProjectMiniatureInterface {
  active: boolean,
  miniatureName: string,
  sourceType: ProjectSourceTypeInterface,
  source: string
  tags?: TagInterface[],
}

export default async function ProjectMiniature({
  miniatureName,
}: ProjectMiniatureInterface) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const miniatureSource = `${baseUrl}/miniature/projects/${miniatureName}`;

  return (
    <div
      className="
        relative
        mx-auto
        w-full max-w-[650px]
        h-full
        rounded-md
        aspect-6/5
        overflow-hidden
      "
    >
      <Image
        src={miniatureSource}
        alt={miniatureName}
        loading="lazy"
        fill={true}
        unoptimized
        className="object-cover"
      />
      <span
        className="
          relative
          block
          w-full h-full
          bg-muted
          animate-pulse
          -z-1
        "
      >
      </span>
    </div>
  );
}