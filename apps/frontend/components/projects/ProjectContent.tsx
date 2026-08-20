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
  const [showButton, setShowButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visuallyClamped, setVisuallyClamped] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const ro = new ResizeObserver(() => setContentHeight(element.scrollHeight));
    ro.observe(element);
    setContentHeight(element.scrollHeight);

    if (element.scrollHeight > MAX_HEIGHT) {
      setShowButton(true);
      setVisuallyClamped(true);
    }

    return () => ro.disconnect();
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

      <motion.div
        layout
        className="relative mt-2 p-5 bg-white border border-primary rounded-lg"
        animate={{ scale: isExpanded ? 1.025 : 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
        style={{ originX: 0.5, originY: 0 }}
      >
        <motion.div
          animate={{ height: isExpanded ? contentHeight : (showButton ? `${MAX_HEIGHT}px` : "auto") }}
          transition={{ height: { type: "spring", stiffness: 340, damping: 34, mass: 0.9 } }}
          onAnimationComplete={() => {
            if (!isExpanded && showButton)
              setVisuallyClamped(true);
          }}
          className="overflow-hidden"
        >
          <motion.div ref={contentRef}>
            <p
              className={cn(visuallyClamped && "line-clamp-5")}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </motion.div>
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
      </motion.div>
    </div>
  );
}
