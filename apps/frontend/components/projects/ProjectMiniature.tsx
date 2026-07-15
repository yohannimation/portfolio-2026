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
  active,
  miniatureName,
  sourceType,
  source,
  tags
}: ProjectMiniatureInterface) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const miniatureSource = `${baseUrl}/miniature/projects/${miniatureName}`;

  return (
    <div
      className="w-full"
    >
      <span
        className="
          relative
          block
          mx-auto
          w-full max-w-[500px] h-full
          bg-muted
          rounded-md
          aspect-square
          overflow-hidden
          animate-pulse
        "
      >
        <Image src={miniatureSource} alt={miniatureName} loading="lazy" fill={true} />
      </span>
    </div>
  );
}