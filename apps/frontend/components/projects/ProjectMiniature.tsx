import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import { Badge } from "@/components/ui/badge";
import { Backlight } from "@/components/ui/backlight";
import { Button } from "@/components/ui/button";

// Types
import type { ProjectSourceTypeInterface } from "@/types/project.interface";
import type { TagInterface } from "@/types/tag.interface";

// Icons
import { Clock, Play, SquareArrowOutUpRight } from "lucide-react";

interface ProjectMiniatureInterface {
  active: boolean,
  name: string,
  miniatureName: string,
  sourceType: ProjectSourceTypeInterface,
  source: string,
  tags?: TagInterface[],
  isOdd: boolean,
}

export default function ProjectMiniature({
  active,
  name,
  miniatureName,
  sourceType,
  source,
  tags,
  isOdd
}: ProjectMiniatureInterface) {
  const [miniatureLoaded, setMiniatureLoaded] = useState<boolean>(false)
  const [videoPlayerOpen, setVideoPlayerOpen] = useState<boolean>(false)

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const miniatureSource = `${baseUrl}/miniature/projects/${miniatureName}`;
  const ctaClass = `
    absolute
    bottom-3 md:group-hover:bottom-5
    ${isOdd
      ? "right-3 md:right-[unset] md:left-3 md:group-hover:left-5"
      : "right-3 md:group-hover:right-5"
    }
  `;

  const tagsContent = tags && tags.length > 0 && (
    <ul className="
      absolute -top-px -right-px
      w-fit
      px-5
      h-11
      bg-primary text-white
      rounded-bl-md
      -translate-y-full
      transition-transform duration-300
      group-hover:translate-y-0
      flex justify-end items-center gap-4
      z-10
      before:content-[''] before:absolute before:size-5 before:bg-[radial-gradient(circle_at_0_0,transparent_70%,var(--primary)_71%)] before:rotate-[-90deg] before:right-0 before:-bottom-5
      after:content-[''] after:absolute after:size-5 after:bg-[radial-gradient(circle_at_0_0,transparent_70%,var(--primary)_71%)] after:rotate-[-90deg] after:top-0 after:-left-5
    ">
      {
        tags.map((tag, index) => (
          <li
            key={tag.id}
            className="
              text-lg
              opacity-0 -translate-y-full
              transition-all duration-200
              group-hover:opacity-100 group-hover:translate-y-0
            "
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {tag.name}
          </li>
        ))
      }
    </ul>
  );
  const ctaContent = (
    <>
      {/* Link state */}
      {
        sourceType == "link" &&
          <Button
            asChild
            variant="default"
            size="lg"
            className={ctaClass}
          >
            <Link href={source} target="_blank">
              Découvrir <SquareArrowOutUpRight />
            </Link>
          </Button>
      }

      {/* Video state */}
      {
        sourceType == "video" &&
          <>
            <Button
              variant="default"
              size="lg"
              className={ctaClass}
              onClick={() => setVideoPlayerOpen(true)}
            >
              Regarder <Play />
            </Button>
          </>
      }
    </>
  );

  return (
    <>
      <div
        className="
          group
          relative
          mx-auto
          w-full max-w-[650px]
          h-full
          rounded-md
          border-2 border-primary
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
          className="object-cover z-0"
          onLoadingComplete={() => setMiniatureLoaded(true)}
        />

        {
          miniatureLoaded &&
            <div className="relative h-full z-1">
              {
                active ?
                  <>
                    {tagsContent}
                    {ctaContent}
                  </>
                :
                  <Badge variant="outline" className={ctaClass}><Clock /> Coming soon</Badge>
              }
            </div>
        }

        {/* Skeleton */}
        <span
          className="
            relative
            block
            w-full h-full
            bg-muted
            animate-pulse
            -z-1
          "
        />
      </div>

      {/* Video player */}
      {
        sourceType == "video" && videoPlayerOpen &&
          <div
            className="
              fixed inset-0
              flex justify-center items-center
              p-5 md:p-15 lg:p-30
              bg-background/80
              backdrop-blur-xs
              z-2
            " onClick={() => setVideoPlayerOpen(false)}
          >
            <Backlight
              blur={40}
              className="
                w-full max-w-[1300px]
                border-3 border-primary
                aspect-16/9
                bg-muted
                rounded-md
              "
            >
              <iframe
                src={`https://www.youtube.com/embed/${source}`}
                title={name}
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share
                "
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="
                  w-full
                  aspect-16/9
                  rounded-md
                "
              />
            </Backlight>
          </div>
      }
    </>
  );
}