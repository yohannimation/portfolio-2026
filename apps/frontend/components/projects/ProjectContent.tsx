import { useState, useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";

// Components
import { Button } from "@/components/ui/button";

// Types
import type { TypeInterface } from "@/types/type.interface";

// Animations
import { motion } from "motion/react";

interface ProjectContentInterface {
  type: TypeInterface,
  description: string
}

const MAX_HEIGHT = 120;

export default function ProjectContent({ type, description }: ProjectContentInterface) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [visuallyClamped, setVisuallyClamped] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.scrollHeight > MAX_HEIGHT) {
        setShowButton(true);
        setVisuallyClamped(true);
      }
    }
  }, [description]);

  const handleToggle = () => {
    const nextExpanded = !isExpanded;
    setIsExpanded(nextExpanded);
    if (nextExpanded) {
      setVisuallyClamped(false);
    }
  };

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
      <p><span className="underline">Projet</span> <span>{type.value}</span></p>

      <div className="relative mt-2 p-5 bg-white border border-primary rounded-lg">
        <motion.div
          ref={contentRef}
          animate={{
            height: isExpanded ? "auto" : (showButton ? `${MAX_HEIGHT}px` : "auto")
          }}
          transition={{ height: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } }}
          onAnimationComplete={() => {
            if (!isExpanded && showButton) {
              setVisuallyClamped(true);
            }
          }}
          className="overflow-hidden"
        >
          <p
            className={cn(visuallyClamped && "line-clamp-5")}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </motion.div>

        {showButton && (
          <Button
            onClick={handleToggle}
            variant="link"
            size="xs"
            className="px-0 mt-1"
          >
            {isExpanded ? "Voir moins" : "Voir plus"}
          </Button>
        )}
      </div>
    </div>
  );
}
