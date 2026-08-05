"use client"

// UI components
import { GithubGraph } from "@/components/unlumen-ui/github-graph";

export default function GithubSection() {
  return (
    <section id="github" className="relative p-5 sm:p-20 flex flex-col justify-center gap-8">
      <h2>GITHUB</h2>
      
      <GithubGraph
        account="yohannimation"
        months={12}
        variant="github"
        animation="cascade"
        animationSpeed={1.4}
        cellSize={20}
        cellGap={4}
        cellRadius={6}
        ambientEffect="none"
        className="mx-auto"
      />
    </section>
  );
}
