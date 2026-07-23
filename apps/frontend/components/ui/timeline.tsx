"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  date?: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-6xl">
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="
              flex
              pt-20 md:pt-30
              gap-6 md:gap-10
            "
          >
            <div
              className="
                pt-1
                relative
                left-3
                flex
                items-start
                justify-center
                rounded-full
              "
            >
              <span className="p-2 block size-4 rounded-full bg-primary border border-secondary z-1" />
            </div>

            <div className="w-full">
              <div className="mb-3">
                <h3 className="uppercase">{item.title}</h3>
                {
                  item.date && <span className="block mt-1">{item.date}</span>
                }
              </div>
              {item.content}
            </div>
          </div>
        ))}
        
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-5 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-background to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-secondary via-primary to-transparent from-[0%] via-[20%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
